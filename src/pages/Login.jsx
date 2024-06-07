import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/header_logo.svg';
import { loginUser } from '../redux/authAction';
import { useDispatch, useSelector } from 'react-redux';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const loading = useSelector(state => state.auth.loading);
	const error = useSelector(state => state.auth.error);

	const handleLogin = () => {
		dispatch(loginUser(email, password));
	};

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user, navigate]);

	useEffect(() => {
		if (error) {
			alert(error);
		}
	}, [error]);

	const handleSignUpClick = () => {
		navigate('/signup');
	};

	const handleFindIdClick = () => {
		navigate('/findid');
	};

	const handleFindPasswordClick = () => {
		navigate('/findpassword');
	};

	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			handleLogin();
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login">
				<div className="wrapper">
					<div className="header">
						<img className="login-logo-img" src={logo} alt="header-logo" />
					</div>
					<div className="login-content">
						<span className="sign-in">Sign in</span>
						<span>로그인</span>
					</div>
					<div className="input-area">
						<input
							className="input-login-box"
							type="text"
							placeholder="ID 입력해주세요"
							value={email}
							onChange={e => setEmail(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<input
							className="input-login-box"
							type="password"
							placeholder="비밀번호 입력해주세요"
							value={password}
							onChange={e => setPassword(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</div>
					<div className="login-find-id-password-area">
						<span className="find-id-password" onClick={handleFindIdClick}>
							ID찾기
						</span>
						<span className="separation">|</span>
						<span
							className="find-id-password"
							onClick={handleFindPasswordClick}>
							비밀번호 찾기
						</span>
					</div>
					<div className="login-footer">
						<span className="login-footer-sign-up" onClick={handleSignUpClick}>
							회원가입
						</span>
						<button
							className="login-btn"
							onClick={handleLogin}
							disabled={loading}>
							로그인
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
