import styled from 'styled-components';
import { ReactComponent as IconAlarm } from '@/assets/icons/IconAlarm.svg';
import { Tab } from '@/components/common/Tab/Tab';

import { Button } from '@/components/common/Button/Button';
import { InputBox } from '@/components/common/InputBox/InputBox';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { useState } from 'react';
import { SmallDropdown } from '@/components/common/Dropdown/SmallDropdown';
import { MiddleDropdown } from '@/components/common/Dropdown/MiddleDropdown';
import { NursingQualificationCard } from '@/components/common/QualificationCard/NursingQualificationCard';
import { Toggle } from '@/components/common/Toggle/Toggle';
import { ApplyChip } from '@/components/common/ApplyCard/ApplyChip';
import { ApplyTag } from '@/components/common/ApplyCard/ApplyTag';
import { ApplyCard } from '@/components/common/ApplyCard/ApplyCard';

export const TestPage = () => {
  const tabData = [
    { name: '요양보호사', content: <Tab1Content /> },
    { name: '사회복지사', content: <Tab2Content /> },
  ];
  const [selectedDropContents, setSelectedDropContents] = useState<string[]>(
    [],
  );
  const dropContents = ['요양', '보호', '사회', '복지'];
  const [smallContents, setSmallContents] = useState<string[]>([]);
  const smallDropContents = ['1급', '2급'];
  const [middleContents, setMiddleContents] = useState<string[]>([]);
  const middleDropContents = ['시급', '일급', '월급', '연봉'];
  const [certificateData, setCertificateData] = useState({
    type: '간호지원사',
    level: '1급',
    number: '',
  });

  const [isToggleChecked, setIsToggleChecked] = useState(true);
  const handleToggleChange = () => {
    setIsToggleChecked((prevChecked) => !prevChecked);
  };

  const handleCertificateChange = (updatedData: typeof certificateData) => {
    setCertificateData(updatedData);
  };
  return (
    <div>
      <h1>Test Page</h1>
      <ApplyChip state={'pass'} />
      <ApplyTag label="인기공고" />
      <ApplyTag label="시급 TOP" />
      <ApplyCard
        centerName="행복사랑요양센터"
        description="방문요양/1일 9시간씩 주6일 모집"
        tags={['인기공고', '시급 TOP']}
        careItems={['식사보조', '이동보조']}
        workingDays={['목', '일']}
        workingHours="15:00~19:00"
        hourlyRate="12,000원"
      />

      <IconWrapper>
        <IconAlarm />
      </IconWrapper>
      <Title>Test Title</Title>
      <Tab tabs={tabData} />
      <Button variant="blue" width="320px" height="52px">
        다음 단계로 이동
      </Button>
      <Button variant="blue2" width="120px" height="52px">
        인증번호 전송
      </Button>
      <Button variant="blue2" width="120px" height="52px">
        재전송
      </Button>
      <InputBox
        width="320px"
        label="필드 레이블"
        state="default"
        placeholder="플레이스홀더"
        guide="도움말"
      />
      <InputBox
        width="320px"
        label="필드 레이블"
        state="error"
        placeholder="플레이스홀더"
        guide="도움말"
      />
      <InputBox
        width="320px"
        label="필드 레이블"
        state="success"
        placeholder="플레이스홀더"
        guide="도움말"
      />
      <Dropdown
        title="드롭다운 가이드"
        contents={dropContents}
        selectedContents={selectedDropContents}
        setSelectedContents={setSelectedDropContents}
      />
      <Dropdown
        title="드롭다운 가이드"
        contents={dropContents}
        selectedContents={selectedDropContents}
        setSelectedContents={setSelectedDropContents}
        pressed={true}
      />
      <SmallDropdown
        title="1급"
        contents={smallDropContents}
        selectedContents={smallContents}
        setSelectedContents={setSmallContents}
      />
      <SmallDropdown
        title="1급"
        contents={smallDropContents}
        selectedContents={smallContents}
        setSelectedContents={setSmallContents}
        pressed={true}
      />
      <NursingQualificationCard
        initialType={certificateData.type}
        onChange={handleCertificateChange}
      />
      <Toggle checked={isToggleChecked} onChange={handleToggleChange} />
      <MiddleDropdown
        title="시급"
        contents={middleDropContents}
        selectedContents={middleContents}
        setSelectedContents={setMiddleContents}
      />
    </div>
  );
};

const Tab1Content = () => <div>첫번째내용티비</div>;
const Tab2Content = () => <div>두번째내용티비</div>;

const IconWrapper = styled.div`
  path {
    fill: ${({ theme }) => theme.colors.mainOrange};
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
