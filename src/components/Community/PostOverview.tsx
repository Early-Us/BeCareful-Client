import { Institution_Rank_Mapping } from '@/constants/institutionRank';
import { PostListItem } from '@/types/Community/post';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// PostOverview 컴포넌트가 받을 props 타입 정의
export interface PostOverviewProps extends PostListItem {
  // isReaded: boolean;
  boardType: string;
}

const PostOverview = ({
  postId,
  title,
  isImportant,
  thumbnailUrl,
  createdAt,
  author,
  boardType,
}: PostOverviewProps) => {
  const titleFormat = (text: string) => {
    if (text.length > 33) {
      return text.slice(0, 33) + '..';
    }
    return text;
  };

  const isNew = (dateString: string) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    return createdDate >= threeDaysAgo;
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/${postId}`, {
      state: { boardType: boardType },
    }); // 클릭 시 해당 ID의 게시글 상세 페이지로 이동
    window.scrollTo(0, 0);
  };

  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <Writer>
          <img className="writer-img" src={author.institutionImageUrl} />
          <label>{author.authorName}</label>
          <label>·</label>
          <label>
            {Institution_Rank_Mapping[author.authorInstitutionRank]}
          </label>
        </Writer>
        {/* <Title isReaded={isReaded}> */}
        <Title isReaded={false}>
          <label>
            {isImportant && <IsMustTag>필독</IsMustTag>} {titleFormat(title)}
          </label>
        </Title>
        <Day>
          <label>{createdAt}</label>
          {isNew(createdAt) && <NewTag>N</NewTag>}
        </Day>
      </Wrapper>

      <img className="profile-img" src={thumbnailUrl} />
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
      isReaded ? theme.colors.gray300 : theme.colors.black};
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
