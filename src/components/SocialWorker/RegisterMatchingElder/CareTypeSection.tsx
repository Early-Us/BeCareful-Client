import styled from 'styled-components';
import { MatchingCareCard } from '@/page/Matching/MatchingCareCard';

interface Props {
  selectedCareTypes: string[];
  onChange: (careType: string) => void;
}

export const CareTypeSection = ({ selectedCareTypes, onChange }: Props) => {
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">케어항목</SectionTitle>
        <SectionTitle color="blue">*</SectionTitle>
      </SectionTitleWrapper>
      <SectionGuide>중복선택 가능</SectionGuide>
      <MatchingCareCard
        title="식사보조"
        description="스스로 식사가능, 경관식 보조"
        initialChecked={selectedCareTypes.includes('식사보조')}
        onChange={() => onChange('식사보조')}
      />
      <MatchingCareCard
        title="배변보조"
        description="가끔 대소변 실수 시 도움, 기저귀 케어 필요"
        initialChecked={selectedCareTypes.includes('배변보조')}
        onChange={() => onChange('배변보조')}
      />
      <MatchingCareCard
        title="일상생활"
        description="청소, 빨래보조"
        initialChecked={selectedCareTypes.includes('일상생활')}
        onChange={() => onChange('일상생활')}
      />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 20px 0px 20px;
  gap: 8px;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const SectionTitle = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const SectionGuide = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
