import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import BigCalendar from './components/BigCalendar';
import { Provider } from 'react-redux';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Provider> {/* ReduxProvider로 감싸기 */}
			<BigCalendar />
		</Provider>
	);
}

export default App;
