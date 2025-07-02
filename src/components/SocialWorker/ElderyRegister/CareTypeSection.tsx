import { ElderlyDropDown } from '@/components/Elderly/ElderlyDropDown';
import {
  CareButton,
  CareLabel,
  CareModalButtonWrapper,
  CaretypeModal,
  CareWrapper,
  ModalTitleLabel,
  ModalTitleWrapper,
  ModalXImg,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import {
  CARE_TYPES,
  CARE_TYPE_DETAILS,
} from '@/constants/careTypes.socialWorker';
import { useState } from 'react';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as ButtonLeft } from '@/assets/icons/elderly/ButtonLeft.svg';
import Modal from '@/components/common/Modal/Modal';
import { Button } from '@/components/common/Button/Button';
import { CareChcekBox } from '@/components/common/CheckBox/CareChcekBox';
import { CareType } from '@/types/Elderly';
import { styled } from 'styled-components';
import { ReactComponent as Plus } from '@/assets/icons/signup/Plus.svg';

interface CareTypeSectionProps {
  selectedCare: CareType | null;
  onSelectCare: (type: CareType | null) => void;
  selectedDetails: string[];
  onSelectDetail: (newList: string[]) => void;
}

export function CareTypeSection({
  selectedCare,
  onSelectCare,
  selectedDetails,
  onSelectDetail,
}: CareTypeSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCareVisible, setIsCareVisible] = useState(false);

  const toggleDetail = (item: string) => {
    onSelectDetail(
      selectedDetails.includes(item)
        ? selectedDetails.filter((d) => d !== item)
        : [...selectedDetails, item],
    );
  };

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">케어 필요항목</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>
      <ContentWrapper>
        <CardWrapper>
          <Button
            variant="blue2"
            width=""
            height="52px"
            onClick={() => setIsCareVisible(true)}
          >
            <ButtonContent>
              <Plus />
              추가하기
            </ButtonContent>
          </Button>
        </CardWrapper>
        {isCareVisible && (
          <CareWrapper>
            <ElderlyDropDown
              title="항목선택"
              contents={CARE_TYPES.slice()}
              selectedContents={selectedCare ? [selectedCare] : []}
              setSelectedContents={(items) =>
                onSelectCare((items[0] as CareType) || null)
              }
              width="100%"
            />
            <CareButton onClick={() => setIsModalOpen(true)}>
              세부항목 선택
              <ButtonLeft />
            </CareButton>
          </CareWrapper>
        )}
      </ContentWrapper>

      {selectedDetails.length > 0 && (
        <CareLabel>
          세부항목 총 {selectedDetails.length}개 선택 :{' '}
          {selectedDetails.join(', ')} 선택
        </CareLabel>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CaretypeModal>
          <ModalTitleWrapper>
            <ModalTitleLabel>{selectedCare || '선택안됨'}</ModalTitleLabel>
            <ModalXImg onClick={() => setIsModalOpen(false)}>
              <ModalClose />
            </ModalXImg>
          </ModalTitleWrapper>

          <CareModalButtonWrapper>
            {selectedCare &&
              CARE_TYPE_DETAILS[selectedCare]?.map((item) => (
                <CareChcekBox
                  key={item}
                  id={item}
                  label={item}
                  checked={selectedDetails.includes(item)}
                  onChange={() => toggleDetail(item)}
                  width="auto"
                  height="36px"
                />
              ))}
          </CareModalButtonWrapper>

          <Button
            variant="blue"
            width=""
            height="52px"
            onClick={() => setIsModalOpen(false)}
          >
            선택하기
          </Button>
        </CaretypeModal>
      </Modal>
    </SectionWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  margin: 16px 0px;
  flex-direction: column;
  align-items: center;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  gap: 4px;
`;

//TODO 많은 수정 필요...
