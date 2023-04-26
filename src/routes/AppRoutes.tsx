import React from 'react';
import {
	Route, 
	Routes,
} from 'react-router-dom';
import CallCenter from '../pages/CallCenter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';


function AppRoutes() {	
  const isAuthentication = false;

	return (
		<React.Fragment>
			<Routes>
				<Route path="/" element={<PrivateRoute isAuthentication={isAuthentication} />}>
					<Route path="/" element={<CallCenter />} />
					{/* <Route path="*" element={<ErrorPage />} /> */}
				</Route>

				<Route  path="/login" element={<PublicRoute isAuthentication={isAuthentication} />}>
					<Route path="/login" element={<Login />} />
				</Route>
				{/* <Route path="*" element={<ErrorPage />} /> */}
			</Routes>
		</React.Fragment>
	);
}


export default AppRoutes;