import EarningEmpty from '../assets/earning_empty.png';

function EarningsEmpty() {
	return (
		<>
			<div className="earnings">
				<div className="earnings__title">수익 내역</div>
				<div className="earnings__empty">
					<img
						className="earnings__empty_img"
						src={EarningEmpty}
						alt="EarningEmpty"
					/>
					<div className="earnings__empty_bigFont">수익 내역이 없습니다.</div>
					<div className="earnings__empty_smallFont">영상을 올려보세요.</div>
				</div>
			</div>
		</>
	);
}

export default EarningsEmpty;
