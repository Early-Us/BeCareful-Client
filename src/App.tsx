import { TestPage } from '@/page/TestPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
