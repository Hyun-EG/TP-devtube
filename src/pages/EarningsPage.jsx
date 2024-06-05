import { useSelector } from 'react-redux';
import EarningCheck from '../components/EarningCheck';
import EarningGraph from '../components/EarningGraph';
import EarningModal from '../components/EarningModal';
import { useEffect } from 'react';

function EarningsPage() {
	const isModalOpen = useSelector(state => state.earnings.isModalOpen);

	useEffect(() => {
		const modalEl = document.querySelector('.earning_modal');
		if (modalEl) {
			if (isModalOpen) {
				document.querySelector('.earning_modal').classList.add('modal-open');
			} else {
				document.querySelector('.earning_modal').classList.remove('modal-open');
			}
		}
	}, [isModalOpen]);

	return (
		<>
			<div className="earnings">
				<div className="earnings__title">수익 내역</div>
				<EarningGraph />
				<EarningCheck />
				<EarningModal isOpen={isModalOpen} />
			</div>
		</>
	);
}

export default EarningsPage;
