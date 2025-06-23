import React, { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Dots } from '@/assets/icons/community/Dots.svg';
import { ReactComponent as Share } from '@/assets/icons/community/Share.svg';
import { ReactComponent as Send } from '@/assets/icons/community/ReplySend.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ReactComponent as Link } from '@/assets/icons/community/LinkPost.svg';
import { ReactComponent as Copy } from '@/assets/icons/community/LinkCopy.svg';
import { ReactComponent as Kakao } from '@/assets/icons/community/KakaoLogo.svg';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BottomSheet from './BottomSheet';
import {
  AuthorRankMapping,
  BoardTypeMapping,
  CommentListResponse,
  CommentRequest,
  PostDetailResponse,
} from '@/types/Community';
import {
  getComment,
  getPostDetail,
  usePostCommentMutation,
} from '@/api/community';
import { useQuery } from '@tanstack/react-query';
import Modal from '../common/Modal/Modal';
import ModalLimit from '../common/Modal/ModalLimit';

const CommunityPost = () => {
  const navigate = useNavigate();

  const [isRead, setIsRead] = useState(false);

  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [writingTask, setWritingTask] = useState('');
  const handleDeleteSheetConfirm = () => {
    if (writingTask == '수정하기') {
      // 글쓰기 수정 api 아니면 wirtingpage로 이동
    } else if (writingTask == '삭제하기') {
      // delete api 연결
    }
    setIsDeleteSheetOpen(false);
  };

  const { postId: postIdParam } = useParams<{ postId: string }>();
  const postId = postIdParam ? parseInt(postIdParam, 10) : 0;

  const location = useLocation();
  const boardType =
    (location.state as { boardType?: string } | undefined)?.boardType ||
    '협회 공지';
  const apiBoardType = BoardTypeMapping[boardType];

  // 게시글 상세 조회
  const { data: post, error: postDetailError } = useQuery<
    PostDetailResponse,
    Error
  >({
    queryKey: ['postDetail', apiBoardType, postId],
    queryFn: () => getPostDetail(apiBoardType, postId),
  });
  if (postDetailError) {
    console.log('getPostDetail 에러 발생: ', postDetailError);
  }

  // 댓글 조회
  const { data: comments, error: commentsError } = useQuery<
    CommentListResponse,
    Error
  >({
    queryKey: ['comments', apiBoardType, postId],
    queryFn: () => getComment(apiBoardType, postId),
  });
  if (commentsError) {
    console.log('getComment 에러 발생: ', commentsError);
  }

  // 댓글 등록
  const { mutate: comment, error: commentError } = usePostCommentMutation(
    apiBoardType,
    postId,
  );
  if (commentError) {
    console.log('usePostCommentMutation 에러 발생: ', commentError);
  }

  const [reply, setReply] = useState('');

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };
  const handleReplySend = (e: React.FormEvent) => {
    e.preventDefault();
    const commentRequest: CommentRequest = { content: reply };
    comment(commentRequest);
    setReply('');
  };

  // 파일 다운로드
  const handleFileDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  // 원본 URL로 이동
  const handleOriginalLinkClick = () => {
    if (post?.originalUrl) {
      window.open(post.originalUrl, '_blank'); // 새 탭에서 열기
    }
  };

  // 게시글 링크 복사
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const handleCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setIsLinkModalOpen(!isLinkModalOpen);
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
  };

  return (
    <Container>
      <NavbarWrapper>
        <NavLeft>
          <ArrowLeft
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        </NavLeft>
        <NavCenter>{boardType}</NavCenter>
        <NavRight />
      </NavbarWrapper>

      <TitleWrapper>
        <Title>
          {post?.isImportant && <Tag>필독</Tag>}
          <label>{post?.title}</label>
        </Title>

        <Writer>
          <div className="writer-info">
            <img src={post?.author.institutionImageUrl} />
            <div className="writer-wrapper">
              <div className="wrapper">
                <label className="writer">{post?.author.authorName}</label>
                <label className="writer">·</label>
                <label className="writer">
                  {post?.author &&
                    AuthorRankMapping[post?.author.authorInstitutionRank]}
                </label>
              </div>
              <div className="wrapper">
                <label className="date">{post?.postedDate}</label>
                {/* <label className="date">09:07</label> */}
                {!isRead && <label className="new">N</label>}
                <label className="date">수정됨</label>
                <label className="date">조회 101</label>
              </div>
            </div>
          </div>
          <Dots onClick={() => setIsDeleteSheetOpen(true)} />
        </Writer>
      </TitleWrapper>

      {post?.fileUrls && post.fileUrls.length > 0 && (
        <Files>
          {post.fileUrls.map((fileUrl, index) => {
            const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
            return (
              <label
                key={`file-${index}`}
                onClick={() => handleFileDownload(fileUrl)}
              >
                {fileName}
              </label>
            );
          })}
        </Files>
      )}

      <Border style={{ marginBottom: '14px' }} />

      <ContentWrapper>
        <label>{post?.content}</label>
        {/* 이미지 표시 */}
        {post?.imageUrls &&
          post?.imageUrls.map((imageUrl, index) => (
            <img
              key={`image-${index}`}
              src={imageUrl}
              alt={`게시글 이미지 ${index + 1}`}
            />
          ))}
        {/* 비디오 표시 */}
        {post?.videoUrls &&
          post?.videoUrls.map((videoUrl, index) => (
            <video key={`video-${index}`} src={videoUrl} controls />
          ))}
      </ContentWrapper>

      <Border />

      {!post?.isMyPost && (
        <IsRead>
          <IsReadButton active={isRead} onClick={() => setIsRead(true)}>
            <Check />
            게시물을 확인하셨나요?
          </IsReadButton>
          <IsReadLabel>
            {isRead
              ? '* 게시물 확인이 완료되었습니다.'
              : '* 게시물을 꼼꼼히 확인하셨다면 위 버튼을 눌러주세요.'}
          </IsReadLabel>
        </IsRead>
      )}

      <SectionBorder />

      <ReplyWrapper>
        <div className="replys">
          <label
            className="content"
            style={{ display: 'block', padding: '14px 0px' }}
          >
            댓글 <span>{comments?.length}</span>
          </label>
          {comments?.map((comment) => (
            // <React.Fragment key={comment.commentId}>
            <React.Fragment key={comment.author.authorId}>
              <div className="reply">
                <img src={comment.author.institutionImageUrl} />
                <div className="labels">
                  <div className="writer-wrapper">
                    <label className="writer">
                      {comment.author.authorName}
                    </label>
                    <label className="writer">·</label>
                    <label className="writer">
                      {AuthorRankMapping[comment.author.authorInstitutionRank]}
                    </label>
                  </div>
                  <label className="content">{comment.content}</label>
                  <label className="date">{comment.createdAt}</label>
                </div>
              </div>
              <Border />
            </React.Fragment>
          ))}
        </div>

        <SectionBorder />

        {boardType === '공단 공지' ? (
          <IsMyPost>
            <Link onClick={handleOriginalLinkClick} />
            <Share onClick={() => setIsShareSheetOpen(true)} />
          </IsMyPost>
        ) : (
          <Share
            style={{ padding: '10px 0px' }}
            onClick={() => setIsShareSheetOpen(true)}
          />
        )}

        <SectionBorder />

        <div className="my-reply">
          <Reply
            placeholder="댓글을 입력하세요"
            value={reply}
            onChange={handleReplyChange}
          />
          <Send style={{ padding: '4px' }} onClick={handleReplySend} />
        </div>
      </ReplyWrapper>

      <BottomSheet
        isOpen={isShareSheetOpen}
        setIsOpen={setIsShareSheetOpen}
        title="게시물 공유하기"
        titleStar={false}
      >
        <Buttons>
          <button className="kakao">
            <Kakao />
            카카오톡
          </button>
          <button className="copy">
            <Copy onClick={handleCopy} />
            링크 복사
          </button>
        </Buttons>
      </BottomSheet>

      <BottomSheet
        isOpen={isDeleteSheetOpen}
        setIsOpen={setIsDeleteSheetOpen}
        title="게시물을 수정 또는 삭제하시겠습니까?"
        titleStar={false}
      >
        <SheetButton
          active={writingTask === '협회 공지'}
          onClick={() => setWritingTask('협회 공지')}
        >
          <Check />
          수정하기
        </SheetButton>
        <SheetButton
          active={writingTask === '공단 공지'}
          onClick={() => setWritingTask('공단 공지')}
        >
          <Check />
          삭제하기
        </SheetButton>
        <DeleteButtons>
          <button
            className="cancle"
            onClick={() => setIsDeleteSheetOpen(false)}
          >
            취소
          </button>
          <button className="check" onClick={handleDeleteSheetConfirm}>
            확인
          </button>
        </DeleteButtons>
      </BottomSheet>

      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(!isLinkModalOpen)}
      >
        <ModalLimit
          title="링크가 복사되었어요."
          detail={'게시글 링크가 복사되었어요.\n링크를 붙여넣기할 수 있어요.'}
          onClose={() => setIsLinkModalOpen(!isLinkModalOpen)}
        />
      </Modal>
    </Container>
  );
};

