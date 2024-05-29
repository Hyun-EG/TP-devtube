import './App.css';
import { Provider } from 'react-redux'; // Redux Provider import 추가
import store from './components/calendar/Redux/store'; // Redux 스토어 import 추가
import BigCalendar from './components/calendar/BigCalendar';

import Header from './components/Header';
import Sidebar from './components/SideBar';

function App() {
	return (
		<>
			<Provider store={store}> {/* Redux 스토어를 Provider에 전달 */}
				<div className="App">
					<BigCalendar />
				</div>
			</Provider>
			<Header />
			<Sidebar />
		</>
	);
}

export default App;
