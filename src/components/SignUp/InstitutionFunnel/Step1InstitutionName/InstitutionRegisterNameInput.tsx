import { useState } from 'react';
import { ReactComponent as SearchIcon } from '@/assets/icons/signup/SearchIcon.svg';
import { styled } from 'styled-components';
import { useSearchInstitution } from '@/api/signupFunnel';
import { Institution } from '@/types/SocialSignUp';

export const InstitutionRegisterNameInput = ({
  onInstitutionSelect,
  onChangeText,
}: {
  onInstitutionSelect: (name: string, id?: number) => void;
  onChangeText?: (text: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: institutions = [] } = useSearchInstitution(searchTerm.trim(), {
    enabled: searchTerm.trim().length > 0,
  });

  const handleSelect = (inst: Institution) => {
    setSearchTerm(inst.institutionName);
    setShowDropdown(false);
    onInstitutionSelect(inst.institutionName, inst.institutionId);
  };

  return (
    <Wrapper>
      <SearchContainer>
        <StyledInput
          placeholder="기관명 검색"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
            onChangeText?.(e.target.value);
          }}
        />
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
      </SearchContainer>

      {showDropdown && institutions.length > 0 && (
        <Dropdown>
          {institutions.map((inst: Institution) => (
            <DropdownItem
              key={inst.institutionId}
              onClick={() => handleSelect(inst)}
            >
              {inst.institutionName}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 16px;
  width: 100%;
  height: 52px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;

  &:hover,
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  margin-top: 4px;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray900};

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
  }
`;
