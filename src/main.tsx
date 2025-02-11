import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './style/GlobalStyle.tsx';

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
);
