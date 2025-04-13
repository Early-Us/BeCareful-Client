import PostDetail from '@/components/Community/PostDetail';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { Notice } from '@/type/Notice';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const CommunityHome = () => {
  const [noticeData, setNoticeData] = useState<Notice[]>([]);

  useEffect(() => {
    setNoticeData([]);
  }, []);

  return (
    <Container>
      <Must>
        <NoticeIcon />
        <label>필독</label>
      </Must>

      <CustomPagination>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          style={{ width: '100%', height: 'auto' }}
        >
          <SwiperSlide>
            <NoticeList>
              <PostDetail
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
            </NoticeList>
          </SwiperSlide>
          <SwiperSlide>
            <NoticeList>
              <PostDetail
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
            </NoticeList>
          </SwiperSlide>
          <SwiperSlide>
            <NoticeList>
              <PostDetail
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
            </NoticeList>
          </SwiperSlide>
        </Swiper>
      </CustomPagination>

      <CustomPagination>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
          style={{ width: '100%', height: 'auto' }}
        >
          <SwiperSlide>
            <Title>
              <NoticeIcon />
              <label>협회 공지</label>
            </Title>

            <NoticeList>
              {noticeData.map((notice) => (
                <>
                  <PostDetail
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
              <PostDetail
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
              <PostDetail
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
              <PostDetail
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
              <PostDetail
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
              <PostDetail
                key="4"
                id={4}
                profileImgUrl=""
                nickname="이름3"
                position="회장"
                isMust={true}
                isNew={false}
                isReaded={false}
                title="제목"
                date="2025-04-07"
                postImgUrl=""
              />
              <PlusButton>더보기</PlusButton>
            </NoticeList>
          </SwiperSlide>

          <SwiperSlide>
            <Title>
              <NoticeIcon />
              <label>공단 공지</label>
            </Title>

            <NoticeList>
              {noticeData.map((notice) => (
                <>
                  <PostDetail
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
              <PostDetail
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

              <PostDetail
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

              <PostDetail
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

              <PostDetail
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

              <PostDetail
                key="4"
                id={4}
                profileImgUrl=""
                nickname="이름3"
                position="회장"
                isMust={true}
                isNew={false}
                isReaded={false}
                title="제목"
                date="2025-04-07"
                postImgUrl=""
              />

              <PlusButton>더보기</PlusButton>
            </NoticeList>
          </SwiperSlide>
        </Swiper>
      </CustomPagination>
    </Container>
  );
};

export default CommunityHome;

const Container = styled.div`
  padding: 16px 20px 40px 20px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const Must = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 12px;

  path {
    fill: ${({ theme }) => theme.colors.mainBlue};
  }

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
  margin-bottom: 20px;
`;

const Border = styled.div`
  background: ${({ theme }) => theme.colors.gray50};
  height: 1px;
`;

const PlusButton = styled.button`
  margin-top: 4px;
  display: flex;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.subBlue};
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CustomPagination = styled.div`
  .swiper-pagination {
    position: relative;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
  }
`;
