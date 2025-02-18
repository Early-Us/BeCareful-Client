import React, { useState } from 'react';
import { styled } from 'styled-components';

interface FilterProps {
  children: React.ReactNode;
  selected?: boolean;
}

export const WorkMainFilterTag = ({ children, selected }: FilterProps) => {
  const [isSelected, setIsSelected] = useState(selected || false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <MainContainer>
      <FilterContainer isSelected={isSelected} onClick={handleClick}>
        {children}
      </FilterContainer>
    </MainContainer>
  );
};

const FilterContainer = styled.div<{ isSelected: boolean }>`
  display: inline-flex;
  height: 36px;
  padding: 8px 12px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.mainBlue : theme.colors.gray100};

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.mainBlue : theme.colors.gray900};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.subBlue : theme.colors.white};
  white-space: nowrap;
`;

const MainContainer = styled.div`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;
