import styled from 'styled-components';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';
import { ReactComponent as Store } from '@/assets/icons/community/Store.svg';
import { ReactComponent as Post } from '@/assets/icons/community/Post.svg';
import { ReactComponent as ChevronDown } from '@/assets/icons/community/ChevronDown.svg';
import { ReactComponent as Photo } from '@/assets/icons/community/Photo.svg';
import { ReactComponent as File } from '@/assets/icons/community/File.svg';
import { ReactComponent as LinkIcon } from '@/assets/icons/community/LinkIcon.svg';
import { useState } from 'react';

interface WritingProp {
  boardType: string;
  onClose: () => void;
}

const CommunityWritePage = ({ boardType, onClose }: WritingProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSheet = () => {
    setIsOpen((prev) => !prev);
  };
  const [board, setBoard] = useState(
    boardType === '전체' ? '게시판 선택' : boardType,
  );
  const handleBoardSelect = (board: string) => {
    setBoard(board);
    setIsOpen(false);
  };

  const [isToggleChecked, setIsToggleChecked] = useState(true);
  const handleToggleChange = () => {
    setIsToggleChecked((prevChecked) => !prevChecked);
  };

  const [title, setTitle] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    // const textarea = e.target;
    // textarea.style.height = 'auto';
    // textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const [content, setContent] = useState('');
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const isActive = title.length > 0 && content.length > 0;

  const handleSaveDraft = () => {
    // 임시 저장 로직
    // 모달창 띄우고 localstorage에 저장
    console.log('임시 저장:', content);
  };

  const handleSubmit = () => {
    // 등록 로직
    // post api 요청
    console.log('등록:', content);
  };

  return (
    <Container>
      <NavbarWrapper>
        <NavLeft>
          <Close onClick={onClose} style={{ cursor: 'pointer' }} />
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
          <button className="post" onClick={handleSubmit} disabled={!isActive}>
            <Post className="post-svg" />
            등록
          </button>
        </NavRight>
      </NavbarWrapper>

      <BoardSelect onClick={toggleSheet}>
        <label>{board}</label>
        <ChevronDown />
      </BoardSelect>
      <SheetContainer isOpen={isOpen}>
        <Option onClick={() => handleBoardSelect('협회 공지')}>
          협회 공지
        </Option>
        <Option onClick={() => handleBoardSelect('공단 공지')}>
          공단 공지
        </Option>
      </SheetContainer>

      <MustSelect>
        <label>필독 여부</label>
        <ToggleContainer onClick={handleToggleChange}>
          <ToggleLabel checked={isToggleChecked}></ToggleLabel>
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
        <Photo />
        <File />
        <LinkIcon />
      </NavBottom>
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

const SheetContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px; /* 고정 높이 */
  background: white;
  border-radius: 20px 20px 0 0; /* 상단에만 border-radius */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding: 20px;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0; /* 호버 시 배경색 변경 */
  }
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

const Title = styled.textarea`
  resize: none;
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
    color: ${({ theme }) => theme.colors.gray800};
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

const NavBottom = styled.div`
  height: 45px;
  display: flex;
  gap: 18px;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  position: fixed;
  bottom: 0;
  left: 20px;
  right: 20px;
`;
