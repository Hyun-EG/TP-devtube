import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import YouTube from 'react-youtube';
import { db } from '../firebase/config';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import { useSelector } from 'react-redux';

const getWeekDates = (date, weekOffset = 0) => {
	const currentDate = new Date(date);
	currentDate.setDate(currentDate.getDate() + weekOffset * 7);
	const day = currentDate.getDay();
	const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
	const startOfWeek = new Date(currentDate.setDate(diff));
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
	const location = useLocation();
	const user = useSelector(state => state.auth.user);

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
						setUserData(doc.data());
					});
				} catch (error) {
					console.error('Error getting user document:', error);
				}
			}
		};
		getUserData();
	}, [user]);

	useEffect(() => {
		setWeekDates(getWeekDates(new Date(), weekOffset));
	}, [weekOffset]);

	const handlePrevWeek = () => {
		setWeekOffset(prev => prev - 1);
	};

	const handleNextWeek = () => {
		setWeekOffset(prev => prev + 1);
	};

	const opts = {
		height: '240',
		width: '496',
		playerVars: {
			autoplay: 0
		}
	};

	return (
		<>
			<Header />
			<Sidebar />
			<div className="home">
				<div className="header">
					<span className="board-title">대시보드</span>
				</div>
				<div className="board-wrapper">
					<div className="first-line">
						<div className="impormation-channel-area">
							<div className="__content-title">
								<span>채널 정보</span>
								<button className="edit-btn">수정</button>
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
								<YouTube videoId="_-J-gDPQpNU" opts={opts} />
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
							<table>
								<thead>
									<tr>
										{weekDates.map((date, index) => (
											<th key={index}>
												{date.toLocaleDateString('ko-KR', { weekday: 'short' })}
												<br />
												{date.toLocaleDateString('ko-KR', {
													month: 'numeric',
													day: 'numeric'
												})}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									<tr>
										{weekDates.map((date, index) => (
											<td key={index}></td>
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
