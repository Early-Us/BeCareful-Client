/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignUpFormData, StepProps } from '@/type/SignUp';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { ReactComponent as Plus } from '@/assets/icons/signup/Plus.svg';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { CareGiverQualificationCard } from '@/components/common/QualificationCard/CaregiverQualificationCard';
import { Modal } from '@/page/SignUp/SignUpModal';
import { NursingQualificationCard } from '@/components/common/QualificationCard/NursingQualificationCard';
import { SocialQualificationCard } from '@/components/common/QualificationCard/SocialQualificationCard';

export const Step3 = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: StepProps) => {
  const [certificateList, setCertificateList] = useState([
    {
      type: '요양보호사',
      number: '',
      component: CareGiverQualificationCard,
      onChange: (data: any) =>
        handleCertificateChange('caregiverCertificate', data),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCertificateChange = (key: keyof SignUpFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        grade: data.level === '2급' ? 'SECOND' : 'FIRST',
        certificateNumber: data.number,
      },
    }));
  };

  const handleAddCertificate = (type: string) => {
    let key: keyof SignUpFormData;
    let component;

    if (type === '간호지원사') {
      key = 'nursingCareCertificate';
      component = NursingQualificationCard;
    } else {
      key = 'socialWorkerCertificate';
      component = SocialQualificationCard;
    }

    setCertificateList((prev) => [
      ...prev,
      {
        type,
        number: '',
        component,
        onChange: (data: any) => handleCertificateChange(key, data),
      },
    ]);

    handleCloseModal();
  };

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>
        소지하신 자격증 입력하세요
        <span className="highlight">
          등급과 자격증 번호를 정확하게 입력해 주세요.
        </span>
      </Header>

      {certificateList.map((cert, index) => (
        <CardWrapper key={index}>
          <cert.component initialType={cert.type} onChange={cert.onChange} />
        </CardWrapper>
      ))}

      {certificateList.length < 3 && (
        <CardWrapper>
          <Button
            variant="blue2"
            width="320px"
            height="52px"
            onClick={handleOpenModal}
          >
            <ButtonContent>
              <Plus />
              자격증 추가하기
            </ButtonContent>
          </Button>
          <Modal
            width="312px"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddCertificate={handleAddCertificate}
          />
        </CardWrapper>
      )}

      <ButtonContainer>
        <Button
          variant="blue"
          width="320px"
          height="52px"
          onClick={() => {
            console.log('현재 입력된 formData:', formData);
            if (onNext) onNext();
          }}
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
  width: 360px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 8px;

  align-items: flex-start;
  padding: 16px 20px 0px 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const CardWrapper = styled.div`
  display: flex;
  padding: 16px 20px 0px 20px;
  flex-direction: column;
  align-items: center;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 49px 0 20px 0;
`;
