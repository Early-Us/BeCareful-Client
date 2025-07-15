import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';
import { ReactComponent as Store } from '@/assets/icons/community/Store.svg';
import { ReactComponent as Post } from '@/assets/icons/community/Post.svg';
import { ReactComponent as ChevronDown } from '@/assets/icons/community/ChevronDown.svg';
import { ReactComponent as Photo } from '@/assets/icons/community/Photo.svg';
import { ReactComponent as File } from '@/assets/icons/community/File.svg';
import { ReactComponent as LinkIcon } from '@/assets/icons/community/LinkIcon.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import BottomSheet from '@/components/Community/common/BottomSheet';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { useModals } from '@/hooks/Community/WritePage/useModals';
import { usePostings } from '@/hooks/Community/WritePage/usePostings';
import { useMedia } from '@/hooks/Community/WritePage/useMedia';
import { useSave } from '@/hooks/Community/WritePage/useSave';
import { usePostingSubmit } from '@/hooks/Community/WritePage/usePostingSubmit';
import { PostRequest } from '@/types/Community/post';

interface WritingProp {
  boardType: string;
  onClose: () => void;
}

const CommunityWritePage = ({ boardType, onClose }: WritingProp) => {
  // 게시판 bottom sheet 열림 상태
  const [isOpen, setIsOpen] = useState(false);
  const toggleSheet = () => {
    if (!isOpen) {
      setTempBoard(board);
    }
    setIsOpen(!isOpen);
  };
  // 메인으로 표시될 게시판 유형 상태
  const [board, setBoard] = useState(
    boardType === '전체' ? '게시판 선택' : boardType,
  );
  // 시트 내에서 임시로 선택된 게시판 유형 상태
  const [tempBoard, setTempBoard] = useState(board);
  const handleSheetConfirm = () => {
    setBoard(tempBoard);
    setIsOpen(false);
  };

  // 모달 관련
  // 모달 상태 및 로직
  const {
    modalContent,
    isLimitModalOpen,
    isSaveModalOpen,
    isCloseModalOpen,
    isPostModalOpen,
    isLinkModalOpen,
    setIsSaveModalOpen,
    setIsCloseModalOpen,
    setIsPostModalOpen,
    setIsLinkModalOpen,
    handleCloseLimitModal,
  } = useModals();

  // 게시글 내용
  const {
    isImportant,
    title,
    content,
    originalUrl,
    setIsImportant,
    setTitle,
    setContent,
    setOriginalUrl,
    handleToggleChange,
    handleTitleChange,
    handleContentChange,
    handleLinkChange,
  } = usePostings();

  // 미디어 파일 업로드
  const {
    photos,
    videos,
    attachedFiles,
    photoRef,
    fileRef,
    setPhotos,
    setVideos,
    setAttachedFiles,
    handlePhotoClick,
    handleFileClick,
    handleMediaChange,
    handleFileChange,
  } = useMedia();

  // 임시 저장
  const { handleSaveDraft } = useSave({
    board,
    postData: { title, content, isImportant, originalUrl },
    mediaData: { photos, videos, attachedFiles },
    setPostData: ({ title, content, isImportant, originalUrl }) => {
      setTitle(title);
      setContent(content);
      setIsImportant(isImportant);
      setOriginalUrl(originalUrl);
    },
    setMediaData: ({ photos, videos, attachedFiles }) => {
      setPhotos(photos);
      setVideos(videos);
      setAttachedFiles(attachedFiles);
    },
  });

  // 내용이 다 채워져 있어야 작성 버튼 클릭 가능
  const isActive =
    title.length > 0 && content.length > 0 && board !== '게시판 선택';

  // 게시글 전송(post)
  const { handleSubmit } = usePostingSubmit(board, onClose);
  const handlePostBtnClick = async () => {
    const postData: PostRequest = {
      title,
      content,
      isImportant,
      originalUrl,
      imageList: photos,
      videoList: videos,
      fileList: attachedFiles,
    };

    console.log(postData);
    await handleSubmit(postData);
  };

  return (
    <Container>
      <NavBar
        left={
          <Close
            onClick={() => setIsCloseModalOpen(!isCloseModalOpen)}
            style={{ cursor: 'pointer' }}
          />
        }
        right={
          <NavRight isActive={isActive}>
            <button
              className="store"
              onClick={handleSaveDraft}
              disabled={!isActive}
            >
              <Store className="store-svg" />
              임시저장
            </button>
            <button
              className="post"
              onClick={() => setIsPostModalOpen(!isPostModalOpen)}
              disabled={!isActive}
            >
              <Post className="post-svg" />
              등록
            </button>
          </NavRight>
        }
        color=""
      />

      <BoardSelect onClick={toggleSheet}>
        <label>{board}</label>
        <ChevronDown />
      </BoardSelect>
      <BottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="게시판 유형을 선택해주세요."
        titleStar={true}
      >
        <SheetButton
          active={tempBoard === '협회 공지'}
          onClick={() => setTempBoard('협회 공지')}
        >
          <Check />
          협회 공지
        </SheetButton>
        <SheetButton
          active={tempBoard === '공단 공지'}
          onClick={() => setTempBoard('공단 공지')}
        >
          <Check />
          공단 공지
        </SheetButton>
        <SheetButton
          active={tempBoard === '정보 공유'}
          onClick={() => setTempBoard('정보 공유')}
        >
          <Check />
          정보 공유
        </SheetButton>
        <Buttons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={handleSheetConfirm}
          >
            확인
          </Button>
        </Buttons>
      </BottomSheet>

      <MustSelect>
        <label>필독 여부</label>
        <ToggleContainer onClick={() => handleToggleChange()}>
          <ToggleLabel checked={isImportant}></ToggleLabel>
        </ToggleContainer>
      </MustSelect>

      <Title
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={handleTitleChange}
      />

      <Content
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={handleContentChange}
      />

      <Bottom>
        <Border />
        <div>
          <Photo onClick={handlePhotoClick} />
          <input
            type="file"
            ref={photoRef}
            style={{ display: 'none' }}
            accept="image/*, video/*"
            onChange={handleMediaChange}
            multiple // 여러 파일 선택 가능하도록 설정
          />
          <File onClick={handleFileClick} />
          <input
            type="file"
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple // 여러 파일 선택 가능하도록 설정
            accept=".pdf, .doc, .docx, .hwp" // 특정 파일 형식만 허용
          />
          <LinkIcon onClick={() => setIsLinkModalOpen(!isLinkModalOpen)} />
        </div>
      </Bottom>

      <Modal isOpen={isLimitModalOpen} onClose={handleCloseLimitModal}>
        <ModalLimit
          title={modalContent.title}
          detail={modalContent.detail}
          onClose={handleCloseLimitModal}
          handleBtnClick={handleCloseLimitModal}
        />
      </Modal>

      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(!isSaveModalOpen)}
      >
        <ModalButtons
          title="게시물이 임시저장 되었습니다."
          detail="작성 중인 내용은 안전하게 저장되었습니다."
          onClose={() => setIsSaveModalOpen(!isSaveModalOpen)}
          left="뒤로"
          right="계속 작성하기"
          handleLeftBtnClick={() => setIsSaveModalOpen(!isSaveModalOpen)}
          handleRightBtnClick={() => setIsSaveModalOpen(!isSaveModalOpen)}
        />
      </Modal>

      <Modal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(!isCloseModalOpen)}
      >
        <ModalButtons
          title="페이지에서 나가시겠습니까?"
          detail="지금까지 작성한 내용이 모두 사라집니다."
          onClose={() => setIsCloseModalOpen(!isCloseModalOpen)}
          left="계속 작성하기"
          right="나가기"
          handleLeftBtnClick={() => setIsCloseModalOpen(!isCloseModalOpen)}
          handleRightBtnClick={onClose}
        />
      </Modal>

      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(!isPostModalOpen)}
      >
        <ModalButtons
          title="작성한 내용을 등록하시겠습니까?"
          detail={
            '게시물이 등록되면 즉시 게시판에 반영됩니다.\n내용을 다시 한 번 확인해주세요.'
          }
          onClose={() => setIsPostModalOpen(!isPostModalOpen)}
          left="취소"
          right="등록하기"
          handleLeftBtnClick={() => setIsPostModalOpen(!isPostModalOpen)}
          handleRightBtnClick={handlePostBtnClick}
        />
      </Modal>

      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(!isLinkModalOpen)}
      >
        <ModalWrapper>
          <ModalXImg onClick={() => setIsLinkModalOpen(!isLinkModalOpen)} />
          <ModalLabelWrapper>
            <label className="title">URL을 등록해주세요</label>
            <URLInput
              value={originalUrl}
              placeholder="URL"
              onChange={handleLinkChange}
            />
          </ModalLabelWrapper>
          <ModalButtonWrapper>
            <Button
              width="100%"
              height="52px"
              variant="subBlue"
              onClick={() => {
                setOriginalUrl('');
                setIsLinkModalOpen(!isLinkModalOpen);
              }}
            >
              취소
            </Button>
            <Button
              width="100%"
              height="52px"
              variant="mainBlue"
              onClick={() => {
                setIsLinkModalOpen(!isLinkModalOpen);
              }}
            >
              확인
            </Button>
          </ModalButtonWrapper>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default CommunityWritePage;

