import { createGlobalStyle } from 'styled-components';
import PretendardVariable from '../assets/fonts/PretendardVariable.woff2';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable';
    font-style: normal;
    src: url(${PretendardVariable}) format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard Variable';
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -0.025em; 
  }

  body.is-chrome textarea {
    word-spacing: -5px;
  }

  p, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    
  }

  img {
    border: none;
  }
`;

export default GlobalStyle;
