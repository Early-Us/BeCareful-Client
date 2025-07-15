import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as ExpelIcon } from '@/assets/icons/caregiver/my/Logout.svg';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import AssociationCard from '@/components/shared/AssociationCard';
import InstitutionCard from '@/components/shared/InstitutionCard';
import { CareTypeFormat, GenderMapping } from '@/constants/caregiver';
import { Association_Rank_Mapping } from '@/constants/associationRank';
import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import { useMemberExpel, useMembersDetail } from '@/api/communityAssociation';
import Modal from '@/components/common/Modal/Modal';
import ProfileCard from '@/components/shared/ProfileCard';

const CommunityMemberDetailPage = () => {
  const { memberId } = useParams<{ memberId: string }>();

  const { data } = useMembersDetail(Number(memberId));

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const memberTypes = ['회장', '임원진', '회원'];
  const [memberType, setMemberType] = useState('');

  useEffect(() => {
    if (data) {
      setMemberType(Association_Rank_Mapping[data.associationRank]);
    }
  }, [data]);

  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  const handleMemberTypeChange = () => {
    console.log(memberType);
    handleModal(setIsTypeModalOpen);
  };

  const { mutate: handleExpel } = useMemberExpel(Number(memberId));

  if (!data) {
    return <div>해당 회원의 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회원 정보</NavCenter>}
        color="white"
      />

      <ProfileCard
        profileImgURL={data.institutionImageUrl}
        name={data.name}
        nickname={data.nickName}
        phoneNumber={data.phoneNumber}
        age={data.age}
        gender={GenderMapping[data.gender]}
      />

      <SectionWrapper>
        <label className="title">기관 정보</label>
        <InstitutionCard
          date={data?.institutionLastUpdate}
          institution={data?.institutionName}
          year={2001}
          types={CareTypeFormat(data?.facilityTypes, 2)}
          phoneNumber={data?.institutionPhoneNumber}
        />
      </SectionWrapper>

      <Border />

      <SectionWrapper>
        <label className="title">협회 정보</label>
        <AssociationCard
          association={data?.associationName}
          type={Association_Rank_Mapping[data?.associationRank]}
          rank={Institution_Rank_Mapping[data?.institutionRank]}
        />
        <Button
          height="52px"
          variant="mainBlue"
          onClick={() => handleModal(setIsTypeModalOpen)}
        >
          회원 유형 변경하기
        </Button>
      </SectionWrapper>

      <Border style={{ height: '5px' }} />

      <SectionWrapper>
        <label className="title">계정</label>
        <Expel onClick={() => handleExpel()}>
          <ExpelIcon />
          내보내기
        </Expel>
      </SectionWrapper>

      <Modal
        isOpen={isTypeModalOpen}
        onClose={() => handleModal(setIsTypeModalOpen)}
      >
        <ModalWrapper>
          <ModalXImg onClick={() => handleModal(setIsTypeModalOpen)} />
          <ModalTitle>협회 회원 유형 변경</ModalTitle>
          <CheckWrapper>
            {memberTypes.map((type) => (
              <CheckButton
                key={type}
                active={memberType === type}
                onClick={() => setMemberType(type)}
              >
                <Check />
                {type}
              </CheckButton>
            ))}
          </CheckWrapper>
          <ModalButtonWrapper>
            <Button
              height="52px"
              variant="subBlue"
              onClick={() => handleModal(setIsTypeModalOpen)}
            >
              취소
            </Button>
            <Button
              height="52px"
              variant="mainBlue"
              onClick={handleMemberTypeChange}
            >
              변경하기
            </Button>
          </ModalButtonWrapper>
        </ModalWrapper>
      </Modal>
    </Container>
  );
};

export default CommunityMemberDetailPage;

const Container = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Expel = styled.div`
  height: 18px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  color: ${({ theme }) => theme.colors.mainOrange};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  margin: 0 -20px;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors.white};
  width: 300px;
  border-radius: 12px;
  padding: 56px 20px 20px 20px;
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.mainBlue : '')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};

    path {
      fill: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
