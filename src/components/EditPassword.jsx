import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function EditPassword({ userDocId, setShowEditPassword }) {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleUpdatePassword = async () => {
		if (password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		// Check if the password meets the requirements
		if (
			!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
				password
			)
		) {
			alert('비밀번호는 영어, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
			return;
		}

		try {
			const userDoc = doc(db, 'users', userDocId);
			await updateDoc(userDoc, { password });
			alert('비밀번호가 성공적으로 변경되었습니다.');
			setShowEditPassword(false);
		} catch (error) {
			console.error('비밀번호 업데이트 오류:', error);
			alert('비밀번호를 변경하는 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<>
			<div className="modal-password">
				<span className="__title">비밀번호 재설정</span>
				<div className="__area">
					<span className="__input-title">비밀번호</span>
					<div className="password-input-container">
						<input
							className="__input"
							placeholder="비밀번호를 입력해주세요."
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
				<div className="__area">
					<span className="__input-title">비밀번호 재확인</span>
					<div className="password-input-container">
						<input
							className="__input"
							placeholder="비밀번호를 다시 한번 입력해주세요."
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
				<div className="__btn-area">
					<button className="__btn" onClick={handleUpdatePassword}>
						확인
					</button>
					<button
						className="__cancel-btn"
						onClick={() => setShowEditPassword(false)}>
						취소
					</button>
				</div>
			</div>
		</>
	);
}
