import EarningDetails from './EarningDetails';
import ArrowLeft from '../assets/arrow_left.png';
import ArrowRight from '../assets/arrow_right.png';
import EarningType from './EarningType';

function EarningCheck({ setIsModalOpen }) {
	return (
		<>
			<div className="earningCheck">
				<div className="earningCheck__inner">
					<div className="earningCheck__inner_title">5월 수익</div>
					<div className="earningCheck__inner_sub">총 1,100,000원</div>
					<div className="earningCheck__inner_contentsBox">
						<div className="earningCheck__inner_contentsBox_contents">
							<EarningDetails />
							<EarningDetails />
							<EarningDetails />
							<EarningDetails />
							<EarningDetails />
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
