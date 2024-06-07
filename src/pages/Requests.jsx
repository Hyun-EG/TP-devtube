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
			<div className="requests">
				<div className="requests__title">수익 정정 신청</div>
				<RequestForm />
				<div className="requests__title">신청 내역</div>
				<RequestList />
			</div>
			
		</>
	);
}

export default Requests;
