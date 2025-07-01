import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as Add } from '@/assets/icons/ButtonPlus.svg';
import { ReactComponent as Delete } from '@/assets/icons/ButtonMinus.svg';
import { CareerDetail } from '@/types/Caregiver/mypage';
import { CareerDropdown } from '@/components/Caregiver/Mypage/CareerDropdown';

interface CareerExpProps {
  careerDetails?: CareerDetail[];
  handleExperienceChange: (experiences: CareerDetail[]) => void;
}

const CaregiverCareerExperience = ({
  careerDetails,
  handleExperienceChange,
}: CareerExpProps) => {
  const [experiences, setExperiences] = useState<CareerDetail[]>([
    { workInstitution: '', workYear: '1년' },
  ]);

  const addExperience = () => {
    updateExperiences([
      ...experiences,
      { workInstitution: '', workYear: '1년' },
    ]);
  };

  const deleteExperience = () => {
    if (experiences.length > 1) {
      updateExperiences(experiences.slice(0, -1));
    }
  };

  const updateExperiences = (newExperiences: CareerDetail[]) => {
    setExperiences(newExperiences);
    handleExperienceChange(newExperiences);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience,
    );
    updateExperiences(updatedExperiences);
  };

  const handleSelectWorkYear = (index: number, year: string) => {
    handleChange(index, 'workYear', year);
  };
  const dropContents = [
    '1년 미만',
    '1년',
    '2년',
    '3년',
    '4년',
    '5년',
    '6년',
    '7년',
    '8년',
    '9년',
    '10년 이상',
  ];

  useEffect(() => {
    if (careerDetails) {
      setExperiences(careerDetails);
    }
  }, [careerDetails]);

  return (
    <Container>
      {experiences.map((experience, index) => (
        <CareerWrapper>
          <InstitutionWrapper>
            <label>
              근무처 <span>*</span>
            </label>
            <Institution
              placeholder="근무처를 입력해주세요"
              value={experience.workInstitution}
              onChange={(e) =>
                handleChange(index, 'workInstitution', e.target.value)
              }
            />
          </InstitutionWrapper>

          <InstitutionWrapper>
            <label>
              근무기간 <span>*</span>
            </label>
            <CareerDropdown
              title="근무 기간을 선택해주세요"
              contents={dropContents}
              selectedContents={[experience.workYear]}
              setSelectedContents={(value) =>
                handleSelectWorkYear(index, value[0])
              }
            />
          </InstitutionWrapper>

          {experiences.length > 1 && (
            <Button isBlue={false} onClick={deleteExperience}>
              <Delete />
              경력 삭제하기
            </Button>
          )}
        </CareerWrapper>
      ))}

      <Button isBlue={true} onClick={addExperience}>
        <Add />
        경력 추가하기
      </Button>
    </Container>
  );
};

export default CaregiverCareerExperience;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CareerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 32px 20px;
  gap: 12px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  margin-bottom: 16px;
`;

const InstitutionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Institution = styled.input`
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Button = styled.button<{ isBlue: boolean }>`
  width: 100%;
  height: 52px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.subBlue : theme.colors.gray50};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
