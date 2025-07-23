import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import {
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';

interface BirthInputSectionProps {
  birth: string;
  onChange: (value: string) => void;
}

export function BirthInputSection({ birth, onChange }: BirthInputSectionProps) {
  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">생년월일</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>

      <PlainInputBox
        width="100%"
        state="default"
        placeholder="예) 1978-05-08"
        guide=""
        value={birth}
        onChange={(e) => onChange(e.target.value)}
      />
    </SectionWrapper>
  );
}
