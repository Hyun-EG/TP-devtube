import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Provider } from 'react-redux'; // Redux Provider import 추가
import store from './redux/store'; // Redux 스토어 import 추가
import BigCalendar from './components/BigCalendar';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Provider store={store}> {/* Redux 스토어를 Provider에 전달 */}
			<div className="App">
				<BigCalendar />
			</div>
		</Provider>
	);
}

export default App;
