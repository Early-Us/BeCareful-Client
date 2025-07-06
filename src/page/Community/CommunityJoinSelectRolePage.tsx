import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CommunityJoinSelectRole } from '@/components/Community/JoinCommunity/CommunityJoinSelectRole';
import { AssociationRank } from '@/types/CommunityAssociation';
import { useJoinAssociation } from '@/api/communityAssociation';

const CommunityJoinSelectRolePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { associationName } = location.state || {};

  const [selectedRank, setSelectedRank] = useState<AssociationRank | null>(
    null,
  );

  const { mutate: joinAssociation } = useJoinAssociation();

  const handleSubmit = () => {
    if (!id || !selectedRank) return;

    joinAssociation(
      {
        associationId: Number(id),
        associationRank: selectedRank,
      },
      {
        onSuccess: () => navigate('/community'),
        onError: (err) => console.error('가입 실패', err),
      },
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <CommunityJoinSelectRole
      selectedRank={selectedRank}
      setSelectedRank={setSelectedRank}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      associationName={associationName ?? ''}
    />
  );
};

export default CommunityJoinSelectRolePage;
