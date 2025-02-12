import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './style/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
