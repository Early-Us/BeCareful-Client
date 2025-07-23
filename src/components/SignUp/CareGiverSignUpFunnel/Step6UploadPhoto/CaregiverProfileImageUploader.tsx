import { styled } from 'styled-components';
import { ReactComponent as ProfileImage } from '@/assets/icons/signup/PofileImage.svg';

type Props = {
  imageUrl?: string | null;
  onChange: (file: File) => void;
};

export const CaregiverProfileImageUploader = ({
  imageUrl,
  onChange,
}: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <ProfileImageWrapper>
      <ProfileImageInput
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {imageUrl ? (
        <ProfileImageDisplay src={imageUrl} alt="Profile" />
      ) : (
        <ProfileImage />
      )}
    </ProfileImageWrapper>
  );
};

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ProfileImageDisplay = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.gray300};
`;
