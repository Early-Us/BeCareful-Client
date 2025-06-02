import PostOverview from '@/components/Community/PostOverview';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import styled from 'styled-components';
import { CommunityDefault } from '@/data/Community';

interface CommunityDetailProps {
  boardType: string;
}

const CommnunityDetail = ({ boardType }: CommunityDetailProps) => {
  //   const formatBoardType = (key: string): string => {
  //     const mapping: Record<string, string> = {
  //       '협회 공지': 'association-notice',
  //       '공단 공지': 'service-notice',
  //       '정보 공유': 'information-sharing',
  //       '참여 신청': 'participation-application',
  //     };

  //     return mapping[key] ?? key;
  //   };

  return (
    <Container>
      <Title>
        <NoticeIcon />
        <label>{boardType}</label>
      </Title>

      <NoticeList>
        {CommunityDefault.map((notice) => (
          <>
            <PostOverview
              key={notice.postId}
              id={notice.postId}
              profileImgUrl={notice.author.institutionImageUrl.profileDefultImg}
              nickname={notice.author.authorName}
              position={notice.author.authorInstitutionRank}
              isMust={notice.isImportant}
              isNew={true}
              // isNew={new Date(notice.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)} // 7일 이내 게시물에 대해 true 설정
              isReaded={false}
              title={notice.title}
              date={notice.createdAt.substring(0, 10)}
              postImgUrl={notice.thumbnailUrl}
            />
            <Border />
          </>
        ))}
      </NoticeList>
    </Container>
  );
};

export default CommnunityDetail;

const Container = styled.div`
  padding: 16px 20px 60px 20px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 12px;

  path {
    fill: ${({ theme }) => theme.colors.gray600};
  }

  label {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 140%; /* 25.2px */
  }
`;

const NoticeList = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
`;

const Border = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  height: 1px;
`;
