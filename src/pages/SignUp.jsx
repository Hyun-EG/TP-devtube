import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/header_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../redux/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function SignUp() {
	const [name, setName] = useState('');
	const [channelName, setChannelName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const signUpError = useSelector(state => state.auth.signUpError);
	const signUpSuccess = useSelector(state => state.auth.signUpSuccess);

	useEffect(() => {
		if (signUpSuccess) {
			alert('회원가입이 성공적으로 완료되었습니다!');
			navigate('/');
		}
	}, [signUpSuccess, navigate]);

	const handleSignUp = () => {
		if (
			!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
				password
			)
		) {
			alert('비밀번호는 영어, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
			return;
		}

		if (password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		dispatch(signUpUser(name, channelName, email, password, confirmPassword));
	};

	const handleLoginClick = () => {
		navigate('/');
	};

	useEffect(() => {
		if (signUpError) {
			alert(signUpError);
		}
	}, [signUpError]);

	return (
		<>
			<div className="sign-up">
				<div className="wrapper">
					<div className="header">
						<img className="sign-up-header-logo" src={logo} alt="header-logo" />
					</div>
					<div className="sign-up-content">
						<span className="content">Sign up</span>
						<span className="content">회원가입</span>
					</div>
					<div className="input-area">
						<div>
							<input
								placeholder="이름"
								className="input-name"
								type="text"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<input
								placeholder="채널 이름"
								className="input-name"
								type="text"
								value={channelName}
								onChange={e => setChannelName(e.target.value)}
							/>
						</div>
						<input
							placeholder="Email 입력해주세요"
							className="input-email"
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<div className="password-input-container">
							<input
								placeholder="비밀번호 입력해주세요 (최소 8자)"
								className="sign-up-input-password"
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<button
								className="toggle-password-btn"
								onClick={() => setShowPassword(!showPassword)}>
								<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
							</button>
						</div>
						<div className="password-input-container">
							<input
								placeholder="비밀번호 다시 한번 입력해주세요"
								className="sign-up-input-password"
								type={showConfirmPassword ? 'text' : 'password'}
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
							<button
								className="toggle-password-btn"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
								<FontAwesomeIcon
									icon={showConfirmPassword ? faEyeSlash : faEye}
								/>
							</button>
						</div>
					</div>
					<div className="sign-up-footer">
						<span
							className="footer-sign-in"
							onClick={handleLoginClick}
							style={{ cursor: 'pointer' }}>
							로그인
						</span>
						<button className="sign-up-btn" onClick={handleSignUp}>
							회원가입
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
