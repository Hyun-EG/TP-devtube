import Logo from '../assets/header_logo.svg';
import Create from '../assets/videocall.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
	const navigate = useNavigate();

	return (
		<header>
			<img
				src={Logo}
				alt="Logo"
				className="logo"
				onClick={() => navigate('/home')}
			/>
			<div className="header__box">
				<img src={Create} alt="Create" className="header__box_img" />
				<div className="header__box_title">Create</div>
			</div>
		</header>
	);
}

export default Header;
