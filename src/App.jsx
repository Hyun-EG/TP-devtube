import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { FindPassword } from './pages/FindPassword';
import { FindId } from './pages/FindId';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/home" element={<Home />} />
					<Route path="/findid" element={<FindId />} />
					<Route path="/findPassword" element={<FindPassword />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
