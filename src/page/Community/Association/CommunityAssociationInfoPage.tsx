import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import ChairmanCard from '@/components/shared/ChairmanCard';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';

const CommunityAssociationInfoPage = () => {
  const { associationId } = useParams<{ associationId: string }>();

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
    scrollTo(0, 0);
  };

  const handleGoBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const dynamicBackgroundUrl = '';

  const isChairman = true;

  const associationInfo = [
    { title: '설립일', detail: '2000년' },
    { title: '회원수', detail: '112명' },
  ];

  return (
    <Container>
      <NavbarWrapper $backgroundImageUrl={dynamicBackgroundUrl}>
        <NavLeft onClick={handleGoBack} />
      </NavbarWrapper>

      <AssociationName>장기요양협회명</AssociationName>

      <Border />

      <SectionWrapper>
        <label className="section-title">협회 정보</label>
        <InfoWrapper>
          <InfoDisplay items={associationInfo} />
          {isChairman && (
            <Button
              variant="mainBlue"
              height="52px"
              onClick={() => handleNavigate(`/community/${associationId}/edit`)}
            >
              협회 정보 수정하기
            </Button>
          )}
        </InfoWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <label className="section-title">회장 정보</label>
        <ChairmanCard
          name="김회장"
          nickname="kimboss"
          phoneNumber="010-1234-5678"
        />
      </SectionWrapper>
    </Container>
  );
};

export default CommunityAssociationInfoPage;

const Container = styled.div`
  margin: 0px 20px;
`;

const NavbarWrapper = styled.div<{ $backgroundImageUrl: string }>`
  margin: 0px -20px;
  padding: 0px 20px;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  position: relative;

  background-image: url(${(props) => props.$backgroundImageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const NavLeft = styled(ArrowLeft)`
  position: absolute;
  top: 14px;
  left: 20px;

  cursor: pointer;

  path {
    stroke: ${({ theme }) => theme.colors.white};
  }
`;

const AssociationName = styled.div`
  padding: 24px 0px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Border = styled.div`
  margin: 0px -20px;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray100};
`;

const SectionWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 12px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  .section-title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const InfoWrapper = styled.div`
  padding: 20px 20px 24px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
