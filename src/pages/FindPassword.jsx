import logo from '../assets/header_logo.png';

export function FindPassword() {
	return (
		<>
			<div className="find-password">
				<div className="wrapper">
					<div className="header">
						<img src={logo} alt="header-logo" />
					</div>
					<div className="find-password-content">
						<span className="title">Find password</span>
						<span>비밀번호 찾기</span>
					</div>
					<div className="input-area">
						<input
							className="input-box"
							type="text"
							placeholder="이름을 입력해주세요"
						/>
						<input
							className="input-box"
							type="text"
							placeholder="채널이름을 입력해주세요"
						/>
						<input
							className="input-box"
							type="text"
							placeholder="이메일을 입력해주세요"
						/>
					</div>

					<div className="footer">
						<span className="login">로그인</span>
						<button className="find-password-btn">확인</button>
					</div>
				</div>
			</div>
		</>
	);
}
