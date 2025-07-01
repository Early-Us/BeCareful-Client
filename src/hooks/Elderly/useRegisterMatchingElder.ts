import { useState } from 'react';

//TODO
const dayAPI = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
} as const;

export const useRegisterMatchingForm = () => {
  //TODO
  const [selectDay, setSelectDay] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [careTypes, setCareTypes] = useState<string[]>([]);
  const [selectedPayType, setSelectedPayType] = useState<
    'HOUR' | 'DAY' | 'MONTH'
  >('HOUR');

  const [workSalaryAmount, setWorkSalaryAmount] = useState(0);
  const [memoContent, setMemoContent] = useState('');

  const handleSelectDay = (id: string) => {
    setSelectDay((prev) =>
      prev.includes(id) ? prev.filter((day) => day !== id) : [...prev, id],
    );
  };

  const handleCareTypeChange = (careType: string) => {
    setCareTypes((prev) =>
      prev.includes(careType)
        ? prev.filter((type) => type !== careType)
        : [...prev, careType],
    );
  };

  const isFormValid =
    title.trim() !== '' &&
    selectDay.length > 0 &&
    startTime !== '' &&
    endTime !== '' &&
    careTypes.length > 0 &&
    workSalaryAmount > 0;

  const getPayload = () => ({
    elderlyId: 1,
    title,
    workDays: selectDay.map((day) => dayAPI[day as keyof typeof dayAPI]),
    workStartTime: startTime,
    workEndTime: endTime,
    careTypes,
    workSalaryType: selectedPayType as 'HOUR' | 'DAY' | 'MONTH',
    workSalaryAmount,
    description: memoContent,
  });

  return {
    title,
    setTitle,
    selectDay,
    handleSelectDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    careTypes,
    handleCareTypeChange,
    selectedPayType,
    setSelectedPayType,
    workSalaryAmount,
    setWorkSalaryAmount,
    memoContent,
    setMemoContent,
    isFormValid,
    getPayload,
  };
};
