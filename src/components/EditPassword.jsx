import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function EditPassword({ userDocId, setShowEditPassword }) {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleUpdatePassword = async () => {
		if (password !== confirmPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		try {
			const userDoc = doc(db, 'users', userDocId);
			await updateDoc(userDoc, { password });
			alert('비밀번호가 성공적으로 변경되었습니다.');
			setShowEditPassword(false); // 모달 창 닫기
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
					<input
						className="__input"
						placeholder="비밀번호를 입력해주세요."
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className="__area">
					<span className="__input-title">비밀번호 재확인</span>
					<input
						className="__input"
						placeholder="비밀번호를 다시 한번 입력해주세요."
						type="password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
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
