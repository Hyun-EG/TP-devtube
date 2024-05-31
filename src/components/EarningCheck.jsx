import EarningDetails from './EarningDetails';
import ArrowLeft from '../assets/arrow_left.png';
import ArrowRight from '../assets/arrow_right.png';
import EarningType from './EarningType';
import { useSelector } from 'react-redux';

function EarningCheck({}) {
	const earnings = useSelector(state => state.earnings.earnings);
	const totalEarnings = earnings.reduce(
		(sum, earning) => sum + earning.amount,
		0
	);

	return (
		<>
			<div className="earningCheck">
				<div className="earningCheck__inner">
					<div className="earningCheck__inner_title">5월 수익</div>
					<div className="earningCheck__inner_sub">
						총 {totalEarnings.toLocaleString()}원
					</div>
					<div className="earningCheck__inner_contentsBox">
						<div className="earningCheck__inner_contentsBox_contents">
							{earnings.map((earning, index) => (
								<EarningDetails key={index} earning={earning} />
							))}
						</div>
						<div className="earningCheck__inner_contentsBox_arrow">
							<img src={ArrowLeft} alt="ArrowLeft" />
							<img src={ArrowRight} alt="ArrowRight" />
						</div>
					</div>
				</div>
				<div className="earningCheck__inner">
					<div className="earningCheck__inner_title">5월 수익</div>
					<div className="earningCheck__inner_sub">종류별 내역</div>
					<div className="earningCheck__inner_contentsBox">
						<div className="earningCheck__inner_contentsBox_contents">
							<EarningType />
							<EarningType />
							<EarningType />
							<EarningType />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EarningCheck;
