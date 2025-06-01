import { SocialTabBar } from '@/components/common/TabBarSocial';
import CommunityHome from '@/components/Community/CommunityHome';
import styled from 'styled-components';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { ReactComponent as Write } from '@/assets/icons/community/Write.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';

const CommunitySplashPage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  return (
    <Container>
      <Top>
        <div>
          <Search />
          <Chat />
        </div>
      </Top>

      <Association>
        <label className="title">장기요양협회명</label>
        <div>
          <label className="member">멤버 1,234</label>
          <div className="invite">
            <Plus />
            <label className="invite-label">초대하기</label>
          </div>
        </div>
      </Association>

      <CommunityTabs>
        {['전체', '협회 공지', '공단공지', '정보 공유', '참여 신청'].map(
          (tab) => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tab>
          ),
        )}
      </CommunityTabs>

      <CommunityHome onTabChange={setActiveTab} />

      <Button>
        <Write />
        글쓰기
      </Button>

      <SocialTabBar />

      {isOpen && (
        <ModalOverlay>
          <ModalWrapper>
            <Modal>
              <ModalXImg>
                <ModalClose />
              </ModalXImg>
              <ModalTitleLabel>
                커뮤니티에 가입하기 전 '돌봄다리'
                <br />
                서비스에 로그인이 필요해요.
              </ModalTitleLabel>
              <button onClick={() => navigate('/onboarding')}>
                로그인 하러가기
              </button>
            </Modal>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default CommunitySplashPage;

const Container = styled.div`
  padding-bottom: 57px;
`;

const Top = styled.div`
  height: 88px;
  position: relative;
  background: ${({ theme }) => theme.colors.mainBlue};

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Association = styled.div`
  height: 52px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  padding: 14px 20px 10px 20px;

  div {
    display: flex;
    justify-content: space-between;
  }

  .invite {
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  label {
    color: ${({ theme }) => theme.colors.black};
    line-height: 140%;
  }

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .member {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .invite-label {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Tab = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  //   gap: 25px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.black};
  padding-bottom: 6px;
  border-bottom: ${({ active }) => (active ? '3px solid #0370ff' : '')};
`;

const CommunityTabs = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 14px 20px 0px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const Button = styled.button`
  z-index: 10;
  position: fixed;
  bottom: 77px;
  right: 20px;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 25px;
  padding: 16px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: 140%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrapper = styled.div`
  border-radius: 12px;
  position: relative;
`;

const Modal = styled.div`
  z-index: 200;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  width: 272px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;

  button {
    height: 52px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.mainBlue};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    text-align: center;
  }
`;

const ModalXImg = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;
