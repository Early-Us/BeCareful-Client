import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  RecruitCard,
  RecruitCardProps,
} from '@/components/Works/RecruitCard/RecruitCard';
import { mapRecruitmentToCardProps } from '@/components/Works/RecruitCard/RecruitCardProp';
import { Link } from 'react-router-dom';
import { EmptyCard } from '@/components/Works/RecruitCard/EmptyCard';

export const RecruitmentList = () => {
  const [recruitments, setRecruitments] = useState<RecruitCardProps[]>([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/recruitment/list`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log('API Response:', response.data);
        if (
          !response.data ||
          !Array.isArray(response.data) ||
          response.data.length === 0
        ) {
          setRecruitments([]);
          return;
        }
        const mappedData = response.data.map(mapRecruitmentToCardProps);
        setRecruitments(mappedData);
      })
      .catch((error) => {
        console.error('recruimentklist.tsx:', error);
      });
  }, []);

  return (
    <div>
      {recruitments.length === 0 ? (
        <EmptyCard />
      ) : (
        recruitments.map((recruitment, index) => (
          <Link to={`/work/${recruitment.recruitmentId}`} key={index}>
            <RecruitCard {...recruitment} />
          </Link>
        ))
      )}
    </div>
  );
};
