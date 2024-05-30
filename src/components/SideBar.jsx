import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ProfileImg from '../assets/profile_img.png';
import Dashboard from '../assets/dashboard.png';
import Earnings from '../assets/earning.png';
import Requests from '../assets/requests.png';
import Calendar from '../assets/calendar.png';
import Logout from '../assets/Logout.png';
import { db } from '../firebase/config';

function Sidebar() {
	const [userData, setUserData] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const getUserData = async () => {
			if (location.state && location.state.user) {
				const userEmail = location.state.user.email;
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
	}, [location]);

	const handleLogout = () => {
		setUserData(null);
		alert('로그아웃 되었습니다.');
		navigate('/login');
	};

	return (
		<div className="sidebar">
			<div className="profile">
				<img className="profile__img" src={ProfileImg} alt="ProfileImg" />
				{userData && (
					<>
						<span className="profile__channel">{userData.channelName}</span>
						<span className="profile__name">{userData.name}</span>
					</>
				)}
			</div>

			<div className="menu">
				<div className="menu__list">
					<img src={Dashboard} alt="Dashboard" />
					<span>Dashboard</span>
				</div>
				<div className="menu__list">
					<img src={Earnings} alt="Earnings" />
					<span>Earnings</span>
				</div>
				<div className="menu__list">
					<img src={Requests} alt="Requests" />
					<span>Requests</span>
				</div>
				<div className="menu__list">
					<img src={Calendar} alt="Calendar" />
					<span>Calendar</span>
				</div>
			</div>

			<div className="logout">
				<div className="logout_content" onClick={handleLogout}>
					<img src={Logout} alt="Logout" />
					<span>Logout</span>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
