import { NavBar } from '@/components/common/NavBar';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/common/Button/Button';

interface ContractInfo {
  contractId: number;
  careTypes: string[];
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  workSalaryAmount: number;
  workStartDate: string;
}

interface ChatRoomInfo {
  elderlyName: string;
  nursingInstitutionName: string;
  careGiverName: string;
  contractInfoResponseList: ContractInfo[];
}

const ChatRoomPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<ChatRoomInfo>();
  const [role, setRole] = useState('');
  const { matchingId } = useParams<{ matchingId: string }>();
  const [recruitmentId, setRecruitmentId] = useState('');
  const [approve, setApprove] = useState(false);

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
        `${apiBaseURL}/contract/list/${matchingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log('채팅방 내역 get 에러: ', e);
    }

    try {
      const response = await axios.get(
        `${apiBaseURL}/recruitment/test?matchingId=${matchingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setRecruitmentId(response.data);
    } catch (e) {
      console.log('채팅방 내역 id get 에러: ', e);
    }
  };

  const postData = async () => {
    let accessToken;
    if (localStorage.getItem('isAutoLogin')) {
      accessToken = localStorage.getItem('accessToken');
    } else {
      accessToken = sessionStorage.getItem('accessToken');
    }

    try {
      const response = await axios.post(
        `${apiBaseURL}/complete-matching?contractId=${matchingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
    } catch (e) {
      console.log('채팅방 내역 post 에러: ', e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('role') === 'socialworker') {
      setRole('social');
    } else {
      setRole('caregiver');
    }
    console.log(role);
    getData();
  }, []);

  const formatCareTypes = (types: string[]) => {
    if (!types || types.length === 0) return '없음'; // careTypes가 없을 경우 처리

    if (types.length > 2) {
      return `${types[0]}, ${types[1]} 외 ${types.length - 2}`;
    }
    return types.join(', ');
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
        center={<NavCenter>{data?.nursingInstitutionName}</NavCenter>}
        color="white"
      />

      <ChattingTitleWrapper>
        <TitlePersonWrapper>
          <TitleImg />
          <TitleLabel color="">{data?.elderlyName} 어르신</TitleLabel>
        </TitlePersonWrapper>
        <TitleLabel
          color="blue"
          onClick={() => {
            navigate(`/work/${recruitmentId}`);
          }}
        >
          정보 보기
        </TitleLabel>
      </ChattingTitleWrapper>

      <MainContent>
        {data?.contractInfoResponseList.map((info) => (
          <ChatWrapper social={role === 'social'}>
            <ChatTitle>합격 축하드립니다.</ChatTitle>
            <ChatDetail800>
              {data.elderlyName} 어르신 근무 조건 확인 후<br />
              최종 승인하기 버튼을 눌러주세요
            </ChatDetail800>
            <Card>
              <CardLabel>
                <Label12400>성함</Label12400>
                <Label12500>{data.elderlyName}</Label12500>
              </CardLabel>
              <CardLabel>
                <Label12400>근무형태</Label12400>
                <Label12500>{formatCareTypes(info.careTypes)}</Label12500>
              </CardLabel>
              <CardLabel>
                <Label12400>근무요일</Label12400>
                <Label12500>
                  {info.workDays
                    .map((day: string) => {
                      switch (day) {
                        case 'MONDAY':
                          return '월';
                        case 'TUESDAY':
                          return '화';
                        case 'WEDNESDAY':
                          return '수';
                        case 'THURSDAY':
                          return '목';
                        case 'FRIDAY':
                          return '금';
                        case 'SATURDAY':
                          return '토';
                        case 'SUNDAY':
                          return '일';
                        default:
                          return day;
                      }
                    })
                    .join(', ')}
                </Label12500>
              </CardLabel>
              <CardLabel>
                <Label12400>근무시간</Label12400>
                <Label12500>
                  {info.workStartTime} ~ {info.workEndTime}
                </Label12500>
              </CardLabel>
              <CardLabel>
                <Label12400>급여</Label12400>
                <Label12500>{info.workSalaryAmount}원</Label12500>
              </CardLabel>
              <CardLabel>
                <Label12400>근무시작</Label12400>
                <Label12500>{info.workStartDate}</Label12500>
              </CardLabel>
            </Card>
            <ChatDetail500>문의사항은 기관에 연락주세요</ChatDetail500>
            <Button
              variant="blue2"
              width=""
              height="40px"
              onClick={() => {
                setApprove(true);
                postData();
              }}
            >
              최종 승인하기
            </Button>
          </ChatWrapper>
        ))}

        {approve && (
          <ApproveWrapper>
            <ApproveTitle>최종 승인이 확정되었습니다!</ApproveTitle>
            <ApproveDetail>
              {data?.elderlyName} 어르신을 위한 돌봄 일정이 추가되었습니다.
            </ApproveDetail>
          </ApproveWrapper>
        )}
      </MainContent>
    </Container>
  );
};

export default ChatRoomPage;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.subBlue};
  min-height: 100vh;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-left: 20px;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  margin-right: 20px;
`;

const ChattingTitleWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
`;

const TitlePersonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const TitleImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const TitleLabel = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 60px 20px;
`;

const ChatWrapper = styled.div<{ social: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  justify-content: ${({ social }) => (social ? 'flex-end' : '')};
  background: ${({ theme }) => theme.colors.white};
  margin: 20px 20px auto auto;
  min-width: 213px;
  border-radius: 12px;
`;

const ChatTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const ChatDetail800 = styled.label`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const ChatDetail500 = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const CardLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  algin-items: center;
`;

const Label12400 = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

const Label12500 = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ApproveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const ApproveTitle = styled.div`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-align: center;
`;

const ApproveDetail = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-align: center;
`;
