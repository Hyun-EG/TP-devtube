import Header from '../components/Header';
import Sidebar from '../components/SideBar';

export function Home() {
	return (
		<>
			<Header />
			<Sidebar />
			<div className="home">
				<div className="header">
					<span className="board-title">대시보드</span>
				</div>
				<div className="board-wrapper">
					<div className="first-line">
						<div className="impormation-channel-area">
							<div className="__content-title">
								<span>채널 정보</span>
								<button className="edit-btn">수정</button>
							</div>
							<div className="__content">
								<span>크리에이터 이름</span>
								<span>홍길동</span>
							</div>
							<div className="__content">
								<span>채널 이름</span>
								<span>Honggil log</span>
							</div>
							<div className="__content">
								<span>이메일</span>
								<span>adwqdqff@email.com</span>
							</div>
							<div className="__content">
								<span>구독자 수</span>
								<span>10,000명</span>
							</div>
							<div className="__content">
								<span>조회수</span>
								<span>365만</span>
							</div>
						</div>
						<div className="shorts-area">
							<div className="__content-title">
								<span>최신영상</span>
							</div>
							<div className="video"></div>
						</div>
					</div>

					<div className="schedule-area">
						<div className="__title">
							<span>이번 주의 스케줄</span>
							<div>
								<button className="__btn"> ◁ </button>
								<button className="__btn"> ▷ </button>
							</div>
						</div>
						<div className="schedule"></div>
					</div>
				</div>
			</div>
		</>
	);
}
