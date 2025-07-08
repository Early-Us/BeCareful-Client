import PostOverview from '@/components/Community/PostOverview';
import { ReactComponent as NoticeIcon } from '@/assets/icons/community/Notice.svg';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getImportantPosting, getPostingList } from '@/api/community';
import { useQueries, useQuery } from '@tanstack/react-query';
import React from 'react';
import { PageableRequest } from '@/types/Community/common';
import {
  BoardPostListResponse,
  ImportantPostListResponse,
  PostListItem,
} from '@/types/Community/post';
import { BoardList } from '@/types/Community/community';

interface CommunityHomeProps {
  onTabChange: (tabName: string) => void;
}

const CommunityHome = ({ onTabChange }: CommunityHomeProps) => {
  const importantPageable: PageableRequest = {
    page: 0,
    size: 1,
    sort: [],
  };
  const { data: importantPostings, error: importantError } = useQuery<
    ImportantPostListResponse,
    Error
  >({
    queryKey: ['importantPostingList', importantPageable],
    queryFn: () => getImportantPosting(importantPageable),
  });
  if (importantError) {
    console.log('getImportantPosting 에러: ', importantError);
  }

  const boardPageable: PageableRequest = { page: 1, size: 5, sort: [] };
  const boardPostings = useQueries({
    queries: BoardList.map((board) => ({
      queryKey: ['boardPostingList', board.api, boardPageable],
      queryFn: () => getPostingList(boardPageable, board.api),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    })),
  });

  const getContent = (
    data: BoardPostListResponse | undefined,
    isError: boolean,
    error: Error | null,
    board: string,
  ) => {
    if (isError) {
      console.log('getContent 오류 발생: ', error);
      return null;
    }
    if (!data || data.length === 0) {
      console.log('getContent 데이터 없음');
      return <div>{board} 게시판의 게시글이 없습니다.</div>;
    }

    return (
      <>
        {data?.map((post: PostListItem) => (
          <React.Fragment key={post.postId}>
            <PostOverview
              postId={post.postId}
              title={post.title}
              isImportant={post.isImportant}
              thumbnailUrl={post.thumbnailUrl}
              createdAt={post.createdAt}
              author={post.author}
              boardType={board}
            />
            <Border />
          </React.Fragment>
        ))}
      </>
    );
  };

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
          {importantPostings?.map((post: PostListItem) => (
            <SwiperSlide key={post.postId}>
              <NoticeList>
                <PostOverview
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  isImportant={post.isImportant}
                  thumbnailUrl={post.thumbnailUrl}
                  createdAt={post.createdAt}
                  author={post.author}
                  // isReaded={false}
                  boardType="필독"
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
          {BoardList.map((board, index) => {
            const { data, isError, error } = boardPostings[index];
            const Icon = board.icon;

            return (
              <SwiperSlide key={board.label}>
                <Title>
                  <Icon />
                  <label>{board.label}</label>
                </Title>
                <NoticeList>
                  {getContent(
                    data as BoardPostListResponse,
                    isError,
                    error,
                    board.label,
                  )}
                </NoticeList>
                <PlusButton onClick={() => onTabChange(board.label)}>
                  더보기
                </PlusButton>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CustomPagination>
    </Container>
  );
};

export default CommunityHome;

const Container = styled.div`
  padding: 16px 20px 40px 20px;
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
  margin-bottom: 15px;
  display: flex;
  width: 100%;
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
