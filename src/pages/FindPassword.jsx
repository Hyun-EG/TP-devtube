import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import logo from '../assets/header_logo.svg';
import { useNavigate } from 'react-router-dom';
import { EditPassword } from '../components/EditPassword';

export function FindPassword() {
	const [name, setName] = useState('');
	const [channelName, setChannelName] = useState('');
	const [email, setEmail] = useState('');
	const [showEditPassword, setShowEditPassword] = useState(false);
	const [userDocId, setUserDocId] = useState(null);
	const navigate = useNavigate();

	const handleFindPassword = async () => {
		try {
			const q = query(
				collection(db, 'users'),
				where('name', '==', name),
				where('channelName', '==', channelName),
				where('email', '==', email)
			);
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				querySnapshot.forEach(doc => {
					setUserDocId(doc.id);
				});
				setShowEditPassword(true);
			} else {
				alert('해당 정보로 등록된 계정이 없습니다.');
			}
		} catch (error) {
			console.error('비밀번호 찾기 오류:', error);
			alert('비밀번호를 찾는 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	const handleLoginClick = () => {
		navigate('/');
	};

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			handleFindPassword();
		}
	};

	return (
		<>
			{showEditPassword && (
				<EditPassword
					userDocId={userDocId}
					setShowEditPassword={setShowEditPassword}
				/>
			)}
			<div className="find-password">
				<div className="wrapper">
					<div className="header">
						<img
							className="find-password-logo-img"
							src={logo}
							alt="header-logo"
						/>
					</div>
					<div className="find-password-content">
						<span className="title">Find password</span>
						<span className="title">비밀번호 찾기</span>
					</div>
					<div className="find-password-input-area">
						<input
							className="find-password-input-box"
							type="text"
							placeholder="이름을 입력해주세요"
							value={name}
							onChange={e => setName(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<input
							className="find-password-input-box"
							type="text"
							placeholder="채널이름을 입력해주세요"
							value={channelName}
							onChange={e => setChannelName(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<input
							className="find-password-input-box"
							type="text"
							placeholder="이메일을 입력해주세요"
							value={email}
							onChange={e => setEmail(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className="find-password-footer">
						<span className="password-login-btn" onClick={handleLoginClick}>
							로그인
						</span>
						<button className="pass-btn" onClick={handleFindPassword}>
							확인
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
