import styled from 'styled-components';

interface InstitutionCardProps {
  date: string;
  institution: string;
  year: number;
  types: string;
  phoneNumber: string;
}

const InstitutionCard = ({
  date,
  institution,
  year,
  types,
  phoneNumber,
}: InstitutionCardProps) => {
  const currentYear = new Date().getFullYear();
  const years = currentYear - year;

  return (
    <CardContainer>
      <DateWrapper>
        <label className="fix">최근 수정일</label>
        <label className="date">{date}</label>
      </DateWrapper>

      <label className="institution">{institution}</label>

      <InfoWrapper>
        <div className="applyWrapper">
          <label className="title">개소연도</label>
          <label className="title">시설유형</label>
          <label className="title">연락처</label>
        </div>
        <div className="applyWrapper">
          <label className="detail">
            {year}년 <span>({years}년 차)</span>
          </label>
          <label className="detail">{types}</label>
          <label className="detail">{phoneNumber}</label>
        </div>
      </InfoWrapper>
    </CardContainer>
  );
};

export default InstitutionCard;

const CardContainer = styled.div`
  display: flex;
  padding: 20px 20px 24px 20px;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .institution {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 6px;

  label {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .date {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const InfoWrapper = styled.div`
  margin-top: 2px;
  display: flex;
  gap: 32px;

  .applyWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray500};
  }

  span {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
