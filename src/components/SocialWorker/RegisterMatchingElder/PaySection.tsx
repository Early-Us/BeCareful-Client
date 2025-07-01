import styled from 'styled-components';
import { MatchingApplicationDropdown } from '@/components/Matching/MatchingApplicationDropdown';

interface Props {
  selectedPayType: 'HOUR' | 'DAY' | 'MONTH';
  onPayTypeChange: (value: 'HOUR' | 'DAY' | 'MONTH') => void;
  payAmount: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//TODO가 많음...
type PayLabel = '시급' | '일급' | '월급';

const labelToCode: Record<PayLabel, 'HOUR' | 'DAY' | 'MONTH'> = {
  시급: 'HOUR',
  일급: 'DAY',
  월급: 'MONTH',
};

const codeToLabel: Record<'HOUR' | 'DAY' | 'MONTH', PayLabel> = {
  HOUR: '시급',
  DAY: '일급',
  MONTH: '월급',
};

export const PaySection = ({
  selectedPayType,
  onPayTypeChange,
  payAmount,
  onAmountChange,
}: Props) => {
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">희망 급여</SectionTitle>
        <SectionTitle color="blue">*</SectionTitle>
      </SectionTitleWrapper>

      <PayWrapper>
        <MatchingApplicationDropdown
          title="시급"
          contents={['시급', '일급', '월급']}
          selectedContents={codeToLabel[selectedPayType]}
          setSelectedContents={(label: string) => {
            if (label in labelToCode) {
              const code = labelToCode[label as PayLabel];
              onPayTypeChange(code);
            }
          }}
        />

        <PayFieldWrapper>
          <PayField
            id="pay"
            placeholder="금액입력"
            value={payAmount}
            onChange={onAmountChange}
          />
          <PayCount>원</PayCount>
        </PayFieldWrapper>
      </PayWrapper>
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

const PayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const PayFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const PayField = styled.input`
  width: 100%;
  height: 22px;
  padding: 13px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const PayCount = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 140%;
  right: 16px;
  top: 14px;
`;
