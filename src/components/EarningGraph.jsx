import RectangleBlue from '../assets/rectangle_blue.png';
import RectangleGray from '../assets/rectangle_gray.png';

function EarningGraph() {
	return (
		<>
			<div className="graph">
				<div className="graph__inner">
					<div className="graph__inner_box">
						<img src={RectangleBlue} alt="RectangleBlue" />
						<span className="graph__inner_box_name">수익</span>
						<img src={RectangleGray} alt="RectangleGray" />
						<span className="graph__inner_box_name">조회수</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default EarningGraph;
