import styled from 'styled-components';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { useState } from 'react';
import CommunityCorporation from '@/components/Community/CommunityCorporation';
import CommunityAssociation from '@/components/Community/CommunityAssociation';
import CommunityHome from '@/components/Community/CommunityHome';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('전체');

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
        {/* {['전체', '협회 공지', '공단공지', '정보 공유', '참여 신청'].map( */}
        {['전체', '협회 공지', '공단 공지'].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </CommunityTabs>

      {activeTab == '전체' ? (
        <CommunityHome />
      ) : activeTab == '협회 공지' ? (
        <CommunityAssociation />
      ) : (
        <CommunityCorporation />
      )}

      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M16.1824 4.95954L13.0402 1.81798C12.7765 1.55435 12.4188 1.40625 12.0459 1.40625C11.6731 1.40625 11.3154 1.55435 11.0517 1.81798L2.38079 10.4882C2.24976 10.6184 2.14587 10.7734 2.07514 10.944C2.00442 11.1147 1.96825 11.2977 1.96876 11.4824V14.6247C1.96876 14.9977 2.11691 15.3553 2.38064 15.6191C2.64436 15.8828 3.00204 16.0309 3.37501 16.0309H15.1875C15.4113 16.0309 15.6259 15.9421 15.7841 15.7838C15.9424 15.6256 16.0313 15.411 16.0313 15.1872C16.0313 14.9634 15.9424 14.7488 15.7841 14.5906C15.6259 14.4323 15.4113 14.3434 15.1875 14.3434H8.78907L16.1824 6.94868C16.3131 6.81809 16.4167 6.66304 16.4874 6.49239C16.5581 6.32174 16.5945 6.13883 16.5945 5.95411C16.5945 5.76939 16.5581 5.58648 16.4874 5.41583C16.4167 5.24518 16.3131 5.09013 16.1824 4.95954ZM6.39844 14.3434H3.65626V11.6013L9.56251 5.69501L12.3047 8.4372L6.39844 14.3434ZM13.5 7.24189L10.7578 4.4997L12.0473 3.21017L14.7895 5.95236L13.5 7.24189Z"
            fill="white"
          />
        </svg>
        글쓰기
      </Button>
    </Container>
  );
};

export default CommunityPage;

const Container = styled.div``;

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
    background: ${({ theme }) => theme.colors.black};
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
  bottom: 20px;
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
