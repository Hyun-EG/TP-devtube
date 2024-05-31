import { useEffect, useState } from 'react';
import EarningCheck from '../components/EarningCheck';
import EarningGraph from '../components/EarningGraph';
import EarningModal from '../components/EarningModal';

function EarningsPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div className="earnings">
				<div className="earnings__title">수익 내역</div>
				<EarningGraph />
				<EarningCheck setIsModalOpen={setIsModalOpen} />
				<EarningModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
		</>
	);
}

export default EarningsPage;
