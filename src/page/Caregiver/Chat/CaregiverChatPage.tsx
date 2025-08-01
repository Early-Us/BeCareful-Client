import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { NavBar } from '@/components/common/NavBar/NavBar';
import ChatCard from '@/components/Chat/ChatCard';
import Modal from '@/components/common/Modal/Modal';
import ModalButtons from '@/components/common/Modal/ModalButtons';
import {
  formatDateLabel,
  formatTimeLabel,
  groupByDate,
} from '@/utils/formatTime';
import { useGetCaregiverChat, usePostCaregiverContract } from '@/api/caregiver';

const CaregiverChatPage = () => {
  const { matchingId } = useParams<{ matchingId: string }>();

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };
  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    before?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (before) {
      before(false);
    }
    setter((prev) => !prev);
  };

  // 매칭 공고 지원
  const { mutate: confirmApply } = usePostCaregiverContract();

  // 일자리 지원 최종 확정 여부
  const [finalConfirm, setFinalConfirm] = useState(false);
  // 최종 승인하기 팝업
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 최종 승인하기 팝업 - 최종 승인하기
  const handleConfirm = () => {
    confirmApply(
      data?.contractList[data?.contractList.length - 1]?.contractId ?? 0,
    );
    setFinalConfirm(true);
    handleModal(setIsCompleteModalOpen, setIsConfirmModalOpen);
  };
  // 최종 확정 팝업
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const { data } = useGetCaregiverChat(Number(matchingId));

  const groupedContracts = groupByDate(data?.contractList ?? []);
  const sortedDates = Object.keys(groupedContracts).sort((a, b) =>
    a > b ? 1 : -1,
  );

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>{data?.institutionInfo.name}</NavCenter>}
        color=""
      />

      <Elder>
        <div className="left">
          <img src={data?.elderlyInfo.elderlyProfileImageUrl} />
          <div className="name">{data?.elderlyInfo.elderlyName} 어르신</div>
        </div>
        <div className="right">정보 보기</div>
      </Elder>

      <ChatRoom>
        {sortedDates.map((date) => {
          const isLastDate = date === sortedDates[sortedDates.length - 1];
          const contracts = groupedContracts[date];

          return (
            <ChatWrapper key={date}>
              <label className="date">{formatDateLabel(date)}</label>
              {contracts.map((contract, index) => {
                const isLastItem = index === contracts.length - 1;
                return (
                  <Chat key={contract.contractId}>
                    <img
                      src={data?.elderlyInfo.elderlyProfileImageUrl}
                      alt="프로필"
                    />
                    <div className="right">
                      <div className="chat">
                        <label className="institution">
                          {data?.institutionInfo.name}
                        </label>
                        <ChatCard
                          border="left"
                          title="합격을 축하드립니다!"
                          name={data?.elderlyInfo.elderlyName ?? ''}
                          items={contract}
                          hasButton={isLastDate && isLastItem}
                          buttonContent="최종 승인하기"
                          buttonClick={() => handleModal(setIsConfirmModalOpen)}
                        />
                      </div>
                      <label className="time">
                        {formatTimeLabel(contract.createdDate)}
                      </label>
                    </div>
                  </Chat>
                );
              })}
            </ChatWrapper>
          );
        })}
        {finalConfirm && (
          <>
            <ApproveWrapper>
              <label className="title">최종 승인이 확정되었습니다!</label>
              <label className="detail">
                {data?.elderlyInfo.elderlyName} 어르신을 위한 돌봄 일정이
                추가되었습니다.
              </label>
            </ApproveWrapper>
            <Buttons>
              <Button
                height="52px"
                variant="mainBlue"
                onClick={() => handleNavigate('/caregiver/work')}
              >
                추가된 일정 확인하기
              </Button>
              <Button
                height="52px"
                variant="mainBlue"
                onClick={() =>
                  handleNavigate(`/caregiver/apply/${data?.recruitmentId}`)
                }
              >
                내 일자리 확인하기
              </Button>
            </Buttons>
          </>
        )}
      </ChatRoom>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => handleModal(setIsConfirmModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsConfirmModalOpen)}
          title={'일자리 지원을\n최종 확정하시겠습니까?'}
          detail={
            '최종 승인시 조율 요청이 불가능하며,\n기관 담당자에게 근무 확정 알림이 가요.'
          }
          left="취소"
          right="최종 승인하기"
          handleLeftBtnClick={() => handleModal(setIsConfirmModalOpen)}
          handleRightBtnClick={handleConfirm}
        />
      </Modal>

      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => handleModal(setIsCompleteModalOpen)}
      >
        <ModalButtons
          onClose={() => handleModal(setIsCompleteModalOpen)}
          title={'일자리 지원이\n최종 확정되었습니다!'}
          detail={'지원 보상 포인트 1,000P가 지급되었습니다.'}
          left="일정 보러가기"
          right="채팅 보기"
          handleLeftBtnClick={() =>
            handleNavigate(`caregiver/apply/${data?.recruitmentId}`)
          }
          handleRightBtnClick={() => handleModal(setIsCompleteModalOpen)}
        />
      </Modal>
    </Container>
  );
};

export default CaregiverChatPage;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.subBlue};
  min-height: 100vh;
`;

const NavLeft = styled(ArrowLeft)`
  margin-left: 20px;
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Elder = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};

  .left {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .right {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    cursor: pointer;
  }
`;

const ChatRoom = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .date {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Chat = styled.div`
  display: flex;
  gap: 8px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    object-fit: cover;
  }

  .right {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  .chat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .institution {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .time {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const ApproveWrapper = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;

  .title {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-align: center;
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    text-align: center;
  }
`;

const Buttons = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
