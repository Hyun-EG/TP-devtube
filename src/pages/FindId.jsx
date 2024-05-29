import logo from '../assets/header_logo.png';

export function FindId() {
	return (
		<>
			<div className="find-id">
				<div className="wrapper">
					<div className="header">
						<img src={logo} alt="header-logo" />
					</div>
					<div className="find-id-content">
						<span className="title">Find id</span>
						<span>아이디찾기</span>
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
					</div>

					<div className="footer">
						<span className="login">로그인</span>
						<button className="find-id-btn">확인</button>
					</div>
				</div>
			</div>
		</>
	);
}
