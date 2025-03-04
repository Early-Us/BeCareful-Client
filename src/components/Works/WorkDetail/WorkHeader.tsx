import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { ReactComponent as MessageIcon } from '@/assets/icons/works/MessageIcon.svg';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const WorkHeader = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/work');
  };

  return (
    <HeaderContainer>
      {/*TODO: 라우팅해야함*/}
      <IconArrowLeft onClick={handleButtonClick} />
      <MessageIcon />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0px 20px;
`;
