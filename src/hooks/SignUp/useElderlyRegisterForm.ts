import {
  AreaSocial,
  CareLevel,
  CareType,
  Gender,
} from '@/types/ElderyRegister';
import { useState } from 'react';

export const useElderlyRegisterForm = () => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [inmate, setInmate] = useState<'있음' | '없음' | ''>('');
  const [pet, setPet] = useState<'있음' | '없음' | ''>('');

  const [selectedGrade, setSelectedGrade] = useState<CareLevel | ''>('');

  const [selectedArea, setSelectedArea] = useState<AreaSocial | null>(null);
  const [detailAddress, setDetailAddress] = useState('');

  const [healthCondition, setHealthCondition] = useState('');

  const [selectedCare, setSelectedCare] = useState<CareType | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const handleSubmit = async () => {
    //TODO
  };

  return {
    name,
    setName,
    birth,
    setBirth,
    gender,
    setGender,
    inmate,
    setInmate,
    pet,
    setPet,
    selectedGrade,
    setSelectedGrade,
    selectedArea,
    setSelectedArea,
    detailAddress,
    setDetailAddress,
    healthCondition,
    setHealthCondition,
    selectedCare,
    setSelectedCare,
    selectedDetails,
    setSelectedDetails,
    handleSubmit,
  };
};
