import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import { Provider } from 'react-redux';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { FindId } from './pages/FindId';
import { FindPassword } from './pages/FindPassword';
import Calendar from './pages/Calendar';
import EarningsPage from './pages/EarningsPage';
import Requests from './pages/Requests';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/home" element={<Home />} />
					<Route path="/findid" element={<FindId />} />
					<Route path="/findPassword" element={<FindPassword />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/earnings" element={<EarningsPage />} />
					<Route path="/requests" element={<Requests />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