const Container = styled.div`
  margin: 0px 20px;
`;

const NavRight = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .store {
    background: ${({ theme }) => theme.colors.gray50};
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.black : theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .store-svg path {
    fill: ${({ theme, isActive }) =>
      isActive ? theme.colors.black : theme.colors.gray500};
  }

  .post {
    background: ${({ theme, isActive }) =>
      isActive ? theme.colors.mainBlue : theme.colors.subBlue};
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.white : theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .post-svg path {
    fill: ${({ theme, isActive }) =>
      isActive ? theme.colors.white : theme.colors.mainBlue};
  }
`;

const BoardSelect = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding-top: 85px;
`;

const MustSelect = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ToggleContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  cursor: pointer;
`;

const ToggleLabel = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.mainBlue : theme.colors.gray300};
  border-radius: 20px;
  transition: background-color 0.3s;

  &::before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    transition: transform 0.3s;
    transform: ${({ checked }) =>
      checked ? 'translateX(16px)' : 'translateX(0)'};
  }
`;

const Title = styled.input`
  outline: none;
  border: none;
  padding: 14px 0px;
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Content = styled.textarea`
  padding: 14px 0px;
  width: 100%;
  resize: none;
  outline: none;
  border: none;

  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const Bottom = styled.div`
  height: 44px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  div {
    display: flex;
    gap: 18px;
    align-items: center;
    padding: 0 20px;
  }

  svg {
    cursor: pointer;
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  width: 272px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    text-align: center;
  }
`;

const URLInput = styled.input`
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
