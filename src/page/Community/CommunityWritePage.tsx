import styled from 'styled-components';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';
import { ReactComponent as Store } from '@/assets/icons/community/Store.svg';
import { ReactComponent as Post } from '@/assets/icons/community/Post.svg';
import { ReactComponent as ChevronDown } from '@/assets/icons/community/ChevronDown.svg';
import { ReactComponent as Photo } from '@/assets/icons/community/Photo.svg';
import { ReactComponent as File } from '@/assets/icons/community/File.svg';
import { ReactComponent as LinkIcon } from '@/assets/icons/community/LinkIcon.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import BottomSheet from '@/components/Community/common/BottomSheet';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { COMMUNITY_BOARDS_LIST } from '@/constants/communityBoard';
import { useModals } from '@/hooks/Community/WritePage/useModals';
import { usePostings } from '@/hooks/Community/WritePage/usePostings';
import { useMedia } from '@/hooks/Community/WritePage/useMedia';
import { useSave } from '@/hooks/Community/WritePage/useSave';
import { usePostingSubmit } from '@/hooks/Community/WritePage/usePostingSubmit';
import { PostDetailResponse, PostRequest } from '@/types/Community/post';
import { useBoardSelection } from '@/hooks/Community/WritePage/useBoardSelection';

interface WritingProp {
  boardType: string;
  onClose: () => void;
  initialData?: PostDetailResponse;
}

const CommunityWritePage = ({
  boardType,
  onClose,
  initialData,
}: WritingProp) => {
  // 게시판 관련
  const {
    isBoardSheetOpen,
    board,
    tempBoard,
    setIsBoardSheetOpen,
    setTempBoard,
    toggleBoardSheet,
    handleBoardSheetConfirm,
  } = useBoardSelection(boardType);

  // 모달 및 BottomSheet 관련
  // 모달 상태 및 로직
  const {
    modalContent,
    isLimitModalOpen,
    isSaveModalOpen,
    isCloseModalOpen,
    isPostModalOpen,
    setIsSaveModalOpen,
    setIsCloseModalOpen,
    setIsPostModalOpen,
    handleCloseLimitModal,
    isUrlSheetOpen,
    setIsUrlSheetOpen,
  } = useModals();

  // 게시글 내용
  const {
    isImportant,
    title,
    content,
    contentRef,
    originalUrl,
    setIsImportant,
    setTitle,
    setContent,
    setOriginalUrl,
    handleToggleChange,
    handleTitleChange,
    handleContentChange,
    handleUrlChange,
  } = usePostings(initialData);

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
  } = useMedia(initialData);

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

  // 수정 모드인지 판단 - initialData 있고 id가 있으면 수정 모드
  const isEditMode = !!initialData?.postId;

  // 게시글 전송(post), 수정(put)
  const { handleSubmit } = usePostingSubmit(
    board,
    onClose,
    isEditMode,
    isEditMode ? initialData.postId : undefined,
  );
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
              {isEditMode ? '수정' : '등록'}
            </button>
          </NavRight>
        }
        color=""
      />

      <BoardSelect onClick={toggleBoardSheet}>
        <label>{board}</label>
        <ChevronDown />
      </BoardSelect>
      <BottomSheet
        isOpen={isBoardSheetOpen}
        setIsOpen={setIsBoardSheetOpen}
        title="게시판 유형을 선택해주세요."
        titleStar={true}
      >
        {COMMUNITY_BOARDS_LIST.map((board) => (
          <SheetButton
            key={board}
            active={tempBoard === board}
            onClick={() => {
              setTempBoard(board);
            }}
          >
            <Check />
            {board}
          </SheetButton>
        ))}
        <Buttons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={() => setIsBoardSheetOpen(false)}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={handleBoardSheetConfirm}
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
        ref={contentRef}
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
          <LinkIcon onClick={() => setIsUrlSheetOpen(!isUrlSheetOpen)} />
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
          title={
            isEditMode
              ? '수정한 내용을 등록하시겠습니까?'
              : '작성한 내용을 등록하시겠습니까?'
          }
          detail={
            isEditMode
              ? ''
              : '게시물이 등록되면 즉시 게시판에 반영됩니다.\n내용을 다시 한 번 확인해주세요.'
          }
          onClose={() => setIsPostModalOpen(!isPostModalOpen)}
          left="취소"
          right={isEditMode ? '수정하기' : '등록하기'}
          handleLeftBtnClick={() => setIsPostModalOpen(!isPostModalOpen)}
          handleRightBtnClick={handlePostBtnClick}
        />
      </Modal>

      <BottomSheet
        isOpen={isUrlSheetOpen}
        setIsOpen={() => setIsUrlSheetOpen(!isUrlSheetOpen)}
        title="URL을 입력해 주세요."
        titleStar={true}
      >
        <URLInput
          value={originalUrl}
          placeholder="첨부할 링크 주소를 입력해 주세요."
          onChange={handleUrlChange}
        />
        <Buttons>
          <Button
            width="100%"
            height="52px"
            variant="subBlue"
            onClick={() => setIsUrlSheetOpen(!isUrlSheetOpen)}
          >
            취소
          </Button>
          <Button
            width="100%"
            height="52px"
            variant="mainBlue"
            onClick={() => setIsUrlSheetOpen(!isUrlSheetOpen)}
          >
            확인
          </Button>
        </Buttons>
      </BottomSheet>
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
  min-height: 200px;
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
  background: ${({ theme }) => theme.colors.white};

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

const URLInput = styled.input`
  margin-bottom: 64px;
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
