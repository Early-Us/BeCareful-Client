import 'styled-components';
import { ColorTypes, TypographyTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTypes;
    typography: TypographyTypes;
  }
}
