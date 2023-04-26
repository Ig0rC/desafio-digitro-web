import { ThemeProvider } from 'styled-components';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import defaultTheme from '../assets/styles/theme/defaultTheme';
import GlobalStyles from '../assets/styles/global';


function RoutesApp() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyles />
				<AppRoutes /> 
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default RoutesApp;