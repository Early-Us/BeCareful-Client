import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Elederly } from '@/assets/icons/elderly/Elderly.svg';
import { Button } from '@/components/common/Button/Button';
import styled from 'styled-components';
import { useState } from 'react';
import { ElderlyDropDown } from '@/components/Elderly/ElderlyDropDown';
import Modal from '@/components/common/Modal/Modal';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as ButtonLeft } from '@/assets/icons/elderly/ButtonLeft.svg';
import { CareTypeList } from '@/data/CareTypeList';
import { CareChcekBox } from '@/components/common/CheckBox/CareChcekBox';
import axios from 'axios';
import { AreaSocial } from '@/data/AreaSocial';

interface AreaSocial {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

type CareType = '식사보조' | '이동보조' | '배변보조' | '일상생활' | '질병보조';

const EdlerlyCreatePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [healthCondition, setHealthCondition] = useState('');

  // 성별
  const [gender, setGender] = useState('');
  const handleGenderChange = (gender: string) => {
    setGender(gender);
  };

  // 동거가족
  const [inmate, setInmate] = useState('');
  const handleInmateChange = (inmate: string) => {
    setInmate(inmate);
  };

  // 애완동물
  const [pet, setPet] = useState('');
  const handlePetChange = (pet: string) => {
    setPet(pet);
  };

  // 장기요양등급
  const [selectedDropContents, setSelectedDropContents] = useState<string[]>(
    [],
  );
  const dropContents = [
    '1등급',
    '2등급',
    '3등급',
    '4등급',
    '5등급',
    '인지지원등급',
    '등급없음',
  ];