export default CommunityPost;

const Container = styled.div`
  padding: 0px 20px;
  margin-top: 56px;
`;

const NavbarWrapper = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.white};
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const NavCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Tag = styled.span`
  display: flex;
  width: 60px;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subBlue};

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const Writer = styled.div`
  display: flex;
  justify-content: space-between;

  .writer-info {
    display: flex;
    gap: 8px;
  }

  img {
    width: 47px;
    height: 47px;
    border-radius: 50%;

    border: 1px solid gray;
  }

  svg {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  .writer-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .writer {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .date {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .new {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.mainOrange};
    color: ${({ theme }) => theme.colors.subOrange};
    font-size: 9.1px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Files = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 14px;

  label {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 300px;
  height: 680px;
  margin-bottom: 50px;

  label {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  img,
  video {
    border: 1px solid gray;
    width: 320px;
    height: 320px;
  }
`;

const IsRead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0px 30px 0px;
`;

const IsReadButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.mainBlue : '')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};

    path {
      fill: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`;

const IsReadLabel = styled.label`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .replys {
    margin-bottom: 105px;
  }

  label {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .content {
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }

  .reply {
    padding: 9px 0;
    display: flex;
    gap: 8px;
  }

  img {
    border-radius: 50%;
    border: 1px solid gray;
    width: 32px;
    height: 32px;
  }

  .labels {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .writer-wrapper {
    display: flex;
    gap: 4px;
  }

  .writer {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }

  .date {
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }

  svg {
    cursor: pointer;
  }

  .my-reply {
    height: 44px;
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
`;

const IsMyPost = styled.div`
  display: flex;
  gap: 18px;
  padding: 10px 0;
`;

const Reply = styled.textarea`
  resize: none;
  outline: none;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  display: flex;
  align-items: center;
  width: 100%;
  height: 26px;
  padding: 9px 16px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const SectionBorder = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin: 0px -20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 30px;

  button {
    height: 82px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

const DeleteButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding-top: 85px;

  button {
    display: flex;
    height: 52px;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .cancle {
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .check {
    background: ${({ theme }) => theme.colors.mainBlue};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SheetButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.mainBlue : '')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};

    path {
      fill: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`;
