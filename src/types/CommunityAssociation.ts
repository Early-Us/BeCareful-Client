export interface AssociationWholeList {
  associationId: number;
  associationName: string;
  associationEstablishedYear: number;
  associationProfileImageUrl: string;
  associationMemberCount: number;
}

export interface GetAssociationListResponse {
  count: number;
  associationWholeList: AssociationWholeList[];
}