  // 근무지역 선택 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 근무 지역
  const [selectedArea, setSelectedArea] = useState<AreaSocial | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedGu('');
    setSelectedDong('');
  };
  const handleGuSelect = (gu: string) => {
    setSelectedGu(gu);
    setSelectedDong('');
  };
  const handleDongSelect = (dong: string) => {
    setSelectedDong(dong);
  };
  const handleSelectBtn = () => {
    if (selectedCity && selectedGu && selectedDong) {
      setSelectedArea({
        siDo: selectedCity,
        siGuGun: selectedGu,
        dongEupMyeon: selectedDong,
      });
      setIsModalOpen(false);
    }
  };

  // 케어 타입
  const [selectedCareDropContents, setSelectedCareDropContents] =
    useState<CareType | null>(null);
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const careDropContents = [
    '식사보조',
    '이동보조',
    '배변보조',
    '일상생활',
    '질병보조',
  ];
  const handleDetailSelect = (item: string) => {
    setSelectedDetails((prevDetails) =>
      prevDetails.includes(item)
        ? prevDetails.filter((detail) => detail !== item)
        : [...prevDetails, item],
    );

    console.log(selectedDetails);
  };

  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const putData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    const data = {
      name: name,
      birthday: birth,
      inmate: inmate === '있음' ? true : false,
      pet: pet === '있음' ? true : false,
      gender: gender,
      careLevel: selectedDropContents[0],
      siDo: selectedCity,
      siGuGun: selectedGu,
      eupMyeonDong: selectedDong,
      detailAddress: detailAddress,
      profileImageUrl: 'string',
      healthCondition: healthCondition,
      detailCareTypeList: selectedDetails,
    };
    console.log(data);

    try {
      const response = await axios.post(
        `${apiBaseURL}/elderly/register`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
    } catch (e) {
      console.log('어르신 등록하기 에러: ', e);
    }
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </NavLeft>
        }
        center={<NavCenter>어르신 등록</NavCenter>}
        color="white"
      />

      <MainContent>
        <ProfileWrapper>
          <ProfileImgWrapper>
            <Elederly />
          </ProfileImgWrapper>

          <SectionWrapper>
            <TitleWrapper>
              <Title color="">이름</Title>
              <Title color="blue">*</Title>
            </TitleWrapper>
            <Input
              placeholder="이름 입력"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </SectionWrapper>
        </ProfileWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">생년월일</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <Input
            placeholder="예) 1978-05-08"
            onChange={(e) => {
              setBirth(e.target.value);
            }}
          />
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">성별</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <RadioWrapper>
            <RadioButtonWrapper>
              <RadioButton
                type="radio"
                id="MALE"
                name="gender"
                checked={gender === 'MALE'}
                onChange={() => handleGenderChange('MALE')}
              />
              <Label htmlFor="MALE">남성</Label>
            </RadioButtonWrapper>
            <RadioButtonWrapper>
              <RadioButton
                type="radio"
                id="FEMALE"
                name="gender"
                checked={gender === 'FEMALE'}
                onChange={() => handleGenderChange('FEMALE')}
              />
              <Label htmlFor="FEMALE">여성</Label>
            </RadioButtonWrapper>
          </RadioWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">장기요양등급</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <ElderlyDropDown
            title="선택"
            contents={dropContents}
            selectedContents={selectedDropContents}
            setSelectedContents={setSelectedDropContents}
            width="100%"
          />
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">근무지역</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>

          <AreaSelectWrapper>
            <Input
              placeholder="근무지역 선택"
              value={selectedArea ? `${selectedArea.dongEupMyeon}` : ''}
              style={{ width: '100%' }}
            />
            <Button
              variant="blue2"
              width="37.5%"
              height="52px"
              onClick={openModal}
            >
              지역 선택
            </Button>
          </AreaSelectWrapper>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalWrapper>
              <AreaTitleWrapper>
                <AreaTitleLabel>지역설정</AreaTitleLabel>
                <Close
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  <ModalClose />
                </Close>
              </AreaTitleWrapper>
              <AreasWrapper>
                <AreaWrapper>
                  <AreaTitle>시/도</AreaTitle>
                  <AreaAreaWrapper>
                    {AreaSocial.city.map((city) => (
                      <AreaArea
                        key={city.name}
                        onClick={() => handleCitySelect(city.name)}
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
                    <AreaAreaWrapper
                      style={{
                        borderLeft: '1px solid #d9d9d9',
                        borderRight: '1px solid #d9d9d9',
                      }}
                    >
                      {AreaSocial.city
                        .find((city) => city.name === selectedCity)
                        ?.gu?.map((gu) => (
                          <AreaArea
                            key={gu.name}
                            onClick={() => handleGuSelect(gu.name)}
                            color={selectedGu === gu.name}
                          >
                            {gu.name}
                          </AreaArea>
                        )) || <p>구가 없습니다.</p>}
                    </AreaAreaWrapper>
                  </AreaWrapper>
                )}
                {selectedGu && (
                  <AreaWrapper>
                    <AreaTitle>동/면/읍</AreaTitle>
                    <AreaAreaWrapper>
                      {AreaSocial.city
                        .find((city) => city.name === selectedCity)
                        ?.gu.find((gu) => gu.name === selectedGu)
                        ?.dong.map((dong) => (
                          <AreaArea
                            key={dong}
                            onClick={() => handleDongSelect(dong)}
                            color={selectedDong === dong}
                          >
                            {dong}
                          </AreaArea>
                        )) || <p>동이 없습니다.</p>}
                    </AreaAreaWrapper>
                  </AreaWrapper>
                )}
              </AreasWrapper>
              <Button
                variant={
                  selectedCity && selectedGu && selectedDong
                    ? 'blue'
                    : 'disabled'
                }
                width=""
                height="52px"
                onClick={handleSelectBtn}
                disabled={
                  selectedCity && selectedGu && selectedDong ? false : true
                }
              >
                선택하기
              </Button>
            </ModalWrapper>
          </Modal>

          <Input
            placeholder="상세주소"
            onChange={(e) => {
              setDetailAddress(e.target.value);
            }}
          />
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">건강상태</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <Input
            placeholder="예) 당뇨, 신장질환"
            onChange={(e) => {
              setHealthCondition(e.target.value);
            }}
          />
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">케어 필요항목</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <CareWrapper>
            <ElderlyDropDown
              title="항목선택"
              contents={careDropContents}
              selectedContents={
                selectedCareDropContents ? [selectedCareDropContents] : []
              }
              setSelectedContents={(content) =>
                setSelectedCareDropContents((content[0] as CareType) || null)
              }
              width="100%"
            />
            <CareButton onClick={() => setIsCareModalOpen(true)}>
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
        </SectionWrapper>
        <Modal
          isOpen={isCareModalOpen}
          onClose={() => setIsCareModalOpen(false)}
        >
          <CaretypeModal>
            <ModalTitleWrapper>
              <ModalTitleLabel>{selectedCareDropContents}</ModalTitleLabel>
              <ModalXImg
                onClick={() => {
                  setIsCareModalOpen(!isCareModalOpen);
                }}
              >
                <ModalClose />
              </ModalXImg>
            </ModalTitleWrapper>
            <CareModalButtonWrapper>
              {selectedCareDropContents &&
                CareTypeList[selectedCareDropContents]?.map((carelist) => (
                  <CareChcekBox
                    key={carelist}
                    id={carelist}
                    label={carelist}
                    checked={selectedDetails.includes(carelist)}
                    onChange={() => handleDetailSelect(carelist)}
                    width="auto"
                    height="36px"
                  />
                ))}
            </CareModalButtonWrapper>
            <Button
              variant="blue"
              width=""
              height="52px"
              onClick={() => {
                setIsCareModalOpen(false);
              }}
            >
              선택하기
            </Button>
          </CaretypeModal>
        </Modal>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">동거가족</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <RadioWrapper>
            <RadioButtonWrapper>
              <RadioButton
                type="radio"
                id="inmateT"
                name="inmate"
                checked={inmate === '있음'}
                onChange={() => handleInmateChange('있음')}
              />
              <Label htmlFor="inmateT">있음</Label>
            </RadioButtonWrapper>
            <RadioButtonWrapper>
              <RadioButton
                type="radio"
                id="inmateF"
                name="inmate"
                checked={inmate === '없음'}
                onChange={() => handleInmateChange('없음')}
              />
              <Label htmlFor="inmateF">없음</Label>
            </RadioButtonWrapper>
          </RadioWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <TitleWrapper>
            <Title color="">애완동물</Title>
            <Title color="blue">*</Title>
          </TitleWrapper>
          <RadioWrapper>
            <RadioButtonWrapper>
              <RadioButton
                type="radio"
                id="petT"
                name="pet"
                checked={pet === '있음'}
                onChange={() => handlePetChange('있음')}
              />
              <Label htmlFor="petT">있음</Label>
            </RadioButtonWrapper>
            <RadioButtonWrapper>
              <RadioButton
                type="radio"
                id="petF"
                name="pet"
                checked={pet === '없음'}
                onChange={() => handlePetChange('없음')}
              />
              <Label htmlFor="petF">없음</Label>
            </RadioButtonWrapper>
          </RadioWrapper>
        </SectionWrapper>

        <LastWrapper>
          <Border />
          <Button
            variant="blue"
            width=""
            height="52px"
            style={{ margin: '20px 0px' }}
            onClick={() => {
              putData();
              navigate('/elderly');
            }}
          >
            저장하기
          </Button>
        </LastWrapper>
      </MainContent>
    </Container>
  );
};

