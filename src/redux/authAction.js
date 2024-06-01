import { getUserByEmail } from '../firebase/dataService';
import {
	setUser,
	setError,
	clearError,
	setLoading,
	setSignUpError,
	setSignUpSuccess,
	clearSignUpSuccess
} from './authSlice';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const loginUser = (email, password) => async dispatch => {
	dispatch(setLoading(true));
	dispatch(clearError());

	try {
		const user = await getUserByEmail(email);
		if (user && user.password === password) {
			dispatch(setUser(user));
		} else {
			dispatch(setError('아이디 또는 비밀번호가 틀렸습니다.'));
		}
	} catch (error) {
		dispatch(setError('로그인 중 오류가 발생했습니다.'));
	} finally {
		dispatch(setLoading(false));
	}
};

export const signUpUser =
	(name, channelName, email, password, confirmPassword) => async dispatch => {
		dispatch(setLoading(true));
		dispatch(clearSignUpSuccess());
		dispatch(clearError());

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

		if (!validateName(name)) {
			dispatch(setSignUpError('이름이 올바르지 않습니다.'));
			return;
		}

		if (!validateChannelName(channelName)) {
			dispatch(setSignUpError('채널 이름이 올바르지 않습니다.'));
			return;
		}

		if (!validateEmail(email)) {
			dispatch(setSignUpError('이메일 형식이 올바르지 않습니다.'));
			return;
		}

		if (!password || password.length < 8) {
			dispatch(setSignUpError('비밀번호는 최소 8자 이상 입력해주세요.'));
			return;
		}

		if (password !== confirmPassword) {
			dispatch(setSignUpError('비밀번호가 일치하지 않습니다.'));
			return;
		}

		try {
			const existingUser = await getUserByEmail(email);
			if (existingUser) {
				dispatch(
					setSignUpError(
						'이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.'
					)
				);
				return;
			}

			await addDoc(collection(db, 'users'), {
				name,
				channelName,
				email,
				password
			});
			dispatch(setSignUpSuccess(true));
		} catch (error) {
			dispatch(
				setSignUpError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
			);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const updateUser = (userId, updatedData) => async dispatch => {
	dispatch(setLoading(true));
	dispatch(clearError());

	try {
		const userRef = doc(db, 'users', userId);
		await updateDoc(userRef, updatedData);
		const updatedUser = await getUserByEmail(updatedData.email);
		dispatch(setUser(updatedUser));
	} catch (error) {
		dispatch(setError('사용자 정보 업데이트 중 오류가 발생했습니다.'));
	} finally {
		dispatch(setLoading(false));
	}
};
