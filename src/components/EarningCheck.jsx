import EarningDetails from './EarningDetails';
import ArrowLeft from '../assets/arrow_left.png';
import ArrowRight from '../assets/arrow_right.png';
import EarningType from './EarningType';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/earningsSlice';

function EarningCheck({}) {
	const earnings = useSelector(state => state.earnings.earnings);
	const totalEarnings = earnings.reduce(
		(sum, earning) => sum + earning.amount,
		0
	);

	const dispatch = useDispatch();
	const currentPage = useSelector(state => state.earnings.currentPage);
	const itemsPerPage = 5;
	const totalPages = Math.ceil(earnings.length / itemsPerPage);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			dispatch(setCurrentPage(currentPage - 1));
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setCurrentPage(currentPage + 1));
		}
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const selectedEarning = earnings.slice(startIndex, startIndex + itemsPerPage);

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
							{selectedEarning.map((earning, index) => (
								<EarningDetails key={index} earning={earning} />
							))}
						</div>
						<div className="earningCheck__inner_contentsBox_arrow">
							<img src={ArrowLeft} alt="ArrowLeft" onClick={handlePrevPage} />
							<img src={ArrowRight} alt="ArrowRight" onClick={handleNextPage} />
						</div>
					</div>
				</div>
				<div className="earningCheck__inner">
					<div className="earningCheck__inner_title">5월 수익</div>
					<div className="earningCheck__inner_sub">종류별 내역</div>
					<div className="earningCheck__inner_contentsBox">
						<div className="earningCheck__inner_contentsBox_contents">
							<EarningType />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EarningCheck;
