import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/reduxlSlice';

function EarningModal({ isOpen }) {
	const dispatch = useDispatch();

	if (!isOpen) return null;

	return (
		<div className="earning_modal">
			<div className="earning_modal_title">수익명세서</div>
			<div className="earning_modal_inner">
				<div className="earning_modal_inner_subtitle">
					<div className="earning_modal_inner_subtitle_content">지급 날짜</div>
					<div className="earning_modal_inner_subtitle_detail">2024.05.30</div>
				</div>
				<div className="earning_modal_inner_subtitle">
					<div className="earning_modal_inner_subtitle_content">수익 종류</div>
					<div className="earning_modal_inner_subtitle_detail">광고</div>
				</div>
			</div>
			<div className="earning_modal_total">
				<div className="earning_modal_total_content">지급 총액</div>
				<div className="earning_modal_total_content">3,000,000원</div>
			</div>
			<div
				className="earning_modal_button"
				onClick={() => dispatch(closeModal())}>
				<div className="earning_modal_button_content">확인</div>
			</div>
		</div>
	);
}

export default EarningModal;
