import Header from './components/Header';
import Sidebar from './components/SideBar';
import EarningsPage from './pages/EarningsPage';
import { Provider } from 'react-redux';
import { store } from './redux/earningPage/reduxStore';

function App() {
	return (
		<>
			<Header />
			<Sidebar />
			<Provider store={store}>
				<EarningsPage />
			</Provider>
		</>
	);
}

export default App;
