/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepProps } from '@/type/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { SearchInput } from '@/components/SignUp/SearchInput';

import { useEffect, useState } from 'react';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';

declare global {
  interface Window {
    daum: any;
  }
}

export const Step6 = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: StepProps) => {
  const [street, setStreet] = useState(formData.streetAddress || '');
  const [detail, setDetail] = useState(formData.detailAddress || '');
  const [, setIsOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openPostcode = () => {
    setIsOpen(true);
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setStreet(data.roadAddress);
        setFormData((prev) => ({
          ...prev,
          streetAddress: data.roadAddress,
        }));
        setIsOpen(false);
      },
    }).open();
  };

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>
        현재 거주하시는
        <br />
        주소를 입력하세요
      </Header>

      <CardContainer>
        <SearchInput
          placeholder="도로명, 지번, 건물명 검색"
          onClick={openPostcode}
          value={street}
          readOnly
        />
      </CardContainer>

      {street && (
        <CardContainer>
          <PlainInputBox
            width="320px"
            state="default"
            placeholder="상세 주소 입력"
            guide=""
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
              setFormData((prev) => ({
                ...prev,
                detailAddress: e.target.value,
              }));
            }}
          />
        </CardContainer>
      )}

      <ButtonContainer>
        <Button
          variant={detail.length > 0 && street ? 'blue' : 'disabled'}
          height="52px"
          onClick={onNext}
          disabled={!(street && detail.length > 0)}
        >
          다음 단계로 이동
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  align-items: flex-start;
  padding: 16px 20px 0px 20px;
  box-sizing: border-box;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-sizing: border-box;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px 0px 20px;
`;
