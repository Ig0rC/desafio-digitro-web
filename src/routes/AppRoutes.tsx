import React, {  useContext } from 'react';
import {
	Route, 
	Routes,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthenticationContext from '../Context/AuthenticationContext';
import ErrorPage from '../components/ErrorPage';


function AppRoutes() {	
	const { isAuthentication } = useContext(AuthenticationContext);

	return (
		<React.Fragment>
			<Routes>
				{isAuthentication ? (
					<Route path="/*" element={<PrivateRoute />} />
				) : (
					<Route  path="/*" element={<PublicRoute />} />
				)}

				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</React.Fragment>
	);
}


export default AppRoutes;