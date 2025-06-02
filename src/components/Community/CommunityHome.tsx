import PostOverview from '@/components/Community/PostOverview';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import { ReactComponent as Information } from '@/assets/icons/community/Information.svg';
import { ReactComponent as Participation } from '@/assets/icons/community/Participation.svg';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CommunityImportant, CommunityNotice } from '@/data/Community';

interface CommunityHomeProps {
  onTabChange: (tabName: string) => void;
}

const CommunityHome = ({ onTabChange }: CommunityHomeProps) => {
  /*
  const apiBaseURL = import.meta.env.VITE_APP_API_URL;
  const getImportantPostInfo = async () => {
    try {
      const response = await axios.get(
        `${apiBaseURL}/community/post/important`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setNoticeData([]);
    } catch (e) {
      console.log('사회복지사 채팅방 리스트 get 에러: ', e);
    }
  };

  const getPostInfo = async () => {
    try {
      const response = await axios.get(
        `${apiBaseURL}/community/post/important`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setChatList(response.data.chatroomInfoList);
    } catch (e) {
      console.log('사회복지사 채팅방 리스트 get 에러: ', e);
    }
  };
  */

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
          {CommunityImportant.map((notice) => (
            <SwiperSlide key={notice.postId}>
              <NoticeList>
                <PostOverview
                  key={notice.postId}
                  id={notice.postId}
                  profileImgUrl={
                    notice.author.institutionImageUrl.profileDefultImg
                  }
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
              </NoticeList>
            </SwiperSlide>
          ))}
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
              {CommunityNotice.map((notice) => (
                <>
                  <PostOverview
                    key={notice.postId}
                    id={notice.postId}
                    profileImgUrl={
                      notice.author.institutionImageUrl.profileDefultImg
                    }
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
              <PlusButton onClick={() => onTabChange('협회 공지')}>
                더보기
              </PlusButton>
            </NoticeList>
          </SwiperSlide>

          <SwiperSlide>
            <Title>
              <NoticeIcon />
              <label>공단 공지</label>
            </Title>
            <NoticeList>
              {CommunityNotice.map((notice) => (
                <>
                  <PostOverview
                    key={notice.postId}
                    id={notice.postId}
                    profileImgUrl={
                      notice.author.institutionImageUrl.profileDefultImg
                    }
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
              <PlusButton onClick={() => onTabChange('공단 공지')}>
                더보기
              </PlusButton>
            </NoticeList>
          </SwiperSlide>

          <SwiperSlide>
            <Title>
              <Information />
              <label>정보 공유</label>
            </Title>
            <NoticeList>
              {CommunityNotice.map((notice) => (
                <>
                  <PostOverview
                    key={notice.postId}
                    id={notice.postId}
                    profileImgUrl={
                      notice.author.institutionImageUrl.profileDefultImg
                    }
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
              <PlusButton onClick={() => onTabChange('정보 공유')}>
                더보기
              </PlusButton>
            </NoticeList>
          </SwiperSlide>

          <SwiperSlide>
            <Title>
              <Participation />
              <label>참여 신청</label>
            </Title>
            <NoticeList>
              {CommunityNotice.map((notice) => (
                <>
                  <PostOverview
                    key={notice.postId}
                    id={notice.postId}
                    profileImgUrl={
                      notice.author.institutionImageUrl.profileDefultImg
                    }
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
              <PlusButton onClick={() => onTabChange('참여 신청')}>
                더보기
              </PlusButton>
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
