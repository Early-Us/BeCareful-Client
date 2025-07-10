import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Toggle } from '@/components/common/Toggle/Toggle';
import { ReactComponent as ApplicationIcon } from '@/assets/icons/caregiver/MyWork.svg';
import { ReactComponent as CareerIcon } from '@/assets/icons/caregiver/my/Career.svg';
import { ReactComponent as LogoutIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CareTypeFormat,
  DayFormat,
  GenderMapping,
  LocationFormat,
  TimeFormat,
} from '@/constants/caregiver';
import { CaregiverMyResponse } from '@/types/Caregiver/mypage';
import {
  getCaregiverMyPageInfo,
  workApplicationActive,
  workApplicationInactive,
} from '@/api/caregiver';
import ProfileCard from '@/components/shared/ProfileCard';

const CaregiverMyPage = () => {
  const { data, isLoading, error } = useQuery<CaregiverMyResponse, Error>({
    queryKey: ['caregiverMypageInfo'],
    queryFn: getCaregiverMyPageInfo,
  });
  if (isLoading) {
    console.log('getCaregiverMyPageInfo: 로딩 중');
  }
  if (error) {
    console.log('getCaregiverMyPageInfo 에러: ', error);
  }

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const queryClient = useQueryClient();
  const workApplicationToggle = useMutation({
    mutationFn: (isActive: boolean) => {
      if (isActive) {
        return workApplicationInactive();
      } else {
        return workApplicationActive();
      }
    },
    onSuccess: () => {
      console.log('일자리 매칭 상태 변경 성공');
      setIsToggleChecked((prev) => !prev);
      queryClient.invalidateQueries({
        queryKey: ['applicationToggle'],
      });
    },
    onError: (error) => {
      console.log('일자리 매칭 상태 변경 실패', error);
    },
  });

  const [isToggleChecked, setIsToggleChecked] = useState(false);
  useEffect(() => {
    if (data?.isWorkApplicationActive !== undefined) {
      setIsToggleChecked(data.isWorkApplicationActive);
    }
  }, [data?.isWorkApplicationActive]);

  const handleToggleChange = () => {
    workApplicationToggle.mutate(isToggleChecked);
  };

  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <Container>
      <NavBar left={<NavLeft>마이페이지</NavLeft>} color="" />

      <ProfileWrapper>
        {data && (
          <ProfileCard
            profileImgURL={data?.profileImageUrl}
            name={data?.name}
            point={1500}
            phoneNumber={data?.phoneNumber}
            age={52}
            gender={data?.gender && GenderMapping[data?.gender]}
          />
        )}
        <Bottom>
          <div className="certificateWrapper">
            <label className="title-label">기본 자격</label>
            <div className="certificates">
              <CertificateCard isBlue={data?.isHavingCar}>
                {data?.isHavingCar ? '자차 보유' : '자차 미보유'}
              </CertificateCard>
              <CertificateCard isBlue={data?.isCompleteDementiaEducation}>
                {data?.isCompleteDementiaEducation
                  ? '치매교육 이수 완료'
                  : '치매교육 이수전'}
              </CertificateCard>
            </div>
          </div>
          <div className="certificateWrapper">
            <label className="title-label">보유 자격증</label>
            <div className="certificates">
              {data?.certificateNames.map((certificate, index) => (
                <label key={`certificate-${index}`} className="certificate">
                  {certificate}
                </label>
              ))}
            </div>
          </div>
        </Bottom>
        <Button onClick={() => handleNavigate('/caregiver/my/profile')}>
          프로필 수정하기
        </Button>
      </ProfileWrapper>

      <Border />

      <SectionWrapper>
        <label className="title-label">경력서</label>
        {data?.careerTitle ? (
          <Career>
            <div className="dateWrapper">
              <label className="date">최근 수정일 </label>
              <span>{data?.careerLastModifyDate.replaceAll('-', '.')}</span>
            </div>
            <label className="title">{data?.careerTitle}</label>
          </Career>
        ) : (
          <NoContent>
            <CareerIcon />
            <label className="title">아직 등록된 경력서가 없어요!</label>
            <label className="detail">
              나의 경력을 입력하여 합격률을 높여보세요!
            </label>
          </NoContent>
        )}
        <Button onClick={() => handleNavigate('/caregiver/my/career')}>
          {data?.careerTitle ? '경력서 수정하기' : '경력서 작성하기'}
        </Button>
      </SectionWrapper>

      <SectionWrapper>
        <label className="title-label">일자리 신청서</label>
        {data?.workApplicationInfo ? (
          <Application>
            <div className="top">
              <div className="left">
                <div className="dateWrapper">
                  <label className="date">최근 수정일 </label>
                  <span>
                    {data?.workApplicationLastModifyDate.replaceAll('-', '.')}
                  </span>
                </div>
                <label className="title">일자리 신청서</label>
              </div>
              <div className="right">
                <Toggle
                  checked={isToggleChecked ? true : false}
                  onChange={handleToggleChange}
                />
                <ToggleLabel isBlue={isToggleChecked}>
                  {isToggleChecked ? '신청중' : '미신청'}
                </ToggleLabel>
              </div>
            </div>
            <div className="bottom">
              <div className="applyWrapper">
                <label className="apply-title">케어항목</label>
                <label className="apply-title">근무요일</label>
                <label className="apply-title">근무시간</label>
                <label className="apply-title">희망급여</label>
                <label className="apply-title">근무지역</label>
              </div>
              <div className="applyWrapper">
                <label className="apply-detail">
                  {CareTypeFormat(data.workApplicationInfo.careTypes, 2)}
                </label>
                <label className="apply-detail">
                  {DayFormat(data.workApplicationInfo.workDays)}
                </label>
                <label className="apply-detail">
                  {TimeFormat(data.workApplicationInfo.workTimes)}
                </label>
                <label className="apply-detail">
                  {data.workApplicationInfo.workSalaryAmount.toLocaleString(
                    'ko-KR',
                  )}
                  원
                </label>
                <label className="apply-detail">
                  {LocationFormat(data.workApplicationInfo.workLocations, 2)}
                </label>
              </div>
            </div>
          </Application>
        ) : (
          <NoContent>
            <ApplicationIcon />
            <label className="title">아직 등록된 신청서가 없어요!</label>
            <label className="detail">
              일자리 신청서를 등록하고
              <br />
              나에게 딱 맞는 일자리 확인하세요!
            </label>
          </NoContent>
        )}
        <Button onClick={() => handleNavigate('/caregiver/my/application')}>
          {data?.workApplicationInfo ? '신청서 수정하기' : '신청서 작성하기'}
        </Button>
      </SectionWrapper>

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="title-label">계정</label>
        <Logout isRed={true} onClick={handleLogout}>
          <LogoutIcon />
          로그아웃
        </Logout>
        <Logout isRed={false}>
          <LogoutIcon />
          탈퇴하기
        </Logout>
      </SectionWrapper>
    </Container>
  );
};

