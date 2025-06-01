import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Search } from '@/assets/icons/community/Search.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CommunitySearchPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <NavbarWrapper>
        <NavLeft>
          <ArrowLeft
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          />
        </NavLeft>
        <NavCenter>검색</NavCenter>
        <NavRight />
      </NavbarWrapper>

      <InputWrapper>
        <Input />
      </InputWrapper>
    </Container>
  );
};

export default CommunitySearchPage;

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

const NavRight = styled(Search)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const InputWrapper = styled.div`
  margin-bottom: 8px;
  padding: 16px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const Input = styled.input``;
