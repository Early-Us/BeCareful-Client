import PostOverview from '@/components/Community/PostOverview';
import { Notice } from '@/type/Notice';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CommunityAssociation = () => {
  const [noticeData, setNoticeData] = useState<Notice[]>([]);

  useEffect(() => {
    setNoticeData([]);
  }, []);

  return (
    <Container>
      <Title>
        <NoticeIcon />
        <label>협회 공지</label>
      </Title>

      <NoticeList>
        {noticeData.map((notice) => (
          <>
            <PostOverview
              key={notice.id}
              id={notice.id}
              profileImgUrl={notice.profileImgUrl}
              nickname={notice.nickname}
              position={notice.position}
              isMust={notice.isMust}
              isNew={notice.isNew}
              isReaded={notice.isReaded}
              title={notice.title}
              date={notice.date}
              postImgUrl={notice.postImgUrl}
            />
            <Border />
          </>
        ))}
        <PostOverview
          key="0"
          id={0}
          profileImgUrl=""
          nickname="이름"
          position="임원진"
          isMust={true}
          isNew={true}
          isReaded={true}
          title="제목을 엄청나게 길게 써보고 싶어서 주저리주저리 잘 먹히려나 모르겠다 에구궁제목을 엄청나게 길게 써보고 싶어서 주저리주저리 잘 먹히려나 모르겠다 에구궁"
          date="2025-04-12"
          postImgUrl=""
        />
        <Border />

        <PostOverview
          key="1"
          id={1}
          profileImgUrl=""
          nickname="이름3"
          position="회장"
          isMust={true}
          isNew={false}
          isReaded={true}
          title="제목"
          date="2025-04-09"
          postImgUrl=""
        />
        <Border />

        <PostOverview
          key="2"
          id={2}
          profileImgUrl=""
          nickname="이름2"
          position="센터장"
          isMust={false}
          isNew={true}
          isReaded={false}
          title="제목"
          date="2025-04-10"
          postImgUrl=""
        />
        <Border />

        <PostOverview
          key="3"
          id={3}
          profileImgUrl=""
          nickname="이름3"
          position="회장"
          isMust={false}
          isNew={false}
          isReaded={false}
          title="제목"
          date="2025-04-09"
          postImgUrl=""
        />
        <Border />
      </NoticeList>
    </Container>
  );
};

export default CommunityAssociation;

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
