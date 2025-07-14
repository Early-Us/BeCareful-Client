// 영상 길이 얻는 함수
// community.ts의 postMedia api 요청에서 사용
export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata'; // 메타데이터만 로드

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src); // 임시 URL 해제
      resolve(video.duration); // 길이 (초) 반환
    };

    video.onerror = () => {
      window.URL.revokeObjectURL(video.src); // 임시 URL 해제
      reject(new Error('Failed to load video metadata.')); // 에러 발생 시 reject
    };

    const fileURL = URL.createObjectURL(file);
    video.src = fileURL;
  });
};
