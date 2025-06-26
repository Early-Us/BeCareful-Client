import { axiosInstance } from './axiosInstance';
import {
  CaregiverCompletedMatchingResponse,
  CaregiverHomeResponse,
  MemoEditRequest,
} from '@/types/Caregiver/home';
import {
  CareerRequest,
  CareerResponse,
  CaregiverMyResponse,
} from '@/types/Caregiver/mypage';

/* 홈화면 */
// 요양보호사 홈 화면 구성 데이터 조회
export const getCaregiverHomeInfo =
  async (): Promise<CaregiverHomeResponse> => {
    const response = await axiosInstance.get('/caregiver/home');
    return response.data;
  };

/* 나의 일자리 */
// 확정된 일자리의 리스트 반환 - 나의 일자리
export const getMyWorkList =
  async (): Promise<CaregiverCompletedMatchingResponse> => {
    const response = await axiosInstance.get(
      '/caregiver/my/completed-matching-list',
    );
    return response.data;
  };

// 나의 일자리 화면에서 메모 수정
export const putMemo = async (
  completedMatchingId: number,
  memo: MemoEditRequest,
) => {
  const response = await axiosInstance.put(
    `/caregiver/my/complete-matching-list/${completedMatchingId}`,
    memo,
  );
  return response;
};

/* 마이페이지 */
// 요양보호사 마이페이지 홈 화면 데이터 조회
export const getCaregiverMyPageInfo =
  async (): Promise<CaregiverMyResponse> => {
    const response = await axiosInstance.get('/caregiver/my');
    return response.data;
  };

// 경력서 조회
export const getCareer = async (): Promise<CareerResponse> => {
  const response = await axiosInstance.get('/caregiver/career');
  return response.data;
};

// 경력서 등록/수정
export const putCareer = async (career: CareerRequest) => {
  const response = await axiosInstance.put('/caregiver/career', career);
  return response;
};
