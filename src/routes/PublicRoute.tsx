import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';


function PublicRoute() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}

export default PublicRoute;