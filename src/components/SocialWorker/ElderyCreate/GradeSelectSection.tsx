import { ElderlyDropDown } from '@/components/Elderly/ElderlyDropDown';
import {
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyCreate/Section.styles';
import { CARE_LEVELS, CareLevel } from '@/constants/careLevels.socialWorker';

interface GradeSelectSectionProps {
  selectedGrade: CareLevel | '';
  onChange: (value: CareLevel) => void;
}

export function GradeSelectSection({
  selectedGrade,
  onChange,
}: GradeSelectSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">장기요양등급</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <ElderlyDropDown
        title="선택"
        contents={CARE_LEVELS.slice()}
        selectedContents={selectedGrade ? [selectedGrade] : []}
        setSelectedContents={(values) => {
          const first = values[0];
          if (CARE_LEVELS.includes(first as CareLevel)) {
            onChange(first as CareLevel);
          }
        }}
        width="100%"
      />
    </SectionWrapper>
  );
}
