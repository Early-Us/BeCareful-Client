import { Button } from '@/components/common/Button/Button';
import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { useState } from 'react';
import { SmallDropdown } from '@/components/common/Dropdown/SmallDropdown';
import { MiddleDropdown } from '@/components/common/Dropdown/MiddleDropdown';
import { Toggle } from '@/components/common/Toggle/Toggle';

import { BooleanNoCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/BooleanNoCard';
import { BooleanYesCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/BooleanYesCard';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';

import { ApplyChip } from '@/components/common/ApplyCard/ApplyChip';
import { ApplyTag } from '@/components/common/ApplyCard/ApplyTag';
import { ApplyCard } from '@/components/common/ApplyCard/ApplyCard';

import { CheckBox } from '../components/common/CheckBox/CheckBox';
import { CareGiverCard } from '@/components/SignUp/common/CareGiverCard';
import { InstitutionCard } from '@/components/SignUp/common/InstitutionCard';
import { SelectStartDateModal } from '@/components/SocialWorker/MatchingCaregiverDetailInfo/SelectStartDateModal';

export const TestPage = () => {
  const [selectedDropContents, setSelectedDropContents] = useState<string[]>(
    [],
  );
  const dropContents = ['요양', '보호', '사회', '복지'];
  const [smallContents, setSmallContents] = useState<string[]>([]);
  const smallDropContents = ['1급', '2급'];
  const [middleContents, setMiddleContents] = useState<string[]>([]);
  const middleDropContents = ['시급', '일급', '월급', '연봉'];

  const [isToggleChecked, setIsToggleChecked] = useState(true);
  const handleToggleChange = () => {
    setIsToggleChecked((prevChecked) => !prevChecked);
  };

  const [isChecked, setIsChecked] = useState(false);
  const checkBoxClicked = (check: boolean) => {
    setIsChecked(check);
  };

  const [pressed, setPressed] = useState(false);
  const handleCardClick = () => {
    setPressed(!pressed);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Test Page</h1>
      <Button variant="blue" width="320px" height="52px" onClick={openModal}>
        채용제안 모달 열기
      </Button>
      {isModalOpen && (
        <SelectStartDateModal onClose={closeModal} width={'312px'} />
      )}

      <BooleanNoCard pressed={true} text="네, 소유하고 있습니다." />
      <BooleanNoCard pressed={false} text="네, 소유하고 있습니다." />
      <BooleanYesCard pressed={true} text="네, 소유하고 있습니다." />
      <AgreeCard pressed={false} text="네, 소유하고 있습ㅇㅇ니다." />
      <div onClick={handleCardClick}>
        <CareGiverCard pressed={pressed} />
        <InstitutionCard pressed={pressed} />
      </div>

      <ApplyChip state={'pass'} />
      <ApplyTag label="인기공고" />
      <ApplyTag label="시급 TOP" />
      <ApplyCard
        chipState="fail"
        centerName="행복사랑요양센터"
        description="방문요양/1일 9시간씩 주6일 모집"
        tags={['인기공고', '시급 TOP']}
        careItems={['식사보조', '이동보조']}
        workingDays={['목', '일']}
        workingHours="15:00~19:00"
        hourlyRate="12,000원"
      />

      <Button variant="blue" width="320px" height="52px">
        다음 단계로 이동
      </Button>
      <Button variant="blue2" width="120px" height="52px">
        인증번호 전송
      </Button>
      <Button variant="blue2" width="120px" height="52px">
        재전송
      </Button>

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

      <Toggle checked={isToggleChecked} onChange={handleToggleChange} />
      <MiddleDropdown
        title="시급"
        contents={middleDropContents}
        selectedContents={middleContents}
        setSelectedContents={setMiddleContents}
      />
      <CheckBox
        id="1"
        checked={isChecked}
        onChange={checkBoxClicked}
        borderRadius="4px"
        label="자동로그인"
        select=""
        guide=""
      />
      <p>체크박스 상태: {isChecked ? '체크됨' : '체크되지 않음'}</p>
      <CheckBox
        id="2"
        checked={isChecked}
        onChange={checkBoxClicked}
        borderRadius=""
        label=""
        select="필수"
        guide="이용약관"
      />
      <CheckBox
        id="3"
        checked={isChecked}
        onChange={checkBoxClicked}
        borderRadius=""
        label=""
        select="선택"
        guide="이용약관"
      />
    </div>
  );
};
