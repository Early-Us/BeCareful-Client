export const mockCommunityJoinStatus = async (): Promise<
  'REJECTED' | 'PENDING' | 'ACCEPTED' | null
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('REJECTED');
    }, 1000);
  });
};
