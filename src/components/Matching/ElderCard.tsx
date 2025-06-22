import { styled } from 'styled-components';
import { ReactComponent as ElderProfile } from '@/assets/icons/matching/ElderProfile.svg';
import { ElderData } from '@/types/Matching';

export interface ElderCardProps extends ElderData {
  onClick: (data: ElderData) => void;
}

export const ElderCard = ({
  elderlyId,
  name,
  age,
  gender,
  cognitiveLevel,
  careLevel,
  imageUrl,
  onClick,
}: ElderCardProps) => {
  return (
    <CardContainer
      onClick={() =>
        onClick({
          elderlyId,
          name,
          age,
          gender,
          cognitiveLevel,
          careLevel,
          imageUrl,
        })
      }
    >
      <CardLeftContainer>
        <CardHeader>
          {name}
          <CardHeaderText>
            <span>{age}세</span>
            <span className="highlight">|</span>
            <span>{gender === 'MALE' ? '남' : '여'}</span>{' '}
          </CardHeaderText>
        </CardHeader>
        <CardContent>
          <span className="highlight">장기요양등급</span>
          <span>{careLevel}</span>
        </CardContent>
      </CardLeftContainer>
      {imageUrl ? (
        <ElderProfileStyled src={imageUrl} alt="Elder Profile" />
      ) : (
        <ElderProfile />
      )}
    </CardContainer>
  );
};

const ElderProfileStyled = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 24px 20px;
  box-sizing: border-box;
  width: 100%;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const CardLeftContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;

  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const CardContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray700};

  .highlight {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const CardHeaderText = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray50};
    margin: 0 4px;
  }
`;
