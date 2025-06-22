export interface ElderData {
  elderlyId: number;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  careLevel: string;
  cognitiveLevel?: string;
  imageUrl?: string;
}
