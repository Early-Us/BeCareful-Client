import {
  Input,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyCreate/Section.styles';

interface NameInputSectionProps {
  name: string;
  onChange: (value: string) => void;
}

export function NameInputSection({ name, onChange }: NameInputSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">이름</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <Input
        placeholder="이름 입력"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </SectionWrapper>
  );
}
