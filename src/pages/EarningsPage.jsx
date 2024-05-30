import EarningCheck from '../components/EarningCheck';
import EarningGraph from '../components/EarningGraph';

function EarningsPage() {
	return (
		<>
			<div className="earnings">
				<div className="earnings__title">수익 내역</div>
				<EarningGraph />
				<EarningCheck />
			</div>
		</>
	);
}

export default EarningsPage;
