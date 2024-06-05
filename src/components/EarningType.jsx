import { useSelector } from 'react-redux';

function EarningType() {
	const earnings = useSelector(state => state.earnings.earnings);

	const earningsType = earnings.reduce((acc, earning) => {
		if (!acc[earning.type]) {
			acc[earning.type] = 0;
		}
		acc[earning.type] += earning.amount;
		return acc;
	}, {});

	return (
		<>
			{Object.keys(earningsType).map(type => (
				<div className="earning_type" key={type}>
					<div className="earning_type_box">
						<div className="earning_type_box_content">{type}</div>
						<div className="earning_type_box_content">
							{earningsType[type].toLocaleString()}원
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default EarningType;
