import { useEffect, useState } from 'react';
import styled, { css, RuleSet } from 'styled-components';
import BackgroundIcon from '@/assets/icons/landing/Background.svg';
import { ReactComponent as AssoLogo } from '@/assets/icons/landing/AssociationLogo.svg';
import { ReactComponent as AssoLogoBlack } from '@/assets/icons/landing/AssociationLogoBlack.svg';
import { ReactComponent as AssoLogoM } from '@/assets/icons/landing/AssociationLogoM.svg';
import { ReactComponent as AssoLogoMBlack } from '@/assets/icons/landing/AssociationLogoMBlack.svg';
import { ReactComponent as Logo } from '@/assets/icons/landing/Logo.svg';
import { ReactComponent as LogoBlack } from '@/assets/icons/landing/LogoBlack.svg';
import { ReactComponent as Symbol } from '@/assets/icons/landing/Symbol.svg';
import First from '@/assets/icons/landing/First.svg';
import Second from '@/assets/icons/landing/Second.svg';
import Third from '@/assets/icons/landing/Third.svg';
import { useNavigate } from 'react-router-dom';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

const LandingPage = () => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      {isMobile ? (
        <Header isScrolled={isScrolled}>
          {isScrolled ? <AssoLogoMBlack /> : <AssoLogoM />}
        </Header>
      ) : (
        <Header isScrolled={isScrolled}>
          <NavLeft>
            <label>협회 소개</label>
            <label>주요 활동</label>
            <label>가입 문의</label>
          </NavLeft>
          <NavCenter>{isScrolled ? <AssoLogoBlack /> : <AssoLogo />}</NavCenter>
          <NavRight onClick={() => navigate('/splash/community')}>
            {isScrolled ? <LogoBlack /> : <Logo />} 커뮤니티 바로가기
          </NavRight>
        </Header>
      )}

      <Background src={BackgroundIcon} />

      <Main>
        <div className="labels">
          <label className="title">
            함께 성장하는 요양 기관
            <br />
            네트워크
          </label>

          <label className="detail">전주완주 장기요양 기관 협회</label>
          <label className="eng">JEONJU WANJU SENIOR LONGTERMCARE</label>
        </div>

        <div className="buttons">
          <button
            className="community"
            onClick={() => navigate('/splash/community')}
          >
            커뮤니티 바로가기
          </button>
          <button className="asso">협회 소개 보기</button>
        </div>
      </Main>

      <Association>
        <div className="title-wrapper">
          <label className="title">협회 소개</label>
          <label className="detail">
            {isMobile ? (
              <>
                우리 협회는 전북 지역 최대 규모의 장기요양기관 협회로,
                <br />
                센터 간의 소통과 협력을 통해
                <br />
                장기요양서비스의 질 향상에 기여하고 있습니다.
              </>
            ) : (
              <>
                우리 협회는 전북 지역 최대 규모의 장기요양기관 협회로,
                <br />
                센터 간의 소통과 협력을 통해 장기요양서비스의 질 향상에 기여하고
                있습니다.
              </>
            )}
          </label>
        </div>

        {!isMobile && (
          <Good>
            <div className="good">
              <img src={First} className="good" />
              <label className="good-label">전문성 강화</label>
            </div>
            <div className="good">
              <img src={Second} className="good" />
              <label className="good-label">회원기관 상호 협력</label>
            </div>
            <div className="good">
              <img src={Third} className="good" />
              <label className="good-label">지역사회 복지 증진</label>
            </div>
          </Good>
        )}

        <div className="imgs">
          <img className="img" />
          <img className="img" />
        </div>
      </Association>

      {isMobile ? (
        <CommunityGuideMobileWrapper>
          <label className="title">커뮤니티 안내</label>
          <CommunityGuideMobile>
            <label className="community">
              센터장님을 위한
              <br />
              <span>전용 커뮤니티</span>가<br />
              운영 중입니다.
            </label>
            <label className="for">
              전북 내 장기요양기관 센터장 누구나 참여 가능하며,
              <br />
              다양한 교육과 교류가 이루어집니다.
            </label>
            <button onClick={() => navigate('/splash/community')}>
              커뮤니티 참여하기
            </button>
            <Symbol onClick={() => navigate('/splash/community')} />
          </CommunityGuideMobile>
        </CommunityGuideMobileWrapper>
      ) : (
        <CommunityGuideWrapper>
          <CommunityGuide>
            <label className="title">커뮤니티 안내</label>
            <label className="community">
              센터장님을 위한
              <br />
              <span>전용 커뮤니티</span>가 운영 중입니다.
            </label>
            <label className="for">
              전북 내 장기요양기관 센터장 누구나 참여 가능하며,
              <br />
              다양한 교육과 교류가 이루어집니다.
            </label>
            <button onClick={() => navigate('/splash/community')}>
              커뮤니티 참여하기
            </button>
          </CommunityGuide>
          <Symbol />
        </CommunityGuideWrapper>
      )}
    </Container>
  );
};

