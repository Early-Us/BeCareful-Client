import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as WithdrawIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import AgreeSection from '@/components/SocialWorker/MyPage/AgreeSection';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import { CheckCard } from '@/components/SignUp/SignUpFunnel/common/CheckCard';
import { AgreementValues } from '@/types/Socialworker/common';

interface SocialworkerEditAssociationPageProps {
  association: string;
  rank: string;
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

const SocialworkerEditAssociationPage = ({
  association: initialAssociation,
  rank: initialRank,
  isAgreedToTerms: initialIsAgreedToTerms,
  isAgreedToCollectPersonalInfo: initialIsAgreedToCollectPersonalInfo,
  isAgreedToReceiveMarketingInfo: initialIsAgreedToReceiveMarketingInfo,
}: SocialworkerEditAssociationPageProps) => {
  const navigate = useNavigate();

  const [association, setAssociation] = useState(initialAssociation);
  const [rank, setRank] = useState(initialRank);

  const handleAssociationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssociation(e.target.value);
  };
  const handleRankChange = (rank: string) => {
    setRank(rank);
  };

  const [agreementStates, setAgreementStates] = useState({
    isAgreedToTerms: initialIsAgreedToTerms,
    isAgreedToCollectPersonalInfo: initialIsAgreedToCollectPersonalInfo,
    isAgreedToReceiveMarketingInfo: initialIsAgreedToReceiveMarketingInfo,
  });

  const handleAgreementChange = useCallback(
    (updatedAgreements: AgreementValues) => {
      setAgreementStates(updatedAgreements);
    },
    [],
  );

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };
  const handleWithdraw = () => {
    console.log('회원탈퇴');

    // 회원탈퇴 api

    handleModal(setIsWithdrawModalOpen);
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        }
        center={<NavCenter>협회 정보 수정</NavCenter>}
        color="white"
      />

      <CardContainer style={{ marginTop: '-16px' }}>
        <label className="title">
          소속된 협회명 <span className="star">*</span>
        </label>
        <label className="detail">
          소속된 협회의 정확한 명칭을 검색해 주세요.
        </label>
        <Input
          placeholder="소속된 협회명"
          value={association}
          onChange={handleAssociationChange}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">
          직급 <span className="star">*</span>
        </label>
        <CheckCard
          pressed={rank === 'CENTER_DIRECTOR'}
          text="센터장 입니다."
          onClick={() => handleRankChange('CENTER_DIRECTOR')}
        />
        <CheckCard
          pressed={rank === 'REPRESENTATIVE'}
          text="대표 입니다."
          onClick={() => handleRankChange('REPRESENTATIVE')}
        />
        <CheckCard
          pressed={rank === 'SOCIAL_WORKER'}
          text="사회복지사 입니다."
          onClick={() => handleRankChange('SOCIAL_WORKER')}
        />
      </CardContainer>

      <AgreeSection
        initialIsAgreedToTerms={agreementStates.isAgreedToTerms}
        initialIsAgreedToCollectPersonalInfo={
          agreementStates.isAgreedToCollectPersonalInfo
        }
        initialIsAgreedToReceiveMarketingInfo={
          agreementStates.isAgreedToReceiveMarketingInfo
        }
        onAgreementChange={handleAgreementChange}
      />

      <Border />

      <WithdrawWrapper>
        <label className="title">탈퇴하기</label>
        <Withdraw onClick={() => handleModal(setIsWithdrawModalOpen)}>
          <WithdrawIcon />
          탈퇴하기
        </Withdraw>
      </WithdrawWrapper>

      <Bottom>
        <Button>협회 정보 수정하기</Button>
      </Bottom>

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => handleModal(setIsWithdrawModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsWithdrawModalOpen)}
          title="정말 탈퇴 하시겠습니까?"
          detail={'돌봄다리 통합 서비스에서 탈퇴됩니다.\n계속하시겠습니까?'}
          left="취소"
          right="탈퇴하기"
          handleLeftBtnClick={() => handleModal(setIsWithdrawModalOpen)}
          handleRightBtnClick={handleWithdraw}
        />
      </Modal>
    </Container>
  );
};

export default SocialworkerEditAssociationPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .star {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Input = styled.input`
  //   width: 100%;
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

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const WithdrawWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Withdraw = styled.div`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
