import RectangleRed from '../assets/rectangle_red.png';
import RectangleLightblue from '../assets/rectangle_lightblue.png';

import Graph from './Graph';

function EarningGraph() {
	return (
		<>
			<div className="graph">
				<div className="graph__inner">
					<div className="graph__inner_box">
						<img src={RectangleRed} alt="RectangleRed" />
						<span className="graph__inner_box_name">수익</span>
						<img src={RectangleLightblue} alt="RectangleLightblue" />
						<span className="graph__inner_box_name">조회수</span>
					</div>
				</div>
				<Graph />
			</div>
		</>
	);
}

export default EarningGraph;
