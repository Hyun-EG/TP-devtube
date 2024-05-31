import { useSelector } from 'react-redux';
import EarningCheck from '../components/EarningCheck';
import EarningGraph from '../components/EarningGraph';
import EarningModal from '../components/EarningModal';

function EarningsPage() {
	const isModalOpen = useSelector(state => state.earnings.isModalOpen);

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
