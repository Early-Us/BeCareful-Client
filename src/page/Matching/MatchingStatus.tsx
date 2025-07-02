import { NavBar } from '@/components/common/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ElderList } from '@/assets/icons/elderly/ElderList.svg';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';

const MatchingStatus = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <NavBar
          left={
            <NavLeft
              onClick={() => {
                navigate('matching/dashboard');
              }}
            >
              매칭현황
            </NavLeft>
          }
          color=""
        />
        <CardWrapper>
          <CardContainer>
            <PersonWrapper>
              <InfoWrapper>
                <NameWrapper>
                  <Name>김옥자</Name>
                  <AgeGenderWrapper>
                    <Detail>65세</Detail>
                    <Border />
                    <Detail>여</Detail>
                  </AgeGenderWrapper>
                </NameWrapper>
                <LabelWrapper>
                  <Label>
                    <LabelTitle>매칭결과</LabelTitle>
                    <LabelDetail>30건</LabelDetail>
                  </Label>
                  <LabelApply>지원자가 9명 있어요!</LabelApply>
                </LabelWrapper>
              </InfoWrapper>
              <PersonImg>
                <ElderList />
              </PersonImg>
            </PersonWrapper>
          </CardContainer>

          <CardContainer>
            <PersonWrapper>
              <InfoWrapper>
                <NameWrapper>
                  <Name>김경섭</Name>
                  <AgeGenderWrapper>
                    <Detail>72세</Detail>
                    <Border />
                    <Detail>남</Detail>
                  </AgeGenderWrapper>
                </NameWrapper>
                <LabelWrapper>
                  <Label>
                    <LabelTitle>매칭결과</LabelTitle>
                    <LabelDetail>12건</LabelDetail>
                  </Label>
                  <LabelApply>지원자가 5명 있어요!</LabelApply>
                </LabelWrapper>
              </InfoWrapper>
              <PersonImg>
                <ElderList />
              </PersonImg>
            </PersonWrapper>
          </CardContainer>

          <CardContainer>
            <PersonWrapper>
              <InfoWrapper>
                <NameWrapper>
                  <Name>박순자</Name>
                  <AgeGenderWrapper>
                    <Detail>81세</Detail>
                    <Border />
                    <Detail>여</Detail>
                  </AgeGenderWrapper>
                </NameWrapper>
                <LabelWrapper>
                  <Label>
                    <LabelTitle>매칭결과</LabelTitle>
                    <LabelDetail>8건</LabelDetail>
                  </Label>
                  <LabelApply>지원자가 2명 있어요!</LabelApply>
                </LabelWrapper>
              </InfoWrapper>
              <PersonImg>
                <ElderList />
              </PersonImg>
            </PersonWrapper>
          </CardContainer>

          <CardContainer>
            <PersonWrapper>
              <InfoWrapper>
                <NameWrapper>
                  <Name>김미정</Name>
                  <AgeGenderWrapper>
                    <Detail>68세</Detail>
                    <Border />
                    <Detail>여</Detail>
                  </AgeGenderWrapper>
                </NameWrapper>
                <LabelWrapper>
                  <Label>
                    <LabelTitle>매칭결과</LabelTitle>
                    <LabelDetail>15건</LabelDetail>
                  </Label>
                  <LabelApply>지원자가 3명 있어요!</LabelApply>
                </LabelWrapper>
              </InfoWrapper>
              <PersonImg>
                <ElderList />
              </PersonImg>
            </PersonWrapper>
          </CardContainer>
        </CardWrapper>
      </Container>
      <SocialWorkerTabBar />
    </>
  );
};

export default MatchingStatus;

const Container = styled.div`
  margin-bottom: 107px;
  margin: auto 20px;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 24px 20px;
  height: 76px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const PersonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const AgeGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Detail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LabelTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LabelDetail = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LabelApply = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const PersonImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
`;
