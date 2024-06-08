import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const user = useSelector(state => state.auth.user);
	const location = useLocation();
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (!user) {
			setShouldRedirect(true);
		} else {
			setShouldRedirect(false);
		}
	}, [user]);

	useEffect(() => {
		if (shouldRedirect) {
			alert('로그인 정보가 없습니다. 로그인을 먼저 해주세요.');
		}
	}, [shouldRedirect]);

	if (!user) {
		if (shouldRedirect) {
			return <Navigate to="/" state={{ from: location }} />;
		}
		return null;
	}

	return children;
};

export default PrivateRoute;
