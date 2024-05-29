import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import logo from '../assets/header_logo.png';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const q = query(collection(db, 'users'), where('email', '==', email));
			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) {
				alert('해당 이메일이 존재하지 않습니다.');
				return;
			}
			querySnapshot.forEach(doc => {
				const userData = doc.data();
				if (userData.password === password) {
					alert('로그인 되었습니다.');
					navigate('/home', { state: { user: userData } });
				} else {
					alert('이메일 또는 비밀번호가 올바르지 않습니다.');
				}
			});
		} catch (error) {
			console.error('Error logging in: ', error);
			alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	const handleSignUpClick = () => {
		navigate('/signup');
	};

	const handleFindIdClick = () => {
		navigate('/findid');
	};

	const handleFindPasswordClick = () => {
		navigate('/findpassword');
	};

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
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<input
							className="input-box"
							type="password"
							placeholder="비밀번호 입력해주세요"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className="find-id-password-area">
						<span className="find-id-password" onClick={handleFindIdClick}>
							ID찾기
						</span>
						<span>|</span>
						<span
							className="find-id-password"
							onClick={handleFindPasswordClick}>
							비밀번호 찾기
						</span>
					</div>
					<div className="footer">
						<span className="footer-sign-up" onClick={handleSignUpClick}>
							회원가입
						</span>
						<button className="login-btn" onClick={handleLogin}>
							로그인
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
