import styled from 'styled-components';

interface ElderInfoProps {
  name: string;
  ageAndGender: string;
  address: string;
  healthStatus: string;
  livingArrangement: string;
  petStatus: string;
}

export const ElderInfo = ({
  name,
  ageAndGender,
  address,
  healthStatus,
  livingArrangement,
  petStatus,
}: ElderInfoProps) => {
  return (
    <ElderInfoContainer>
      <ElderTitle>어르신 정보</ElderTitle>
      <ElderProfile>
        <div>사진</div> {name}
      </ElderProfile>
      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">나이/성별</span>
          <span>{ageAndGender}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">주소</span>
          <span>{address}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">건강상태</span>
          <span>{healthStatus}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">거주형태</span>
          <span>{livingArrangement}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">애완동물</span>
          <span>{petStatus}</span>
        </DetailContent>
      </DetailContentContainer>
    </ElderInfoContainer>
  );
};

const ElderInfoContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const ElderTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ElderProfile = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const DetailContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  .highlight {
    color: ${({ theme }) => theme.colors.gray500};
    width: 72px;
  }
`;
