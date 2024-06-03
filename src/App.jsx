import './App.css';
import { Provider } from 'react-redux'; // Redux Provider import 추가
import store from './components/calendar/Redux/store'; // Redux 스토어 import 추가
import BigCalendar from './components/calendar/BigCalendar'; // 달력
import BigCalendarWeek from './components/calendar/weekCalendar/BigCalendarWeek'; // 주력

import Header from './components/Header';
import Sidebar from './components/SideBar';

function App() {
	return (
		<>
			<Header />
			<Sidebar />
			<Provider store={store}> {/* Redux 스토어를 Provider에 전달 */}
				<div className="App">
					<BigCalendar />
					{/* <BigCalendarWeek /> */}
				</div>
			</Provider>
		</>
	);
}

export default App;
