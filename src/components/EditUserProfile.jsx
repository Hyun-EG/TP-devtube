import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authAction';

export function EditUserProfile({ onClose, userData }) {
	const [name, setName] = useState(userData.name);
	const [channelName, setChannelName] = useState(userData.channelName);
	const [email, setEmail] = useState(userData.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);

	const handleUpdate = () => {
		// 비밀번호 길이가 8자 이상이어야 함
		if (password.length < 8) {
			alert('비밀번호는 최소 8자 이상이어야 합니다.');
			return;
		}

		// 비밀번호와 비밀번호 확인이 일치하는지 확인
		if (password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		// 이름에 특수문자가 포함되었는지 확인
		if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
			alert('올바른 이름을 입력하세요.');
			return;
		}

		if (!/^[a-zA-Z0-9가-힣\s]+$/.test(channelName)) {
			alert('채널 이름에는 영문, 한글, 숫자만 입력하세요.');
			return;
		}

		// 수정할 사용자 데이터
		const updatedData = { name, channelName, email, password };

		dispatch(updateUser(userData.id, updatedData));
		onClose();
	};

	return (
		<>
			<div className="edit-profile-modal">
				<div className="name-area">
					<div className="__input-name">
						<div>이름</div>
						<input
							className="input-name-box"
							type="text"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="input-channel-name">
						<div>채널 이름</div>
						<input
							className="input-name-box"
							type="text"
							value={channelName}
							onChange={e => setChannelName(e.target.value)}
						/>
					</div>
				</div>
				<div className="email-input">
					<div>Email</div>
					<input
						className="email-input-box"
						type="text"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="password-input">
					<div>비밀번호</div>
					<input
						className="password-input-box"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className="password-input">
					<div>비밀번호 확인</div>
					<input
						className="password-input-box"
						type="password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="modal-btn">
					<button className="close-btn" onClick={onClose}>
						취소
					</button>
					<button
						className="edit-btn"
						onClick={handleUpdate}
						disabled={loading}>
						수정하기
					</button>
				</div>
			</div>
		</>
	);
}
