import { NavBar } from '@/components/common/NavBar';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import styled from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { useEffect, useState } from 'react';
import { ApplicationDropdown } from '@/components/MyPage/ApplicationDropdown';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import axios from 'axios';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as CloseButtonX } from '@/assets/icons/mypage/CloseButton.svg';
import Modal from '@/components/common/Modal';
import { Area } from '@/data/Area';

interface Area {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

const CreateApplication = () => {
  const navigate = useNavigate();

  // 희망 급여 관련 상태
  const smallDropContents = ['시급', '월급'];
  const [certificateLevel, setCertificateLevel] = useState('시급');
  const [pay, setPay] = useState('');

  // 근무 요일
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const handleSelectDay = (id: string) => {
    setSelectDay((prev) => {
      if (prev.includes(id)) {
        return prev.filter((day) => day !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const days: (keyof typeof dayAPI)[] = [
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ];

  // 근무 시간
  const [selectTime, setSelectTime] = useState<string[]>([]);
  const handleSelectTime = (id: string) => {
    setSelectTime((prev) => {
      if (prev.includes(id)) {
        return prev.filter((time) => time !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const times = ['오전', '오후', '저녁'];

  // 근무 유형
  const [selectCare, setSelectCare] = useState<string[]>([]);
  const handleSelectCare = (id: string) => {
    setSelectCare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((care) => care !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const careTypes = [
    '식사보조',
    '이동보조',
    '배변보조',
    '일상생활',
    '질병보조',
    '',
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 근무 지역
  const [selectedArea, setSelectedArea] = useState<Area[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
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
    if (selectedArea.length < 5) {
      setSelectedArea((prev) => [
        ...prev,
        {
          siDo: selectedCity,
          siGuGun: selectedGu,
          dongEupMyeon: selectedDong,
        },
      ]);
    }
    setIsModalOpen(false);
    resetSelections();
  };
  const resetSelections = () => {
    setSelectedCity('');
    setSelectedGu('');
    setSelectedDong('');
  };
  const removeSelectedArea = (index: number) => {
    setSelectedArea((prev) => prev.filter((_, i) => i !== index));
  };

  // api 보낼때 영어로 변환하기 위함
  const dayAPI = {
    월: 'MONDAY',
    화: 'TUESDAY',
    수: 'WEDNESDAY',
    목: 'THURSDAY',
    금: 'FRIDAY',
    토: 'SATURDAY',
    일: 'SUNDAY',
  };
  const timeAPI = {
    오전: 'MORNING',
    오후: 'AFTERNOON',
    저녁: 'EVENING',
  };

  // api 연결
  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.get(
        `${apiBaseURL}/caregiver/work-application`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      setSelectedArea(response.data.workLocations);
      setSelectDay(
        response.data.workDays.map((day: string) => {
          return (
            Object.keys(dayAPI).find(
              (key: string) => dayAPI[key as keyof typeof dayAPI] === day,
            ) || day
          );
        }),
      );
      setSelectTime(
        response.data.workTimes.map((time: string) => {
          return (
            Object.keys(timeAPI).find(
              (key: string) => timeAPI[key as keyof typeof timeAPI] === time,
            ) || time
          ); // 영어를 한글로 변환
        }),
      );
      setCertificateLevel(
        response.data.workSalaryType === '시급' ? '시급' : '월급',
      );
      setPay(response.data.workSalaryAmount);
      setSelectCare(response.data.careTypes);
    } catch (e) {
      console.log('일자리 신청서 수정 get 에러: ', e);
    }
  };

  const putData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    const workDays = selectDay.map((day) => dayAPI[day as keyof typeof dayAPI]);
    const workTimes = selectTime.map(
      (time) => timeAPI[time as keyof typeof timeAPI],
    );
    const data = {
      workLocations: selectedArea,
      workDays: workDays,
      workTimes: workTimes,
      careTypes: selectCare,
      workSalaryType: certificateLevel === '시급' ? 'HOUR' : 'MONTH',
      workSalaryAmount: Number(pay),
    };
    console.log(data);

    try {
      const response = await axios.put(
        `${apiBaseURL}/caregiver/work-application`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
    } catch (e) {
      console.log('일자리 신청서 수정 put 에러: ', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        center={<NavCenter>신청서 수정하기</NavCenter>}
        color="white"
      />

      <SectionWrapper>
        <TitleWrapper>
          <TitleLabelWrapper>
            <SectionTitleWrapper>
              <SectionTitle color="">희망 근무지역</SectionTitle>
              <SectionTitle color="blue">*</SectionTitle>
            </SectionTitleWrapper>
            <SectionGuide>최대 5개까지 선택 가능</SectionGuide>
          </TitleLabelWrapper>
          <Button
            variant="blue2"
            width="27.5%"
            height="48px"
            onClick={openModal}
          >
            지역 선택
          </Button>
        </TitleWrapper>

        <AreaButtonWrapper>
          {selectedArea.map((area, index) => (
            <AreaButton key={index}>
              <AreaButtonLabel>
                {area.siGuGun} {area.dongEupMyeon}
              </AreaButtonLabel>
              <CloseButton onClick={() => removeSelectedArea(index)}>
                <CloseButtonX />
              </CloseButton>
            </AreaButton>
          ))}
        </AreaButtonWrapper>

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
                  {Area.city.map((city) => (
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
                    {Area.city
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
                    {Area.city
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
              variant="blue"
              width=""
              height="52px"
              onClick={handleSelectBtn}
            >
              선택하기
            </Button>
          </ModalWrapper>
        </Modal>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">희망 근무요일</SectionTitle>
          <SectionTitle color="blue">*</SectionTitle>
        </SectionTitleWrapper>
        <SectionGuide>중복선택 가능</SectionGuide>
        <SelectWrapper gap="4px">
          {days.map((day) => (
            <CheckBoxSelect
              key={day}
              id={day}
              label={day}
              checked={selectDay.includes(day)}
              onChange={handleSelectDay}
              width=""
              height="42px"
            />
          ))}
        </SelectWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">희망 근무시간</SectionTitle>
          <SectionTitle color="blue">*</SectionTitle>
        </SectionTitleWrapper>
        <SectionGuide>중복선택 가능</SectionGuide>
        <SelectWrapper gap="">
          {times.map((time) => (
            <CheckBoxSelect
              key={time}
              id={time}
              label={time}
              checked={selectTime.includes(time)}
              onChange={handleSelectTime}
              width=""
              height="48px"
            />
          ))}
        </SelectWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">희망 급여</SectionTitle>
          <SectionTitle color="blue">*</SectionTitle>
        </SectionTitleWrapper>
        <PayWrapper>
          <ApplicationDropdown
            title="시급"
            contents={smallDropContents}
            selectedContents={[certificateLevel]}
            setSelectedContents={(values) =>
              setCertificateLevel(values[0] || '')
            }
          />
          <PayFieldWrapper>
            <PayField
              id="pay"
              placeholder="금액입력"
              value={pay}
              onChange={(e) => {
                setPay(e.target.value);
              }}
            />
            <PayCount>원</PayCount>
          </PayFieldWrapper>
        </PayWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">근무 유형</SectionTitle>
          <SectionTitle color="blue">*</SectionTitle>
        </SectionTitleWrapper>
        <SectionGuide>중복선택 가능</SectionGuide>
        <SelectWrapper gap="">
          {careTypes.slice(0, 3).map((careType) => (
            <CheckBoxSelect
              key={careType}
              id={careType}
              label={careType}
              checked={selectCare.includes(careType)}
              onChange={handleSelectCare}
              width=""
              height="42px"
            />
          ))}
        </SelectWrapper>
        <SelectWrapper gap="">
          {careTypes
            .slice(3)
            .map((careType, index) =>
              index === 2 ? (
                <CheckBoxSelect
                  key={careType}
                  id={careType}
                  label={careType}
                  width=""
                  height="42px"
                  border={false}
                />
              ) : (
                <CheckBoxSelect
                  key={careType}
                  id={careType}
                  label={careType}
                  checked={selectCare.includes(careType)}
                  onChange={handleSelectCare}
                  width=""
                  height="42px"
                />
              ),
            )}
        </SelectWrapper>
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
            navigate('/mypage');
          }}
        >
          신청서 수정하기
        </Button>
      </LastWrapper>
    </Container>
  );
};

export default CreateApplication;

const Container = styled.div`
  margin: auto 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
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

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const SectionTitle = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const SectionGuide = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectWrapper = styled.div<{ gap: string }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => (gap ? gap : '8px')};
`;

const PayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const PayFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const PayField = styled.textarea`
  width: 100%;
  height: 22px;
  padding: 13px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const PayCount = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 140%;
  right: 16px;
  top: 14px;
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
  margin-top: 24px;
`;

const LastWrapper = styled.div`
  margin-top: 24px;
`;

const AreaButtonWrapper = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const AreaButton = styled.button`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const AreaButtonLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const CloseButton = styled.button`
  width: 14px;
  height: 14px;
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
