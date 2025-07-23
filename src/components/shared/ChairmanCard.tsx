import styled from 'styled-components';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';

interface ChairmanCardProps {
  name: string;
  nickname: string;
  phoneNumber: string;
}

const ChairmanCard = ({ name, nickname, phoneNumber }: ChairmanCardProps) => {
  const chairmanInfo = [
    { title: '성함', detail: name },
    { title: '닉네임', detail: nickname },
    { title: '연락처', detail: phoneNumber },
  ];

  return (
    <CardContainer>
      <InfoDisplay items={chairmanInfo} />
    </CardContainer>
  );
};

export default ChairmanCard;

const CardContainer = styled.div`
  padding: 20px 20px 24px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;
