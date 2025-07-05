import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { CommunityJoinSearchInput } from '@/components/Community/JoinCommunity/CommunityJoinSearchInput';
import { useState } from 'react';
import { CommunitySearchList } from '@/components/Community/JoinCommunity/CommunitySearchList';

export const CommunityJoinPage = () => {
  const navigate = useNavigate();
  const [communityName, setCommunityName] = useState('');

  return (
    <>
      <Header>
        <NavbarWrapper>
          <ArrowLeft
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          />
          <NavTitle>커뮤니티</NavTitle>
        </NavbarWrapper>
        <CommunityJoinSearchInput onCommunitySelect={setCommunityName} />
      </Header>

      <CommunitySearchList keyword={communityName} />
    </>
  );
};

const Header = styled.div`
  padding: 0 20px;
  margin-top: 56px;
  display: flex;
  padding-bottom: 8px;
`;

const NavbarWrapper = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.white};
`;

const NavTitle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
