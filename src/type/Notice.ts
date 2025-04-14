// todo: api 변수와 동일하게 수정
export interface Notice {
  id: number;
  profileImgUrl: string;
  nickname: string;
  position: string;
  isMust: boolean;
  isNew: boolean;
  isReaded: boolean;
  title: string;
  date: string;
  postImgUrl: string;
}
