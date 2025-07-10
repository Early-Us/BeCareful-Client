import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Chat } from '@/assets/icons/ChatNewBlack.svg';
import { ReactComponent as ChatNew } from '@/assets/icons/ChatNew.svg';
import { NavBar } from '../common/NavBar/NavBar';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';
import {
  DayFormat,
  GenderMapping,
  SalaryTypeMapping,
} from '@/constants/caregiver';

interface CaregiverWorkDetailProps {
  work: MatchingRecruitmentResponse;
  date?: string;
}

const CaregiverWorkDetail = ({ work, date }: CaregiverWorkDetailProps) => {
  const navigate = useNavigate();

  const chatNew = false;

  return (
    <Container style={{ marginBottom: date ? '' : '92px' }}>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('-1');
              window.scrollTo(0, 0);
            }}
          />
        }
        right={
          <NavRight
            onClick={() => {
              navigate('/caregiver/chatlist');
              window.scrollTo(0, 0);
            }}
          >
            {chatNew ? <ChatNew /> : <Chat />}
          </NavRight>
        }
        color="white"
      />

      <WorkInfoWrapper>
        <div className="top">
          <ApplyDate>
            <label className="institution">
              {work.recruitmentInfo.institutionName}
            </label>
            {date && (
              <label className="date">{date.replace(/-/g, '.')} 신청</label>
            )}
          </ApplyDate>

          <label className="work-title">{work.recruitmentInfo.title}</label>

          {(work.matchingResultStatus === '높음' ||
            work.isHotRecruitment ||
            work.isHourlySalaryTop) && (
            <Tags>
              {work.matchingResultStatus === '높음' && (
                <label className="tag">적합도 높음</label>
              )}
              {work.isHotRecruitment && <label className="tag">인기공고</label>}
              {work.isHourlySalaryTop && (
                <label className="tag">시급 TOP</label>
              )}
            </Tags>
          )}
        </div>

        <div className="bottom">
          <div className="apply">
            <label className="title">장기요양등급</label>
            <label className="title">근무요일</label>
            <label className="title">근무시간</label>
            <label className="title">
              {SalaryTypeMapping[work.recruitmentInfo.workSalaryType]}
            </label>
          </div>

          <div className="apply">
            <label className="detail">{work.elderlyInfo.careLevel}</label>
            <label className="detail">
              {DayFormat(work.recruitmentInfo.workDays)}
            </label>
            <label className="detail">
              {work.recruitmentInfo.workStartTime} ~{' '}
              {work.recruitmentInfo.workEndTime}
            </label>
            <label className="detail">
              {work.recruitmentInfo.workSalaryAmount.toLocaleString('ko-KR')}
            </label>
          </div>
        </div>
      </WorkInfoWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">어르신 정보</label>

        <div className="info">
          <img src={work.elderlyInfo.profileImageUrl} />
          <label className="section-title">{work.elderlyInfo.name}</label>
        </div>

        <div className="applyWrapper">
          <div className="apply">
            <label className="title">나이/성별</label>
            <label className="title">주소</label>
            <label className="title">건강상태</label>
            <label className="title">거주형태</label>
            <label className="title">애완동물</label>
          </div>
          <div className="apply">
            <label className="detail">
              {work.elderlyInfo.age}세 {GenderMapping[work.elderlyInfo.gender]}
            </label>
            <label className="detail">{work.elderlyInfo.address}</label>
            <label className="detail">{work.elderlyInfo.healthCondition}</label>
            <label className="detail">
              {work.elderlyInfo.hasInmate ? '동거중' : '독거중'}
            </label>
            <label className="detail">
              {work.elderlyInfo.hasPet ? '있음' : '없음'}
            </label>
          </div>
        </div>
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">근무 내용</label>
        <div className="apply">
          <div className="applyWrapper">
            <label className="title">케어항목</label>
            <div className="apply">
              {work.recruitmentInfo.careTypes.map((caretype) => (
                <label key={caretype.careType} className="detail">
                  {caretype.careType} - {caretype.detailCareTypes}
                </label>
              ))}
            </div>
          </div>
          <div className="applyWrapper">
            <label className="title">기타</label>
            <label className="detail">{work.recruitmentInfo.description}</label>
          </div>
        </div>
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="section-title">기관 정보</label>
        <div className="applyWrapper">
          <div className="apply">
            <label className="title">기관명</label>
            <label className="title">주소</label>
          </div>
          <div className="apply">
            <label className="detail">{work.institutionInfo.name}</label>
            <label className="detail">{work.institutionInfo.address}</label>
          </div>
        </div>
      </SectionWrapper>
    </Container>
  );
};

export default CaregiverWorkDetail;

const Container = styled.div`
  margin: auto 20px;

  div {
    display: flex;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .applyWrapper {
    gap: 24px;
  }

  .apply {
    flex-direction: column;
    gap: 8px;
  }

  .title {
    width: 56px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray700};
`;

const WorkInfoWrapper = styled.div`
  padding-bottom: 32px;
  flex-direction: column;
  gap: 16px;

  .top {
    flex-direction: column;
    gap: 8px;
  }

  .work-title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .bottom {
    gap: 20px;
  }

  .title {
    width: 72px;
  }
`;

const ApplyDate = styled.div`
  gap: 6px;

  label {
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
  }

  .institution {
    color: ${({ theme }) => theme.colors.gray500};
  }

  .date {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Tags = styled.div`
  gap: 6px;

  .tag {
    padding: 4px 8px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;

  .section-title {
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .info {
    gap: 10px;
    align-items: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;

const Border = styled.div`
  width: 100vw;
  height: 5px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;
