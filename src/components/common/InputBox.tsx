import styled from 'styled-components';

interface InputBoxProps {
  width: string;
  label: string;
  state: string;
  placeholder: string;
  guide: string;
}

export const InputBox = ({
  width,
  label,
  state,
  placeholder,
  guide,
}: InputBoxProps) => {
  return (
    <InputWrapper width={width}>
      <InputFieldLabelWrapper>
        <InputFieldLabel>{label}</InputFieldLabel>
        <InputFieldStar>*</InputFieldStar>
      </InputFieldLabelWrapper>
      <InputDefault
        type="text"
        placeholder={placeholder}
        state={state}
      ></InputDefault>
      <InputGuideWrapper>
        <InputGuideStar state={state}>*</InputGuideStar>
        <InputGuideLabel state={state}>{guide}</InputGuideLabel>
      </InputGuideWrapper>
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ width }) => (width ? width : '100%')};
`;

const InputFieldLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const InputFieldLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: -0.35px;
`;

const InputFieldStar = styled.div`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: -0.35px;
`;

const InputDefault = styled.input<{ state: string }>`
  height: 22px;
  padding: 15px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme, state }) => {
    switch (state) {
      case 'error':
        return theme.colors.negative;
      case 'success':
        return theme.colors.positive;
      default:
        return theme.colors.gray100;
    }
  }};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const InputGuideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const InputGuideStar = styled.p<{ state: string }>`
  color: ${({ theme, state }) => {
    switch (state) {
      case 'error':
        return theme.colors.negative;
      case 'success':
        return theme.colors.positive;
      default:
        return theme.colors.mainBlue;
    }
  }};

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.35px;
`;

const InputGuideLabel = styled.p<{ state: string }>`
  color: ${({ theme, state }) => {
    switch (state) {
      case 'error':
        return theme.colors.negative;
      case 'success':
        return theme.colors.positive;
      default:
        return theme.colors.gray500;
    }
  }};

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.35px;
`;
