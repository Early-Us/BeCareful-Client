import {
  Input,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyCreate/Section.styles';

interface HealthConditionSectionProps {
  healthCondition: string;
  onChange: (value: string) => void;
}

export function HealthConditionSection({
  healthCondition,
  onChange,
}: HealthConditionSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">건강상태</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <Input
        placeholder="예) 당뇨, 신장질환"
        value={healthCondition}
        onChange={(e) => onChange(e.target.value)}
      />
    </SectionWrapper>
  );
}
