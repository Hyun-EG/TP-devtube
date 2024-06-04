import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/SideBar';
import RequestForm from './pages/Requests/RequestForm';
import RequestList from './pages/Requests/RequestList';



function App() {

	return (
		<>
			<Header />
			<Sidebar />
			<RequestForm />
		</>
	)
}

export default App;
