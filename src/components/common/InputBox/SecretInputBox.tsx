import styled from 'styled-components';

interface SecretInputBoxProps {
  width: string;
  state: string;
  placeholder: string;
  guide: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  masked?: boolean;
}

export const SecretInputBox = ({
  width,
  state,
  placeholder,
  guide,
  value = '',
  onChange,
  masked = true,
}: SecretInputBoxProps) => {
  return (
    <InputWrapper width={width}>
      <InputFieldLabelWrapper></InputFieldLabelWrapper>
      <InputContainer>
        <InputDefault
          type="text"
          placeholder={placeholder}
          state={state}
          value={value}
          onChange={onChange}
          $masked={masked}
        />
        {masked && (
          <MaskOverlay>
            {value.split('').map((_, index) => (
              <MaskDot key={index} />
            ))}
          </MaskOverlay>
        )}
      </InputContainer>
      {guide && (
        <InputGuideWrapper>
          <InputGuideLabel state={state}>{guide}</InputGuideLabel>
        </InputGuideWrapper>
      )}
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

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputDefault = styled.input<{ state: string; $masked?: boolean }>`
  height: 52px;
  padding: 15px 16px;
  box-sizing: border-box;

  text-align: left;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ $masked, theme }) =>
    $masked ? 'transparent' : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;
  caret-color: transparent;

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
  }
`;

const MaskOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  gap: 4px;
  pointer-events: none;
`;

const MaskDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.gray900};
  border-radius: 50%;
`;

const InputGuideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
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
