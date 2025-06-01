import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Dots } from '@/assets/icons/community/Dots.svg';
import { ReactComponent as Eye } from '@/assets/icons/community/Eye.svg';
import { ReactComponent as Share } from '@/assets/icons/community/Share.svg';
import { ReactComponent as Send } from '@/assets/icons/community/ReplySend.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ReactComponent as Link } from '@/assets/icons/community/LinkPost.svg';
import { ReactComponent as Copy } from '@/assets/icons/community/LinkCopy.svg';
import { ReactComponent as Kakao } from '@/assets/icons/community/KakaoLogo.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BottomSheet from './BottomSheet';

// interface PostProps {
//   boardType: string;
// }

const CommunityPost = (/*{ boardType }: PostProps*/) => {
  // const { matchingId } = useParams();
  const navigate = useNavigate();

  // const [board, setBoard] = useState(boardType);
  const [board, setBoard] = useState('공단 공지');
  const [isMust, setIsMust] = useState(true);
  const [isRead, setIsRead] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);

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

  return (
    <Container>
      <NavbarWrapper>
        <NavLeft>
          <ArrowLeft
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          />
        </NavLeft>
        {/* <NavCenter>{board}</NavCenter> */}
        <NavCenter>협회 공지</NavCenter>
        <NavRight />
      </NavbarWrapper>

      <TitleWrapper>
        <Title>
          {isMust && <Tag>필독</Tag>}
          <label>
            2025년 노인요양시설 내 전문요양실 시범사업 참여기관 공모
          </label>
        </Title>

        <Writer>
          <div className="writer-info">
            <img src="" />
            <div className="writer-wrapper">
              <div className="wrapper">
                <label className="writer">dolda2</label>
                <label className="writer">·</label>
                <label className="writer">임원진</label>
              </div>
              <div className="wrapper">
                <label className="date">2025.05.05.</label>
                <label className="date">09:07</label>
                {!isRead && <label className="new">N</label>}
                <label className="date">수정됨</label>
                <label className="date">조회 101</label>
              </div>
            </div>
          </div>
          <Dots onClick={() => setIsDeleteSheetOpen(true)} />
        </Writer>

        <CheckPerson>
          <Border />
          <div className="box">
            <Eye />
            <label>
              <span>24</span>명이 게시물을 확인했어요
            </label>
          </div>
        </CheckPerson>
      </TitleWrapper>

      <Files>
        <label>첨부 파일 이름</label>
        <label>첨부 파일 이름</label>
      </Files>

      <Border style={{ marginBottom: '14px' }} />

      <ContentWrapper>
        <label>입력한 공지 내용</label>
        <img src="" />
      </ContentWrapper>

      <Border />

      {!isMyPost && (
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
            댓글 <span>*</span>
          </label>
          <div className="reply">
            <img src="" />
            <div className="labels">
              <div className="writer-wrapper">
                <label className="writer">dolda2</label>
                <label className="writer">·</label>
                <label className="writer">회장</label>
              </div>
              <label className="content">댓글 내용</label>
              <label className="date">2025.05.05. 09:08</label>
            </div>
          </div>
          <Border />

          <div className="reply">
            <img src="" />
            <div className="labels">
              <div className="writer-wrapper">
                <label className="writer">dolda2</label>
                <label className="writer">·</label>
                <label className="writer">회장</label>
              </div>
              <label className="content">댓글 내용</label>
              <label className="date">2025.05.05. 09:08</label>
            </div>
          </div>
          <Border />

          <div className="reply">
            <img src="" />
            <div className="labels">
              <div className="writer-wrapper">
                <label className="writer">dolda2</label>
                <label className="writer">·</label>
                <label className="writer">회장</label>
              </div>
              <label className="content">댓글 내용</label>
              <label className="date">2025.05.05. 09:08</label>
            </div>
          </div>
          <Border />
        </div>
        <SectionBorder />
        {board === '공단 공지' ? (
          <IsMyPost>
            <Link />
            <Share onClick={() => setIsShareSheetOpen(true)} />
          </IsMyPost>
        ) : (
          <Share style={{ padding: '10px 0px' }} />
        )}
        <SectionBorder />
        <div className="my-reply">
          <Reply placeholder="댓글을 입력하세요" />
          <Send style={{ padding: '4px' }} />
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
            <Copy />
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
  // width: 30px;
  height: 20px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subBlue};

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
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

const CheckPerson = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .box {
    display: flex;
    gap: 4px;
    height: 52px;
    padding: 8px 16px;
    align-items: center;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.subBlue};
  }

  svg {
    width: 22px;
    height: 22px;
  }

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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

  img {
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
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
`;

const IsMyPost = styled.div`
  display: flex;
  gap: 18px;
  padding: 10px 0;
`;

const Reply = styled.input`
  resize: none;
  outline: none;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  display: flex;
  align-items: center;
  width: 90%;
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

const SheetContainer = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 320px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  padding: 60px 20px 0 20px;

  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  gap: 24px;
  flex-direction: column;
  align-items: flex-start;

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 140%;
  }

  .buttons {
    display: flex;
    gap: 30px;
  }

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
