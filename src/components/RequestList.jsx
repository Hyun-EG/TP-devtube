import React, { useState, useEffect } from 'react';
import noData from '../assets/no_data.png';
import edit from '../assets/edit.svg';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Loading from './Loading';

function RequestList() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedIds, setSelectedIds] = useState([]);

	async function fetchEvents() {
		setLoading(true);
		const eventsCollection = collection(db, 'request');
		const eventSnapshot = await getDocs(eventsCollection);
		const fetchedEvents = eventSnapshot.docs.map(doc => {
			const data = doc.data();
			return {
				docId: doc.id,
				date: data.requestDate,
				reason: data.reason,
				id: data.videoId,
				period: data.accountMonth,
				content: data.content
			};
		});
		setEvents(fetchedEvents);
		setLoading(false);
	}

	useEffect(() => {
		fetchEvents();
	}, []);

	const handleCheckboxChange = docId => {
		setSelectedIds(prevSelectedIds =>
			prevSelectedIds.includes(docId)
				? prevSelectedIds.filter(selectedId => selectedId !== docId)
				: [...prevSelectedIds, docId]
		);
	};

	const handleDelete = async () => {
		try {
			for (let docId of selectedIds) {
				await deleteDoc(doc(db, 'request', docId));
			}
			setEvents(events.filter(event => !selectedIds.includes(event.docId)));
			setSelectedIds([]);
		} catch (error) {
			console.error('데이터 삭제 실패 에러', error);
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="list_wrapper">
					<button className="btn_delete" type="button" onClick={handleDelete}>
						선택 삭제
					</button>
					<div className="requests_list">
						<div className="contents_top">
							<input type="checkbox"></input>
							<div>신청 날짜</div>
							<div>사유</div>
							<div>영상 ID</div>
							<div>정산 기간</div>
							<div>신청 내용</div>
							<div>정정 상태</div>
						</div>
						{events.length > 0 ? (
							events.map(event => (
								<div key={event.id} className="contents">
									<input
										type="checkbox"
										checked={selectedIds.includes(event.docId)}
										onChange={() => handleCheckboxChange(event.docId)}></input>
									<div className="item">
										<span className="text">{event.date}</span>
									</div>
									<div className="item">
										<span className="text">{event.reason}</span>
									</div>
									<div className="item">
										<span className="text">{event.id}</span>
									</div>
									<div className="item">
										<span className="text">{event.period}</span>
									</div>
									<div className="item">
										<span className="text">
											{event.content.length > 30
												? `${event.content.slice(0, 20)}...`
												: event.content}
										</span>
									</div>
									<div className="requests_status">신청</div>
									<button className="requests_edit">
										<img src={edit}></img>
										수정
									</button>
								</div>
							))
						) : (
							<div className="contents">
								<div className="item">
									<img src={noData} alt="no data" />
								</div>
								<div className="item">
									<span className="text">신청 내역이 없습니다.</span>
									<p>정정 신청 해보세요.</p>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default RequestList;
