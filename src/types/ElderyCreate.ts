export interface AreaSocial {
  siDo: string;
  siGuGun: string;
  dongEupMyeon: string;
}

export interface AreaSelectData {
  name: string;
  gu: {
    name: string;
    dong: string[];
  }[];
}
