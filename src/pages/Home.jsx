import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import YouTube from 'react-youtube';
import { db } from '../firebase/config';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { EditUserProfile } from '../components/EditUserProfile';
import { fetchEvents } from '../redux/eventsSlice';

const getWeekDates = (date, weekOffset = 0) => {
	const currentDate = new Date(date);
	const dayOfWeek = currentDate.getDay();
	const startOfWeek = new Date(currentDate);
	startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + weekOffset * 7);

	const dates = Array.from({ length: 7 }).map((_, i) => {
		const d = new Date(startOfWeek);
		d.setDate(d.getDate() + i);
		return d;
	});
	return dates;
};

export const Home = () => {
	const [userData, setUserData] = useState(null);
	const [weekOffset, setWeekOffset] = useState(0);
	const [weekDates, setWeekDates] = useState(getWeekDates(new Date(), 0));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const location = useLocation();
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const getUserData = async () => {
			if (user) {
				const userEmail = user.email;
				try {
					const q = query(
						collection(db, 'users'),
						where('email', '==', userEmail)
					);
					const querySnapshot = await getDocs(q);
					querySnapshot.forEach(doc => {
						setUserData({ id: doc.id, ...doc.data() });
						localStorage.setItem(
							'userData',
							JSON.stringify({ id: doc.id, ...doc.data() })
						);
					});
				} catch (error) {
					console.error('Error getting user document:', error);
				}
			}
		};
		getUserData();
		dispatch(fetchEvents());
	}, [user, dispatch]);

	useEffect(() => {
		const cachedUserData = localStorage.getItem('userData');
		if (cachedUserData) {
			setUserData(JSON.parse(cachedUserData));
		}
		setWeekDates(getWeekDates(new Date(), weekOffset));
	}, [weekOffset]);

	useEffect(() => {
		const fetchUserEvents = async () => {
			if (userData) {
				try {
					const q = collection(db, 'users', userData.id, 'my-schedules');
					const querySnapshot = await getDocs(q);
					const eventsData = [];
					querySnapshot.forEach(doc => {
						eventsData.push({ id: doc.id, ...doc.data() });
					});
					setEvents(eventsData);
				} catch (error) {
					console.error('Error fetching events:', error);
				}
			}
		};
		fetchUserEvents();
	}, [userData]);

	const handlePrevWeek = () => {
		setWeekOffset(prev => prev - 1);
	};

	const handleNextWeek = () => {
		setWeekOffset(prev => prev + 1);
	};

	const opts = {
		playerVars: {
			autoplay: 0
		}
	};

	const isToday = date => {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	return (
		<>
			<Header />
			<Sidebar />
			{isModalOpen && (
				<EditUserProfile
					onClose={() => setIsModalOpen(false)}
					userData={userData}
				/>
			)}
			<div className="home">
				<div className="header">대시보드</div>
				<div className="board-wrapper">
					<div className="first-line">
						<div className="information-channel-area">
							<div className="__content-title">
								<span>채널 정보</span>
								<button
									className="edit-btn"
									onClick={() => setIsModalOpen(true)}>
									수정
								</button>
							</div>
							{userData && (
								<>
									<div className="__content">
										<span>크리에이터 이름</span>
										<span>{userData.name}</span>
									</div>
									<div className="__content">
										<span>채널 이름</span>
										<span>{userData.channelName}</span>
									</div>
									<div className="__content">
										<span>이메일</span>
										<span>{userData.email}</span>
									</div>
									<div className="__content">
										<span>구독자 수</span>
										<span>10,000명</span>
									</div>
									<div className="__content">
										<span>조회수</span>
										<span>365만</span>
									</div>
								</>
							)}
						</div>
						<div className="shorts-area">
							<div className="__content-title">
								<span>최신영상</span>
							</div>
							<div className="video">
								<YouTube
									videoId="ymtDGOp13ns?si=2N7NC7bN1Moy8H0j"
									opts={opts}
									className="youtube-video"
								/>
							</div>
						</div>
					</div>
					<div className="schedule-area">
						<div className="__title">
							<span>이번 주의 스케줄</span>
							<div>
								<button className="__btn" onClick={handlePrevWeek}>
									◁
								</button>
								<button className="__btn" onClick={handleNextWeek}>
									▷
								</button>
							</div>
						</div>
						<div className="schedule">
							<table className="__table">
								<thead className="__thead">
									<tr>
										{weekDates.map((date, index) => (
											<th key={index} className={isToday(date) ? 'today' : ''}>
												<div className="date">
													{date.toLocaleDateString('ko-KR', {
														weekday: 'short'
													})}{' '}
													{date.toLocaleDateString('ko-KR', {
														month: 'numeric',
														day: 'numeric'
													})}
												</div>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									<tr>
										{weekDates.map((date, index) => (
											<td key={index}>
												{events
													.filter(event => {
														const startDate = new Date(event.start);
														const endDate = new Date(event.end);
														return startDate <= date && date <= endDate;
													})
													.map(event => (
														<div key={event.id}>{`● ${event.title}`}</div>
													))}
											</td>
										))}
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
