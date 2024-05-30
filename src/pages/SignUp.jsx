import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import logo from '../assets/header_logo.png';

export function SignUp() {
	const [name, setName] = useState('');
	const [channelName, setChannelName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const validateName = name => {
		const nameRegex = /^[가-힣]+$/;
		return nameRegex.test(name);
	};

	const validateChannelName = channelName => {
		const channelNameRegex = /^[가-힣a-zA-Z]+$/;
		return channelNameRegex.test(channelName);
	};

	const validateEmail = email => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const checkExistingEmail = async email => {
		const q = query(collection(db, 'users'), where('email', '==', email));
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
	};

	const handleSignUp = async () => {
		if (!validateName(name)) {
			alert('이름이 올바르지 않습니다.');
			return;
		}

		if (!validateChannelName(channelName)) {
			alert('채널 이름이 올바르지 않습니다.');
			return;
		}

		if (!validateEmail(email)) {
			alert('이메일 형식이 올바르지 않습니다.');
			return;
		}

		if (!password || password.length < 8) {
			alert('비밀번호는 최소 8자 이상 입력해주세요.');
			return;
		}

		if (password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		if (await checkExistingEmail(email)) {
			alert('이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.');
			return;
		}

		try {
			await addDoc(collection(db, 'users'), {
				name: name,
				channelName: channelName,
				email: email,
				password: password
			});
			alert('회원가입이 성공적으로 완료되었습니다!');
			navigate('/login');
		} catch (e) {
			console.error('Error adding document: ', e);
			alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	const handleLoginClick = () => {
		navigate('/login');
	};

	return (
		<>
			<div className="sign-up">
				<div className="wrapper">
					<div className="header">
						<img src={logo} alt="header-logo" />
					</div>
					<div className="sign-up-content">
						<span className="content">Sign up</span>
						<span>회원가입</span>
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
							className="input-email-password"
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<input
							placeholder="비밀번호 입력해주세요 (최소 8자)"
							className="input-email-password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<input
							placeholder="비밀번호 다시 한번 입력해주세요"
							className="input-email-password"
							type="password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="footer">
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

export default SignUp;
