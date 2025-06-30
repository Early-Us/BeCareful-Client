import { useEffect, useState } from 'react';
import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';

import { MatchingApplyModal } from '@/components/Matching/Modal/MatchingApplyModal';

import { ElderData } from '@/types/Matching';

import { styled } from 'styled-components';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import { axiosInstance } from '@/api/axiosInstance';

export const MatchingApplyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ElderData | null>(null);
  const [elderList, setElderList] = useState<ElderData[]>([]);

  useEffect(() => {
    const fetchElderList = async () => {
      try {
        const response = await axiosInstance.get<
          {
            elderlyId: number;
            name: string;
            age: number;
            gender: 'MALE' | 'FEMALE';
            careLevel: string;
            cognitiveLevel: string;
            profileImageUrl: string;
          }[]
        >('/elderly/list');

        const transformedData: ElderData[] = response.data.map((elder) => ({
          elderlyId: elder.elderlyId,
          name: elder.name,
          age: elder.age,
          gender: elder.gender,
          careLevel: elder.careLevel,
          cognitiveLevel: elder.cognitiveLevel,
          imageUrl: elder.profileImageUrl,
        }));

        setElderList(transformedData);
      } catch (error) {
        console.error('matchingapplypage', error);
      }
    };

    fetchElderList();
  }, []);

  const openModal = (data: ElderData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <>
      <Container>
        <TopContainer>매칭 등록하기</TopContainer>
        <SearchContainer>
          <MatchingSearchBox placeholder="검색할 이름을 입력해주세요." />
        </SearchContainer>
        <CardContainer>
          {elderList.map((elder) => (
            <ElderCard key={elder.elderlyId} {...elder} onClick={openModal} />
          ))}
        </CardContainer>
        {isModalOpen && modalData && (
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
