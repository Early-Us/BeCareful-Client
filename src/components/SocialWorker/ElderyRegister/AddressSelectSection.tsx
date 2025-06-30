import { Button } from '@/components/common/Button/Button';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { ReactComponent as CloseIcon } from '@/assets/icons/Close.svg';
import Modal from '@/components/common/Modal/Modal';
import {
  AreaArea,
  AreaAreaWrapper,
  AreaSelectWrapper,
  AreasWrapper,
  AreaTitle,
  AreaTitleLabel,
  AreaTitleWrapper,
  AreaWrapper,
  Close,
  ModalWrapper,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { AreaSocial } from '@/types/ElderyRegister';
import { useState } from 'react';

interface AreaSelectData {
  name: string;
  gu: { name: string; dong: string[] }[];
}

interface AddressSelectSectionProps {
  areaData: AreaSelectData[];
  selectedArea: AreaSocial | null;
  detailAddress: string;
  onSelect: (area: AreaSocial) => void;
  onDetailChange: (value: string) => void;
}

export function AddressSelectSection({
  areaData,
  selectedArea,
  detailAddress,
  onSelect,
  onDetailChange,
}: AddressSelectSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectBtn = () => {
    if (selectedCity && selectedGu && selectedDong) {
      onSelect({
        siDo: selectedCity,
        siGuGun: selectedGu,
        dongEupMyeon: selectedDong,
      });
      closeModal();
    }
  };

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">근무지역</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>

      <AreaSelectWrapper>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="근무지역 선택"
          guide=""
          value={selectedArea ? selectedArea.dongEupMyeon : ''}
          onChange={() => {}}
          onKeyDown={(e) => e.preventDefault()}
          suffix={null}
        />

        <Button variant="blue2" width="37.5%" height="52px" onClick={openModal}>
          지역 선택
        </Button>
      </AreaSelectWrapper>

      <PlainInputBox
        width="100%"
        state="default"
        placeholder="상세주소"
        guide=""
        value={detailAddress}
        onChange={(e) => onDetailChange(e.target.value)}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalWrapper>
          <AreaTitleWrapper>
            <AreaTitleLabel>지역설정</AreaTitleLabel>
            <Close onClick={closeModal}>
              <CloseIcon />
            </Close>
          </AreaTitleWrapper>
          <AreasWrapper>
            <AreaWrapper>
              <AreaTitle>시/도</AreaTitle>
              <AreaAreaWrapper>
                {areaData.map((city) => (
                  <AreaArea
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setSelectedGu('');
                      setSelectedDong('');
                    }}
                    color={selectedCity === city.name}
                  >
                    {city.name}
                  </AreaArea>
                ))}
              </AreaAreaWrapper>
            </AreaWrapper>

            {selectedCity && (
              <AreaWrapper>
                <AreaTitle>시/군/구</AreaTitle>
                <AreaAreaWrapper>
                  {areaData
                    .find((c) => c.name === selectedCity)
                    ?.gu.map((gu) => (
                      <AreaArea
                        key={gu.name}
                        onClick={() => {
                          setSelectedGu(gu.name);
                          setSelectedDong('');
                        }}
                        color={selectedGu === gu.name}
                      >
                        {gu.name}
                      </AreaArea>
                    ))}
                </AreaAreaWrapper>
              </AreaWrapper>
            )}

            {selectedGu && (
              <AreaWrapper>
                <AreaTitle>동/면/읍</AreaTitle>
                <AreaAreaWrapper>
                  {areaData
                    .find((c) => c.name === selectedCity)
                    ?.gu.find((g) => g.name === selectedGu)
                    ?.dong.map((dong) => (
                      <AreaArea
                        key={dong}
                        onClick={() => setSelectedDong(dong)}
                        color={selectedDong === dong}
                      >
                        {dong}
                      </AreaArea>
                    ))}
                </AreaAreaWrapper>
              </AreaWrapper>
            )}
          </AreasWrapper>

          <Button
            variant={
              selectedCity && selectedGu && selectedDong ? 'blue' : 'disabled'
            }
            width=""
            height="52px"
            onClick={handleSelectBtn}
            disabled={!selectedCity || !selectedGu || !selectedDong}
          >
            선택하기
          </Button>
        </ModalWrapper>
      </Modal>
    </SectionWrapper>
  );
}
