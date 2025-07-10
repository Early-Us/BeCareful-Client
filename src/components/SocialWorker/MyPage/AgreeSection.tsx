import styled from 'styled-components';
import { ReactComponent as ChevronRight } from '@/assets/icons/signup/ChevronRight.svg';
import { AgreeCard } from '@/components/SignUp/deprecated/AgreeCard';
import { AGREE_ITEMS } from '@/constants/signUpAgreeItems';
import { CheckBox } from '@/components/common/CheckBox/CheckBox';
import { useEffect, useState } from 'react';
import { AgreeField, AgreementValues } from '@/types/Socialworker/common';

interface AgreementSectionProps {
  initialIsAgreedToTerms: boolean;
  initialIsAgreedToCollectPersonalInfo: boolean;
  initialIsAgreedToReceiveMarketingInfo: boolean;
  onAgreementChange: (agreements: AgreementValues) => void;
}

const AgreeSection = ({
  initialIsAgreedToTerms,
  initialIsAgreedToCollectPersonalInfo,
  initialIsAgreedToReceiveMarketingInfo,
  onAgreementChange,
}: AgreementSectionProps) => {
  const [agreements, setAgreements] = useState({
    isAgreedToTerms: initialIsAgreedToTerms,
    isAgreedToCollectPersonalInfo: initialIsAgreedToCollectPersonalInfo,
    isAgreedToReceiveMarketingInfo: initialIsAgreedToReceiveMarketingInfo,
  });

  useEffect(() => {
    onAgreementChange(agreements);
  }, [agreements, onAgreementChange]);

  const isAllAgreed = Object.values(agreements).every(Boolean);

  const setAllAgreed = (value: boolean) => {
    setAgreements({
      isAgreedToTerms: value,
      isAgreedToCollectPersonalInfo: value,
      isAgreedToReceiveMarketingInfo: value,
    });
  };
  const handleAgreeAll = () => {
    setAllAgreed(!isAllAgreed);
  };
  const handleCheckboxChange = (field: AgreeField) => (checked: boolean) => {
    setAgreements((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  return (
    <CardContainer>
      <label className="title">
        약관동의 <span className="star">*</span>
      </label>
      <AgreeCard
        pressed={isAllAgreed}
        text="전체 동의"
        onClick={handleAgreeAll}
      />
      {AGREE_ITEMS.map(({ key, id, select, guide }) => (
        <AgreeCheck key={id}>
          <CheckBox
            id={id}
            checked={agreements[key]}
            onChange={handleCheckboxChange(key)}
            borderRadius=""
            label=""
            select={select}
            guide={guide}
          />
          <ChevronRight />
        </AgreeCheck>
      ))}
    </CardContainer>
  );
};

export default AgreeSection;

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .star {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const AgreeCheck = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
