import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '../redux/authSlice';
import ProfileImg from '../assets/profile_img.svg';
import Dashboard from '../assets/dashboard.svg';
import Earnings from '../assets/earnings.svg';
import Requests from '../assets/requests.svg';
import Calendar from '../assets/calendar.svg';
import Logout from '../assets/Logout.svg';

function Sidebar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			dispatch(setUser(JSON.parse(storedUser)));
		}
	}, [dispatch]);

	const handleLogoutClick = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<div className="sidebar">
			<div className="profile">
				<img className="profile__img" src={ProfileImg} alt="ProfileImg" />
				<span className="profile__channel">
					{user?.channelName || 'Channel name'}
				</span>
				<span className="profile__name">{user?.name || 'Name'}</span>
			</div>

			<div className="menu">
				<div className="menu__list" onClick={() => navigate('/home')}>
					<img src={Dashboard} alt="Dashboard" />
					<span>Dashboard</span>
				</div>
				<div className="menu__list" onClick={() => navigate('/earnings')}>
					<img src={Earnings} alt="Earnings" />
					<span>Earnings</span>
				</div>
				<div className="menu__list" onClick={() => navigate('/requests')}>
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
