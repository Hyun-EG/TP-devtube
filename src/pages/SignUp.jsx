import logo from '../assets/header_logo.png';

export function SingUp() {
	return (
		<>
			<div className="sign-up">
				<div className="wrapper">
					<div className="header">
						<img src={logo} alt="header-logo" />
					</div>
					<div className="sign-up-content">
						<span className="content">Sing up</span>
						<span>회원가입</span>
					</div>
					<div className="input-area">
						<div>
							<input placeholder="이름" className="input-name" type="text" />
							<input
								placeholder="채널 이름"
								className="input-name"
								type="text"
							/>
						</div>
						<input
							placeholder="Email 입력해주세요"
							className="input-email-password"
							type="text"
						/>
						<input
							placeholder="비밀번호 입력해주세요"
							className="input-email-password"
							type="text"
						/>
						<input
							placeholder="비밀번호 다시 한번 입력해주세요"
							className="input-email-password"
							type="text"
						/>
					</div>

					<div className="footer">
						<span className="footer-sign-in">로그인</span>
						<button className="sign-up-btn">회원가입</button>
					</div>
				</div>
			</div>
		</>
	);
}
