import logo from '../assets/header_logo.png';

export function Login() {
	return (
		<>
			<div className="login">
				<div className="wrapper">
					<div className="header">
						<img src={logo} alt="header-logo" />
					</div>
					<div className="login-content">
						<span className="sign-in">Sing in</span>
						<span>로그인</span>
					</div>
					<div className="input-area">
						<input
							className="input-box"
							type="text"
							placeholder="ID 입력해주세요"
						/>
						<input
							className="input-box"
							type="text"
							placeholder="비밀번호 입력해주세요"
						/>
					</div>
					<div className="find-id-password-area">
						<span className="find-id-password">ID찾기</span>
						<span>|</span>
						<span className="find-id-password">비밀번호 찾기</span>
					</div>
					<div className="footer">
						<span className="footer-sign-up">회원가입</span>
						<button className="login-btn">로그인</button>
					</div>
				</div>
			</div>
		</>
	);
}
