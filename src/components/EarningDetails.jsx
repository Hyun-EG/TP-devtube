import { useDispatch } from 'react-redux';
import { openModal } from '../redux/reduxlSlice';

function EarningDetails({ earning }) {
	const dispatch = useDispatch();

	return (
		<div className="earning_detail">
			<div className="earning_detail_grid">
				<div className="earning_detail_grid_content">{earning.date}</div>
				<div className="earning_detail_grid_content">{earning.type}</div>
				<div
					className="earning_detail_grid_content_check"
					onClick={() => dispatch(openModal())}>
					명세서 확인
				</div>
				<div className="earning_detail_grid_content_amount">
					{earning.amount.toLocaleString()}원
				</div>
			</div>
		</div>
	);
}

export default EarningDetails;
