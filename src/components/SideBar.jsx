import ProfileImg from '../assets/profile_img.png';
import Dashboard from '../assets/dashboard.png';
import Earnings from '../assets/earning.png';
import Requests from '../assets/requests.png';
import Calendar from '../assets/calendar.png';
import Logout from '../assets/Logout.png';

function Sidebar() {
	return (
		<div className="sidebar">
			<div className="profile">
				<img className="profile__img" src={ProfileImg} alt="ProfileImg" />
				<span className="profile__channel">Channel name</span>
				<span className="profile__name">Name</span>
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
				<div className="logout_content">
					<img src={Logout} alt="Logout" />
					<span>Logout</span>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
