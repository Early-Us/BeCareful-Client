import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { MatchingApplyModal } from '@/components/Matching/Modal/MatchingApplyModal';
import { SocialTabBar } from '@/components/Matching/SocialTabBar';
import { ElderData } from '@/type/Matching';
import { useState } from 'react';

import { styled } from 'styled-components';

export const MatchingApplyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ElderData | null>(null);

  const openModal = (data: ElderData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div>
      <TopContainer>매칭 등록하기</TopContainer>
      <SearchContainer>
        <MatchingSearchBox placeholder="검색할 이름을 입력해주세요." />
      </SearchContainer>
      <CardContainer>
        <ElderCard
          name="김옥자"
          age={65}
          gender="여"
          cognitiveLevel="인지등급"
          onClick={openModal}
        />
        <ElderCard
          name="김옥자"
          age={65}
          gender="여"
          cognitiveLevel="인지등급"
          onClick={openModal}
        />
        <ElderCard
          name="김옥자"
          age={65}
          gender="여"
          cognitiveLevel="인지등급"
          onClick={openModal}
        />
      </CardContainer>
      {isModalOpen && modalData && (
        <MatchingApplyModal
          width="312px"
          onClose={closeModal}
          data={modalData}
        />
      )}
      <SocialTabBar />
    </div>
  );
};

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px 0px 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //box-sizing: border-box;
  width: 100%;
  gap: 8px;
  padding: 16px 20px 0px 20px;
`;
