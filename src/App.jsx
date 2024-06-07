import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { FindId } from './pages/FindId';
import { FindPassword } from './pages/FindPassword';
import Calendar from './pages/Calendar';
import EarningsPage from './pages/EarningsPage';
import Requests from './pages/Requests';
import PrivateRoute from './components/PrivateRoute';
import { Page404 } from './pages/Page404';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/home"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="/findid" element={<FindId />} />
					<Route path="/findPassword" element={<FindPassword />} />
					<Route
						path="/calendar"
						element={
							<PrivateRoute>
								<Calendar />
							</PrivateRoute>
						}
					/>
					<Route
						path="/earnings"
						element={
							<PrivateRoute>
								<EarningsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/requests"
						element={
							<PrivateRoute>
								<Requests />
							</PrivateRoute>
						}
					/>
					<Route path="/*" element={<Page404 />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
