import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function EditUserProfile({ onClose, userData }) {
	const [name, setName] = useState(userData.name);
	const [channelName, setChannelName] = useState(userData.channelName);
	const [email, setEmail] = useState(userData.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);

	const handleUpdate = () => {
		if (password.length < 8) {
			alert('비밀번호는 최소 8자 이상이어야 합니다.');
			return;
		}

		// Check if the password contains at least one English letter
		if (!/[a-zA-Z]/.test(password)) {
			alert('비밀번호에는 영문자를 최소 한 개 포함해야 합니다.');
			return;
		}

		// Check if the password contains at least one digit
		if (!/\d/.test(password)) {
			alert('비밀번호에는 숫자를 최소 한 개 포함해야 합니다.');
			return;
		}

		// Check if the password contains at least one special character
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			alert('비밀번호에는 특수문자를 최소 한 개 포함해야 합니다.');
			return;
		}

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
						disabled
						className="email-input-box"
						type="text"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="password-input">
					<div>비밀번호</div>
					<div className="password-input-container">
						<input
							className="password-input-box"
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
				</div>
				<div className="password-input">
					<div>비밀번호 확인</div>
					<div className="password-input-container">
						<input
							className="password-input-box"
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
