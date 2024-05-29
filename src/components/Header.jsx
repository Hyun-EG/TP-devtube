import Logo from '../assets/header_logo.png';
import Create from '../assets/VideoCall.png';

function Header() {
	return (
		<header>
			<img src={Logo} alt="Logo" className="logo" />
			<div className="header__box">
				<img src={Create} alt="Create" className="header__box_img" />
				<div className="header__box_title">Create</div>
			</div>
		</header>
	);
}

export default Header;
