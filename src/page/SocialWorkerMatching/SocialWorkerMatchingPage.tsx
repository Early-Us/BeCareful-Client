import { useState } from 'react';
import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { MatchingApplyModal } from '@/components/Matching/Modal/MatchingApplyModal';
import { ElderData } from '@/types/Matching';
import { styled } from 'styled-components';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { useElderlyList } from '@/api/elderly';

export const SocialWorkerMatchingPage = () => {
  const { data: elderList = [], isError } = useElderlyList();
  const [modalData, setModalData] = useState<ElderData | null>(null);

  const openModal = (elder: ElderData) => setModalData(elder);
  const closeModal = () => setModalData(null);

  return (
    <>
      <Container>
        <TopContainer>매칭 등록하기</TopContainer>

        <SearchContainer>
          <MatchingSearchBox placeholder="검색할 이름을 입력해주세요." />
        </SearchContainer>

        <CardContainer>
          {isError && <div>에러가 발생했습니다</div>}
          {elderList.length === 0 && <div>어르신 정보가 없습니다</div>}
          {elderList.map((elder) => (
            <ElderCard
              key={elder.elderlyId}
              {...elder}
              onClick={() => openModal(elder)}
            />
          ))}
        </CardContainer>

        {modalData && (
          <MatchingApplyModal
            width="312px"
            onClose={closeModal}
            data={modalData}
          />
        )}
      </Container>

      <SocialWorkerTabBar />
    </>
  );
};

const Container = styled.div`
  margin-bottom: 107px;
  margin: auto 20px;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;

  justify-content: space-between;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px 0px 0px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 8px;
  padding: 16px 20px 0px 0px;
`;
