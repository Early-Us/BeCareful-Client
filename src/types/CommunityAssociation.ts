import { ASSOCIATION_RANKS } from '@/constants/associationRank';

export interface AssociationWholeList {
  associationId: number;
  associationName: string;
  associationEstablishedYear: number | null;
  associationProfileImageUrl?: string;
  associationMemberCount: number;
}

export interface GetAssociationListResponse {
  count: number;
  associationSimpleDtoList: AssociationWholeList[];
}

export interface JoinAssociationRequest {
  associationId: number;
  associationRank: AssociationRank;
}

export type AssociationRank = (typeof ASSOCIATION_RANKS)[number]['value'];
