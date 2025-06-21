/* eslint-disable @typescript-eslint/no-explicit-any */
import { StepProps } from '@/types/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { SearchInput } from '@/components/SignUp/deprecated/SearchInput';

import { useEffect, useState } from 'react';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';

interface PostcodeData {
  roadAddress: string;
  jibunAddress: string;
  autoRoadAddress: string;
  autoJibunAddress: string;
  zonecode: string;
}

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
  const [isPostcodeReady, setIsPostcodeReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;

    script.onload = () => {
      setIsPostcodeReady(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openPostcode = () => {
    if (isPostcodeReady && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: PostcodeData) => {
          setStreet(data.roadAddress);
          setFormData((prev) => ({
            ...prev,
            streetAddress: data.roadAddress,
          }));
        },
      }).open();
    } else {
      console.error('다음 api로드 실패');
    }
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
            width=""
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
  margin: 24px 16px auto 16px;
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  margin-top: 387px;
  width: 100%;
`;
