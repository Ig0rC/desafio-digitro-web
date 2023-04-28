import { ThemeProvider } from 'styled-components';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import defaultTheme from '../assets/styles/theme/defaultTheme';
import GlobalStyles from '../assets/styles/global';
import { AuthenticationProvider } from '../Context/AuthenticationContext';


function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthenticationProvider>
				<ThemeProvider theme={defaultTheme}>
					<GlobalStyles />
					<AppRoutes /> 
				</ThemeProvider>
			</AuthenticationProvider>
		</BrowserRouter>
	);
}

export default RoutesApp;