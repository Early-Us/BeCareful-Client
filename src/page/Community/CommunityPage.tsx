import styled from 'styled-components';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';
import { ReactComponent as Plus } from '@/assets/icons/ButtonPlus.svg';
import { ReactComponent as Write } from '@/assets/icons/community/Write.svg';
import { useState } from 'react';
import CommunityHome from '@/components/Community/CommunityHome';
import CommunityWritePage from './CommunityWritePage';
import CommunityDetail from '@/components/Community/CommunityDetail';
import { useQuery } from '@tanstack/react-query';
import { AssociationInfoResponse } from '@/types/Community';
import { getAssociationInfo } from '@/api/community';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar ';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [isWriting, setIsWriting] = useState(false);

  const { data, isLoading, error } = useQuery<AssociationInfoResponse, Error>({
    queryKey: ['associationInfo'],
    queryFn: getAssociationInfo,
  });
  if (isLoading) {
    console.log('getAssociationInfo: 로딩 중');
  }
  if (error) {
    console.log('getAssociationInfo 에러: ', error.message);
  }

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isWriting ? (
        <CommunityWritePage
          onClose={() => setIsWriting(false)}
          boardType={activeTab}
        />
      ) : (
        <Container>
          <Top>
            <div>
              <Search />
              <Chat />
            </div>
          </Top>

          <Association>
            <label className="title">{data?.associationName}</label>
            <div>
              <label className="member">
                멤버 {data?.associationMemberCount}
              </label>
              <div className="invite">
                <Plus />
                <label className="invite-label">초대하기</label>
              </div>
            </div>
          </Association>

          <CommunityTabs>
            {['전체', '협회 공지', '공단 공지', '정보 공유', '참여 신청'].map(
              (tab) => (
                <Tab
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </Tab>
              ),
            )}
          </CommunityTabs>

          {activeTab == '전체' ? (
            <CommunityHome onTabChange={handleTabChange} />
          ) : (
            <CommunityDetail boardType={activeTab} />
          )}

          <Button onClick={() => setIsWriting(true)}>
            <Write />
            글쓰기
          </Button>

          <SocialWorkerTabBar />
        </Container>
      )}
    </>
  );
};

export default CommunityPage;

const Container = styled.div`
  padding-bottom: 57px;
`;

const Top = styled.div`
  height: 88px;
  position: sticky;
  top: 0;
  z-index: 10;
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

  position: sticky;
  top: 88px;
  z-index: 8;
  background: ${({ theme }) => theme.colors.white};

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

  position: sticky;
  top: 164px;
  z-index: 6;
  background: ${({ theme }) => theme.colors.white};
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