export default EdlerlyCreatePage;

const Container = styled.div`
  margin: auto 20px;
`;

const NavLeft = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const MainContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

const Title = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Input = styled.input`
  height: 36px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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

const LastWrapper = styled.div``;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const RadioButtonWrapper = styled.div`
  width: 100%;
`;

const RadioButton = styled.input`
  display: none;
`;

const Label = styled.label`
  height: 52px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiblod};

  ${RadioButton}:checked + & {
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ModalWrapper = styled.div`
  width: 272px;
  height: 328px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px 20px 20px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const AreaSelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const AreaTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AreaTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Close = styled.div`
  width: 24px;
  height: 24px;
`;

const AreasWrapper = styled.div`
  display: flex;
  gap: 1px;
  height: 216px;
`;

const AreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AreaTitle = styled.label`
  background: ${({ theme }) => theme.colors.gray50};
  width: 76px;
  height: 20px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  line-height: 140%;
`;

const AreaAreaWrapper = styled.button`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AreaArea = styled.div<{ color: boolean }>`
  width: 100%;
  height: 20px;
  padding: 8px 16px;

  color: ${({ theme, color }) =>
    color ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;
  text-align: start;

  &:hover {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const CaretypeModal = styled.div`
  padding: 28px 20px 20px 20px;
  background: ${({ theme }) => theme.colors.white};
  width: 272px;
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const ModalXImg = styled.div`
  width: 24px;
  height: 24px;
`;

const CareWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const CareButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 15px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%; /* 22.4px */
`;

const CareModalButtonWrapper = styled.div`
  padding-bottom: 32px;
  display: flex;
  width: 100%;
  gap: 16px;
  flex-wrap: wrap;
  border: 1px solid;
`;

const CareLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
