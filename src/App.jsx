import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Requests from "./pages/Requests";

function App() {

	return (
		<>
			<Requests />
		</>
	)
}

export default App;
