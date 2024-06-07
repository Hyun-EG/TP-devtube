import noData from '../assets/no_data.png';
import Loading from './Loading';

function RequestList() {
	return (
		<>
			<div className="requests">
				<div className="header">
					<h1 className="board_title">신청 내역</h1>
				</div>

				<div className="contents">
					<input className="btn_delete" type="button" value="선택 삭제" />
				</div>
				<div className="requests_list">
					<div className="contents">
						<div className="item">
							<img src={noData} alt="no data" />
						</div>
						<div className="item">
							<span className="text">신청 내역이 없습니다.</span>
							<p>정정 신청 해보세요.</p>
						</div>
					</div>
					<Loading />
				</div>
			</div>
		</>
	);
}

export default RequestList;
