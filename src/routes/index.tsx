import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';

function RoutesApp() {
	return (
		<BrowserRouter>
			<AppRoutes /> 
		</BrowserRouter>
	);
}

export default RoutesApp;