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
} from '@/components/SocialWorker/ElderyCreate/Section.styles';
import {
  CARE_TYPES,
  CareType,
  CareTypeList,
} from '@/constants/careTypes.socialWorker';
import { useState } from 'react';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as ButtonLeft } from '@/assets/icons/elderly/ButtonLeft.svg';
import Modal from '@/components/common/Modal/Modal';
import { Button } from '@/components/common/Button/Button';
import { CareChcekBox } from '@/components/common/CheckBox/CareChcekBox';

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
              CareTypeList[selectedCare]?.map((item) => (
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
