import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';

function Requests() {
	return (
		<>
			<Header />
			<Sidebar />
			<RequestForm />
      <RequestList />
		</>
	);
}

export default Requests;
