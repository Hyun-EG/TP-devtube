function EarningDetails({ setIsModalOpen }) {
	return (
		<div className="earning_detail">
			<div className="earning_detail_grid">
				<div className="earning_detail_grid_content">2024.05.30</div>
				<div className="earning_detail_grid_content">광고</div>
				<div
					className="earning_detail_grid_content_check"
					onClick={() => setIsModalOpen(true)}>
					명세서 확인
				</div>
				<div className="earning_detail_grid_content_amount">3,000,000원</div>
			</div>
		</div>
	);
}

export default EarningDetails;
