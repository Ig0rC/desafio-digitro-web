import { Navigate, Outlet,  } from 'react-router-dom';

interface Props {
  isAuthentication: boolean;
}



function PrivateRoute({ isAuthentication }: Props) {  
	return isAuthentication ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;