export default CaregiverMyPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 57px;

  div {
    display: flex;
  }

  .title-label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const NavLeft = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileWrapper = styled.div`
  padding: 12px 0px;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const Bottom = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 20px;

  .certificateWrapper {
    flex-direction: column;
    gap: 16px;
  }

  .certificates {
    gap: 6px;
  }

  .certificate {
    padding: 4px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray50};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const CertificateCard = styled.label<{ isBlue: boolean | undefined }>`
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, isBlue }) => (isBlue ? 'none' : theme.colors.gray100)};
  background: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.subBlue : theme.colors.gray50};
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const NoContent = styled.div`
  margin-bottom: 8px;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    text-align: center;
  }
`;

const Career = styled.div`
  padding: 20px;
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .dateWrapper {
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Application = styled.div`
  padding: 20px;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  div {
    flex-direction: column;
  }

  .dateWrapper {
    flex-direction: row;
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .top {
    flex-direction: row;
    gap: auto;
    justify-content: space-between;
  }

  .left {
    gap: auto;
    justify-content: space-between;
  }

  .right {
    gap: 4px;
    align-items: center;
  }

  .bottom {
    flex-direction: row;
    gap: 32px;
  }

  .applyWrapper {
    gap: 8px;
  }

  .apply-title {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .apply-detail {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Logout = styled.div<{ isRed: boolean }>`
  height: 18px;
  padding: 20px;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  color: ${({ theme, isRed }) =>
    isRed ? theme.colors.mainOrange : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  path {
    stroke: ${({ theme, isRed }) =>
      isRed ? theme.colors.mainOrange : theme.colors.gray500};
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const ToggleLabel = styled.label<{ isBlue: boolean | undefined }>`
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
