import { Notice } from '@/type/Notice';
import styled from 'styled-components';

const PostOverview = ({
  profileImgUrl,
  nickname,
  position,
  isReaded,
  isMust,
  isNew,
  title,
  date,
  postImgUrl,
}: Notice) => {
  const titleFormat = (text: string) => {
    if (text.length > 33) {
      return text.slice(0, 33) + '..';
    }
    return text;
  };

  return (
    <Container>
      <Wrapper>
        <Writer>
          <img className="writer-img" src={profileImgUrl} />
          <label>{nickname}</label>
          <label>·</label>
          <label>{position}</label>
        </Writer>
        <Title isReaded={isReaded}>
          <label>
            {isMust && <IsMustTag>필독</IsMustTag>} {titleFormat(title)}
          </label>
        </Title>
        <Day>
          <label>{date}</label>
          {isNew && <NewTag>N</NewTag>}
        </Day>
      </Wrapper>

      <img className="profile-img" src={postImgUrl} />
    </Container>
  );
};

export default PostOverview;

const Container = styled.div`
  height: 100px;
  display: flex;
  gap: 14px;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;

  .profile-img {
    min-width: 72px;
    height: 72px;
    border: 1px solid gray;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  // gap: 8px;
  justify-content: space-between;
`;

const Writer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;

  .writer-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;

    border: 1px solid gray;
  }

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }
`;

const Title = styled.div<{ isReaded: boolean }>`
  display: flex;
  gap: 5px;
  align-items: center;

  label {
    color: ${({ theme, isReaded }) =>
      isReaded ? theme.colors.black : theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: 140%;
  }
`;

const IsMustTag = styled.span`
  padding: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: 140%;
`;

const Day = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  label {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }
`;

const NewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainOrange};
  color: ${({ theme }) => theme.colors.subOrange};
  font-size: 9px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
