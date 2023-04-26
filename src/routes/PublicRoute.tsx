import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAuthentication: boolean;
}



function PublicRoute({ isAuthentication }: Props) {  
	return isAuthentication ? <Navigate to="/" /> :  <Outlet />;
}

export default PublicRoute;