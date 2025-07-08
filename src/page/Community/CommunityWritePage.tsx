import styled from 'styled-components';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';
import { ReactComponent as Store } from '@/assets/icons/community/Store.svg';
import { ReactComponent as Post } from '@/assets/icons/community/Post.svg';
import { ReactComponent as ChevronDown } from '@/assets/icons/community/ChevronDown.svg';
import { ReactComponent as Photo } from '@/assets/icons/community/Photo.svg';
import { ReactComponent as File } from '@/assets/icons/community/File.svg';
import { ReactComponent as LinkIcon } from '@/assets/icons/community/LinkIcon.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import BottomSheet from '@/components/Community/BottomSheet';
import Modal from '@/components/common/Modal/Modal';
import ModalLimit from '@/components/common/Modal/ModalLimit';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { usePostMediaMutation, usePostPostingMutation } from '@/api/community';
import { MediaItem } from '@/types/Community/common';
import { BoardTypeMapping } from '@/constants/board';
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

  // 필독 여부
  const [isImportant, setIsImportant] = useState(true);
  const handleToggleChange = () => {
    setIsImportant((prevChecked) => !prevChecked);
  };

  // 게시글 제목
  const [title, setTitle] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 게시글 내용
  const [content, setContent] = useState('');
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // 내용이 다 채워져 있어야 작성 버튼 클릭 가능
  const isActive =
    title.length > 0 && content.length > 0 && board !== '게시판 선택';

  // limit modal
  const [modalTitle, setModalTitle] = useState('');
  const [modalDetail, setModalDetail] = useState('');
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const showLimitModal = (title: string, detail: string) => {
    setModalTitle(title);
    setModalDetail(detail);
    setIsLimitModalOpen(true);
  };
  const handleCloseLimitModal = () => {
    setIsLimitModalOpen(false);
    setModalTitle('');
    setModalDetail('');
  };

  // 임시저장 모달
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // 나가기 모달
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  // 등록 모달
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // 미디어 등록 api mutation
  const { mutateAsync: postMediaMutate } = usePostMediaMutation();
  // 게시글 작성 api mutation
  const { mutateAsync: postPostingMutate } = usePostPostingMutation();

  // 사진 첨부
  const photoRef = useRef<HTMLInputElement>(null);
  const handlePhotoClick = () => {
    photoRef.current?.click();
  };
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      event.target.value = '';
      return;
    }

    const selectedFilesArray = Array.from(files);
    const newPhotosToUpload: File[] = [];
    const newVideosToUpload: File[] = [];

    // multiple로 선택했으로 사용자가 선택한 모든 파일 검사
    for (const file of selectedFilesArray) {
      if (file.type.startsWith('image/')) {
        if (photos.length + newPhotosToUpload.length > 100) {
          showLimitModal(
            '사진이 크기 제한을 초과해요.',
            '사진 1장당 최대 크기는 30MB입니다.\n사진은 최대 100장까지 첨부 가능합니다.',
          );
          continue;
        }
        if (file.size > 30 * 1024 * 1024) {
          showLimitModal(
            '사진이 크기 제한을 초과해요.',
            '사진 1장당 최대 크기는 30MB입니다.\n사진은 최대 100장까지 첨부 가능합니다.',
          );
          continue;
        }
        newPhotosToUpload.push(file);
      } else if (file.type.startsWith('video/')) {
        if (videos.length + newVideosToUpload.length > 10) {
          showLimitModal(
            '동영상이 크기 제한을 초과해요.',
            '영상 1건당 최대 크기는 1GB(15분)입니다.\n영상은 최대 10건까지 첨부 가능합니다.',
          );
          continue;
        }
        if (file.size > 1 * 1024 * 1024 * 1024) {
          showLimitModal(
            '동영상이 크기 제한을 초과해요.',
            '영상 1건당 최대 크기는 1GB(15분)입니다.\n영상은 최대 10건까지 첨부 가능합니다.',
          );
          continue;
        }
        newVideosToUpload.push(file);
      }
    }

    const uploadedMedia: Promise<MediaItem | null>[] = [];
    // 유효성 검사를 통과한 사진/동영상 파일들에 대해 mutateAsync 호출 Promise 생성
    for (const file of newPhotosToUpload) {
      uploadedMedia.push(postMediaMutate({ file, fileTypeParam: 'IMAGE' }));
    }
    for (const file of newVideosToUpload) {
      uploadedMedia.push(postMediaMutate({ file, fileTypeParam: 'VIDEO' }));
    }

    try {
      const results = await Promise.allSettled(uploadedMedia);

      const successfulUploads: MediaItem[] = [];
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          successfulUploads.push(result.value);
        } else if (result.status === 'rejected') {
          console.error('파일 업로드 실패:', result.reason);
        }
      });

      // 성공적으로 업로드된 파일들만 상태에 추가
      setPhotos((prev) => [
        ...prev,
        ...successfulUploads.filter((item) => item.fileType === 'IMAGE'),
      ]);
      setVideos((prev) => [
        ...prev,
        ...successfulUploads.filter((item) => item.fileType === 'VIDEO'),
      ]);
    } catch (error) {
      console.error('사진/비디오 업로드 중 오류 발생: ', error);
    } finally {
      event.target.value = ''; // input value 초기화 (동일 파일 재선택 가능하도록)
    }
  };

  // 파일 첨부
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFileClick = () => {
    fileRef.current?.click();
  };
  // 첨부된 파일 상태 관리
  const [attachedFiles, setAttachedFiles] = useState<MediaItem[]>([]);
  // 파일 선택 완료 시 호출될 핸들러
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      event.target.value = ''; // input value 초기화
      return;
    }

    const selectedFilesArray = Array.from(files);
    const newFilesToUpload: File[] = [];

    // 현재 첨부된 파일들 총 용량 계산
    const currentTotalSize = attachedFiles.reduce(
      (sum, file) => sum + file.fileSize,
      0,
    );
    let newFilesTotalSize = 0; // 새로 선택된 유효한 파일들의 총 용량

    // 파일 개수 제한 확인
    if (attachedFiles.length + selectedFilesArray.length > 5) {
      showLimitModal(
        '파일이 크기 제한을 초과해요.',
        '파일 1건당 최대 크기는 10MB이며,\n한 게시글당 최대 크기 30MB,\n파일 개수는 5건까지 첨부 가능합니다.',
      );
      event.target.value = ''; // input value 초기화
      return; // 개수 초과 시 더 이상 처리하지 않음
    }

    // 파일 유효성 검사
    for (const file of selectedFilesArray) {
      // 파일 용량 제한 확인 (개별 파일)
      if (file.size > 10 * 1024 * 1024) {
        showLimitModal(
          '파일이 크기 제한을 초과해요.',
          '파일 1건당 최대 크기는 10MB이며,\n한 게시글당 최대 크기 30MB,\n파일 개수는 5건까지 첨부 가능합니다.',
        );
        continue; // 다음 파일로 건너뛰기
      }

      // 전체 파일 용량 제한 확인 (추가될 파일 포함)
      // 현재까지 유효한 파일들의 총 용량 + 현재 파일 용량이 전체 제한을 초과하는지 확인
      if (currentTotalSize + newFilesTotalSize + file.size > 30 * 1024 * 1024) {
        showLimitModal(
          '파일이 크기 제한을 초과해요.',
          '파일 1건당 최대 크기는 10MB이며,\n한 게시글당 최대 크기 30MB,\n파일 개수는 5건까지 첨부 가능합니다.',
        );
        break;
      }

      newFilesToUpload.push(file); // 유효한 파일만 추가
      newFilesTotalSize += file.size; // 유효한 파일 용량만 합산
    }

    // 유효한 파일이 있을 경우 상태 업데이트
    const uploadedFiles: Promise<MediaItem | null>[] = [];
    for (const file of newFilesToUpload) {
      uploadedFiles.push(postMediaMutate({ file, fileTypeParam: 'FILE' }));
    }

    try {
      // 모든 업로드 Promise가 완료될 때까지 기다림
      const results = await Promise.allSettled(uploadedFiles);

      const successfulUploads: MediaItem[] = [];
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          successfulUploads.push(result.value);
        } else if (result.status === 'rejected') {
          console.error('파일 업로드 실패:', result.reason);
          // 개별 파일 업로드 실패에 대한 사용자 피드백
        }
      });

      // 업로드 성공한 파일들만 상태에 추가
      setAttachedFiles((prev) => [...prev, ...successfulUploads]);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생: ', error);
    } finally {
      event.target.value = '';
    }
  };

  // 링크 첨부
  const [originalUrl, setOriginalUrl] = useState('');
  const handleLinkClick = () => {
    const link = prompt('첨부할 링크 URL을 입력하세요:');
    if (link) {
      setOriginalUrl(link);
      console.log('첨부된 링크:', link);
    }
  };

  // 임시 저장 데이터의 localStorage 키 생성 함수
  const getDraftStorageKey = (board: string) => `communityDraft_${board}`;
  // localStorage에 임시 저장
  const handleSaveDraft = () => {
    const draftData = {
      title,
      content,
      isImportant,
      originalUrl,
      photos,
      videos,
      attachedFiles,
    };
    const storageKey = getDraftStorageKey(board);
    try {
      localStorage.setItem(storageKey, JSON.stringify(draftData));
      console.log(`${boardType} 임시 저장 완료:`, draftData);
      setIsSaveModalOpen(!isSaveModalOpen);
    } catch (e) {
      console.error('임시 저장 중 오류 발생:', e);
    }
  };

  // 임시 저장 데이터 불러오기
  useEffect(() => {
    const storageKey = getDraftStorageKey(board);
    const savedDraft = localStorage.getItem(storageKey);

    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setTitle(draftData.title || '');
        setContent(draftData.content || '');
        setIsImportant(draftData.isImportant || false);
        setOriginalUrl(draftData.originalUrl || '');
        setPhotos(draftData.photos || []);
        setVideos(draftData.videos || []);
        setAttachedFiles(draftData.attachedFiles || []);
      } catch (e) {
        console.error('임시 저장 데이터 파싱 오류:', e);
        // localStorage.removeItem(storageKey);
      }
    }
  }, [board]);

  const handleSubmit = async () => {
    try {
      const imageList: MediaItem[] = photos.map((file) => ({
        fileName: file.fileName,
        mediaUrl: file.mediaUrl,
        fileType: 'IMAGE',
        fileSize: file.fileSize,
        videoDuration: 0, // 이미지에는 해당 없음
      }));

      const videoList: MediaItem[] = videos.map((file) => ({
        fileName: file.fileName,
        mediaUrl: file.mediaUrl,
        fileType: 'VIDEO',
        fileSize: file.fileSize,
        videoDuration: file.videoDuration, // 업로드 응답에서 받은 영상 길이 사용
      }));

      const fileList: MediaItem[] = attachedFiles.map((file) => ({
        fileName: file.fileName,
        mediaUrl: file.mediaUrl,
        fileType: 'FILE',
        fileSize: file.fileSize,
        videoDuration: 0,
      }));

      const requestBoard = BoardTypeMapping[board];
      const postData: PostRequest = {
        title,
        content,
        isImportant,
        originalUrl,
        imageList,
        videoList,
        fileList,
      };

      await postPostingMutate({ boardType: requestBoard, postData });

      const storageKey = getDraftStorageKey(board);
      localStorage.removeItem(storageKey);

      console.log('게시글 작성 완료', postData);

      onClose();
    } catch (error) {
      console.log('게시글 작성 post 실패: ', error);
    }
  };

  return (
    <Container>
      <NavbarWrapper>
        <NavLeft>
          <Close
            onClick={() => setIsCloseModalOpen(!isCloseModalOpen)}
            style={{ cursor: 'pointer' }}
          />
        </NavLeft>
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
      </NavbarWrapper>

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
          <CancleButton onClick={() => setIsOpen(false)}>취소</CancleButton>
          <CheckButton onClick={handleSheetConfirm}>확인</CheckButton>
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

      <NavBottom>
        <Border />
        <div>
          <Photo onClick={handlePhotoClick} />
          <input
            type="file"
            ref={photoRef}
            style={{ display: 'none' }}
            accept="image/*, video/*"
            onChange={handlePhotoChange}
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
          <LinkIcon onClick={handleLinkClick} />
        </div>
      </NavBottom>

      <Modal isOpen={isLimitModalOpen} onClose={handleCloseLimitModal}>
        <ModalLimit
          title={modalTitle}
          detail={modalDetail}
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
          handleRightBtnClick={handleSubmit}
        />
      </Modal>
    </Container>
  );
};

export default CommunityWritePage;

const Container = styled.div`
  padding: 0px 20px;
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

const NavRight = styled.div<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  justify-content: flex-end;
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
  margin-top: 56px;
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

const CancleButton = styled.button`
  display: flex;
  height: 52px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const CheckButton = styled.button`
  display: flex;
  height: 52px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  background: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};
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

const NavBottom = styled.div`
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