export default LandingPage;

const mobile = (styles: RuleSet<object>) => css`
  @media (max-width: 768px) {
    ${styles}/* RuleSet 타입을 여기에 삽입합니다. */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const Header = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48px 156px;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  transition: background-color 0.5s ease;

  ${(props) =>
    props.isScrolled &&
    css`
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.black};
    `}

  ${mobile(css`
    font-size: 14px;
    padding: 12px;
    color: blue;
  `)}
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const NavCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const Background = styled.img`
  max-width: 100%;
  height: 754px;
  object-fit: cover;
`;

const Main = styled.div`
  position: absolute;
  top: 184px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 80px;

  ${mobile(css`
    gap: 64px;
  `)}

  .labels {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 32px;
  }

  .title {
    color: ${({ theme }) => theme.colors.white};
    font-size: 60px;
    font-weight: 800;

    ${mobile(css`
      font-size: 35px;
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    `)}
  }

  .detail {
    color: ${({ theme }) => theme.colors.white};
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    ${mobile(css`
      font-size: 20px;
    `)}
  }

  .eng {
    color: ${({ theme }) => theme.colors.white};
    font-size: 19px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-top: -32px;

    ${mobile(css`
      font-size: 14px;
    `)}
  }

  .buttons {
    display: flex;
    gap: 16px;
    align-items: center;

    ${mobile(css`
      gap: 8px;
    `)}
  }

  button {
    display: flex;
    width: 187px;
    height: 52px;
    padding: 17px 16px;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 12px;
    font-size: 20px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    ${mobile(css`
      display: flex;
      width: 156px;
      height: 52px;
      padding: 17px 16px;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    `)}
  }

  .community {
    background: ${({ theme }) => theme.colors.mainBlue};
    color: ${({ theme }) => theme.colors.white};
  }

  .asso {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Association = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 200px;
  margin-top: 100px;

  ${mobile(css`
    margin-bottom: 100px;
  `)}

  .title-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;

    ${mobile(css`
      gap: 30px;
    `)}
  }

  .title {
    font-size: 40px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

    ${mobile(css`
      font-size: 20px;
    `)}
  }

  .detail {
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

    ${mobile(css`
      font-size: 16px;
    `)}
  }

  .imgs {
    display: flex;
    align-items: center;
    gap: 40px;

    ${mobile(css`
      flex-direction: column;
      gap: 20px;
    `)}
  }

  .img {
    width: 610px;
    height: 340px;

    background: ${({ theme }) => theme.colors.gray50};

    ${mobile(css`
      width: 320px;
      height: 240px;
    `)}
  }
`;

const Good = styled.div`
  display: flex;
  justify-content: space-between;

  .good {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.black};
    font-size: 20px;
    font-weight: 700;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

const CommunityGuideWrapper = styled.div`
  width: 1040px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 160px;
  margin-top: 100px;

  .title {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: 40px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CommunityGuide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;

  .community {
    color: ${({ theme }) => theme.colors.gary800};
    font-size: 50px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    font-weight: 800;
  }

  .for {
    color: ${({ theme }) => theme.colors.gary800};
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  button {
    display: flex;
    width: 279px;
    // height: 62px;
    padding: 17px 16px;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    background: ${({ theme }) => theme.colors.mainBlue};

    color: ${({ theme }) => theme.colors.white};
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CommunityGuideMobileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-bottom: 80px;
  margin-top: 60px;

  .title {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CommunityGuideMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;

  .community {
    color: ${({ theme }) => theme.colors.gary800};
    font-size: 30px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    font-weight: 800;
  }

  .for {
    color: ${({ theme }) => theme.colors.gary800};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  button {
    display: flex;
    width: 156px;
    padding: 17px 16px;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    background: ${({ theme }) => theme.colors.mainBlue};

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
