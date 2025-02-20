import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
import { useState } from 'react';
import { CheckBoxSelect } from '@/components/common/CheckBox/CheckBoxSelect';
import { TimeDropdown } from '@/components/common/Dropdown/TimeDropdown';
import { MatchingCareCard } from '@/page/Matching/MatchingCareCard';

import { Button } from '@/components/common/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MatchingApplicationDropdown } from '@/components/Matching/MatchingApplicationDropdown';

export const MatchingElderPage = () => {
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [workSalaryAmount, setWorkSalaryAmount] = useState(0);
  const [memoContent, setMemoContent] = useState('');

  const [selectedPayType, setSelectedPayType] = useState<string[]>([]);

  const handleSelectDay = (id: string) => {
    setSelectDay((prev) => {
      if (prev.includes(id)) {
        return prev.filter((day) => day !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCareTypeChange = (careType: string) => {
    setCareTypes((prev) => {
      if (prev.includes(careType)) {
        return prev.filter((type) => type !== careType);
      } else {
        return [...prev, careType];
      }
    });
  };

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  //const [recruitmentId, setRecruitmentId] = useState<string | null>(null);

  const handleSubmit = async () => {
    const payload = {
      elderlyId: 1,
      title,
      workDays: selectDay.map((day) => dayAPI[day as keyof typeof dayAPI]),
      workStartTime: startTime,
      workEndTime: endTime,
      careTypes,
      workSalaryType: 'HOUR',
      workSalaryAmount,
      description: memoContent,
    };

    const token = sessionStorage.getItem('accessToken');

    try {
      const response = await axios.post(`${apiUrl}/recruitment`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('response:', response);

      if (response.status === 200) {
        const newRecruitmentId = response.data;

        navigate(`/matching/info/${newRecruitmentId}`);
      }
    } catch (error) {
      console.error('공고 등록 실패:', error);
    }
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

  const dayAPI = {
    월: 'MONDAY',
    화: 'TUESDAY',
    수: 'WEDNESDAY',
    목: 'THURSDAY',
    금: 'FRIDAY',
    토: 'SATURDAY',
    일: 'SUNDAY',
  };

  const isFormValid =
    title.trim() !== '' &&
    selectDay.length > 0 &&
    startTime !== '' &&
    endTime !== '' &&
    careTypes.length > 0 &&
    workSalaryAmount > 0;

  const navigate = useNavigate();
  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate('/matching')}>
          <IconArrowLeft />
        </IconContainer>
        매칭 등록
        <HideIconContainer />
      </TopContainer>
      <TitleContainer>
        <div className="name">
          <span>제목</span>
          <span className="highlight">*</span>
        </div>
        <PlainInputBox
          state="default"
          placeholder="공고 제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          width="100%"
          guide={''}
        />
      </TitleContainer>
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
      <TitleContainer>
        <div className="name">
          <span>근무시간</span>
          <span className="highlight">*</span>
        </div>
        <TimeBoxContainer>
          <TimeDropdown
            width="50%"
            value={startTime || '00:00'}
            onChange={(time: string) => setStartTime(time)}
          />
          ~
          <TimeDropdown
            width="50%"
            value={endTime || '00:00'}
            onChange={(time: string) => setEndTime(time)}
          />
        </TimeBoxContainer>
      </TitleContainer>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">케어항목</SectionTitle>
          <SectionTitle color="blue">*</SectionTitle>
        </SectionTitleWrapper>
        <SectionGuide>중복선택 가능</SectionGuide>
        <MatchingCareCard
          title="식사보조"
          description="스스로 식사가능, 경관식 보조"
          initialChecked={false}
          onChange={() => handleCareTypeChange('식사보조')}
        />
        <MatchingCareCard
          title="배변보조"
          description="가끔 대소변 실수 시 도움, 기저귀 케어 필요"
          initialChecked={false}
          onChange={() => handleCareTypeChange('배변보조')}
        />
        <MatchingCareCard
          title="일상생활"
          description="청소, 빨래보조"
          initialChecked={false}
          onChange={() => handleCareTypeChange('일상생활')}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">희망 급여</SectionTitle>
          <SectionTitle color="blue">*</SectionTitle>
        </SectionTitleWrapper>
        <PayWrapper>
          <MatchingApplicationDropdown
            title="시급"
            contents={['시급', '일급', '월급', '연봉']}
            selectedContents={selectedPayType}
            setSelectedContents={setSelectedPayType}
          />
          <PayFieldWrapper>
            <PayField
              id="pay"
              placeholder="금액입력"
              value={workSalaryAmount}
              onChange={(e) => setWorkSalaryAmount(Number(e.target.value))}
            />
            <PayCount>원</PayCount>
          </PayFieldWrapper>
        </PayWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitleWrapper>
          <SectionTitle color="">기타</SectionTitle>
        </SectionTitleWrapper>
        <MemoFieldWrapper>
          <MemoField
            id="memo"
            placeholder="참고할 사항을 입력하세요."
            value={memoContent}
            maxLength={200}
            onChange={(e) => setMemoContent(e.target.value)}
          />
          <MemoCount>{memoContent.length}/200</MemoCount>
        </MemoFieldWrapper>
      </SectionWrapper>
      <Border />
      <Button
        variant={isFormValid ? 'blue' : 'disabled'}
        height="52px"
        style={{ margin: '20px 0px' }}
        onClick={handleSubmit}
        disabled={!isFormValid}
      >
        매칭 등록하기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 24px 16px auto 16px;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const HideIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 40px 20px 0px 20px;
  align-items: flex-start;
  width: 100%;
  gap: 8px;

  flex-direction: column;

  font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .name {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 20px 0px 20px;
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

const SelectWrapper = styled.div<{ gap: string }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => (gap ? gap : '8px')};
`;

const TimeBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: center;
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

const MemoField = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const MemoCount = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  right: 16px;
  bottom: 16px;
`;

const MemoFieldWrapper = styled.div`
  position: relative;
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
  margin-top: 40px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
