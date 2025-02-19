import { useEffect, useState } from 'react';
import { ElderCard } from '@/components/Matching/ElderCard';
import { MatchingSearchBox } from '@/components/Matching/MatchingSearchBox';
import { MatchingApplyModal } from '@/components/Matching/Modal/MatchingApplyModal';
import { SocialTabBar } from '@/components/Matching/SocialTabBar';
import { ElderData } from '@/type/Matching';
import axios from 'axios';
import { styled } from 'styled-components';

export const MatchingApplyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ElderData | null>(null);
  const [elderList, setElderList] = useState<ElderData[]>([]);

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchElderList = async () => {
      try {
        const response = await axios.get<
          {
            elderlyId: number;
            name: string;
            age: number;
            gender: 'MALE' | 'FEMALE';
            careLevel: string;
            cognitiveLevel: string;
            profileImageUrl: string;
          }[]
        >(`${apiUrl}/elderly/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transformedData: ElderData[] = response.data.map((elder) => ({
          elderlyId: elder.elderlyId,
          name: elder.name,
          age: elder.age,
          gender: elder.gender === 'MALE' ? 'MALE' : 'FEMALE',
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
  }, [apiUrl, token]);

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
