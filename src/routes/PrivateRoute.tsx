import { Navigate, Route, Routes,  } from 'react-router-dom';
import CallCenter from '../pages/CallCenter';


function PrivateRoute() {
  return (
    <Routes>
      <Route path='/' element={<CallCenter />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default PrivateRoute;