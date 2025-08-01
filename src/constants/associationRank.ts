import { AssociationRank } from '@/types/Community/common';

export const Association_Rank_Mapping: { [key: string]: string } = {
  CHAIRMAN: '회장',
  EXECUTIVE: '임원진',
  MEMBER: '회원',
  none: '회원',
};

export const API_Association_Rank_Mapping: {
  [key: string]: AssociationRank;
} = {
  회장: 'CHAIRMAN',
  임원진: 'EXECUTIVE',
  회원: 'MEMBER',
};

export const ASSOCIATION_RANKS = [
  { value: 'CHAIRMAN', label: '회장' },
  { value: 'EXECUTIVE', label: '임원' },
  { value: 'MEMBER', label: '일반 회원' },
  { value: 'NONE', label: '협회 비회원' },
] as const;

export const ASSOCIATION_JOIN_RANKS_LABELS = {
  EXECUTIVE: '임원진 입니다.',
  MEMBER: '회원 입니다.',
} as Partial<Record<AssociationRank, string>>;
