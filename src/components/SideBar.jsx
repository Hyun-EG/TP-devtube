import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '../redux/authSlice'; // 경로를 올바르게 설정하세요
import ProfileImg from '../assets/profile_img.png';
import Dashboard from '../assets/dashboard.png';
import Earnings from '../assets/earning.png';
import Requests from '../assets/requests.png';
import Calendar from '../assets/calendar.png';
import Logout from '../assets/Logout.png';

function Sidebar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user); // Redux 상태에서 사용자 정보를 가져옵니다.

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			dispatch(setUser(JSON.parse(storedUser))); // 로컬 스토리지에서 사용자 데이터를 불러와 Redux 상태 갱신
		}
	}, [dispatch]);

	const handleLogoutClick = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<div className="sidebar">
			<div className="profile" onClick={() => navigate('/home')}>
				<img className="profile__img" src={ProfileImg} alt="ProfileImg" />
				<span className="profile__channel">
					{user?.channelName || 'Channel name'}
				</span>
				<span className="profile__name">{user?.name || 'Name'}</span>
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
				<div className="menu__list" onClick={() => navigate('/calendar')}>
					<img src={Calendar} alt="Calendar" />
					<span>Calendar</span>
				</div>
			</div>

			<div className="logout">
				<div className="logout_content">
					<img src={Logout} alt="Logout" />
					<span onClick={handleLogoutClick}>Logout</span>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
