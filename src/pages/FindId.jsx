import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import logo from '../assets/header_logo.png';
import { useNavigate } from 'react-router-dom';

export function FindId() {
	const [name, setName] = useState('');
	const [channelName, setChannelName] = useState('');
	const navigate = useNavigate();

	const handleFindId = async () => {
		try {
			const q = query(
				collection(db, 'users'),
				where('name', '==', name),
				where('channelName', '==', channelName)
			);
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				querySnapshot.forEach(doc => {
					const userData = doc.data();
					const foundEmail = userData.email;
					alert(`찾으시는 이메일은 "${foundEmail}" 입니다.`);
				});
			} else {
				alert('해당 정보로 등록된 이메일이 없습니다.');
			}
		} catch (error) {
			console.error('Error finding email:', error);
			alert('이메일을 찾는 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	const handleLoginClick = () => {
		navigate('/');
	};

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
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<input
							className="input-box"
							type="text"
							placeholder="채널이름을 입력해주세요"
							value={channelName}
							onChange={e => setChannelName(e.target.value)}
						/>
					</div>

					<div className="footer-id">
						<span className="login-btn" onClick={handleLoginClick}>
							로그인
						</span>
						<button className="pass-btn" onClick={handleFindId}>
							확인
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
