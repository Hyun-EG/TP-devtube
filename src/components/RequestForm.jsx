import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

export default function RequestForm() {

  const [requestDate, setRequestDate] = useState(""); // 신청 날짜
  const [reason, setReason] = useState(""); // 신청 사유
  const [videoId, setVideoId] = useState(""); // 영상 ID
  const [accountMonth, setAccountMonth] = useState(""); // 정산 기간??
  const [content, setContent] = useState(""); // 신청 내용
  const { addDocument, response } = useFirestore('request');

  const handleData = (event) => {
    if (event.target.id === 'date'){
      setRequestDate(event.target.value);
    } else if (event.target.id === 'reason') {
      setReason(event.target.value);
    } else if (event.target.id === 'videoId') {
      setVideoId(event.target.value);
    } else if (event.target.id === 'month') {
      setAccountMonth(event.target.value);
    } else if (event.target.id === 'cont') {
      setContent(event.target.value);
    }
  }

  useEffect(() => {
    if (response.success) {
      setRequestDate('');
      setReason('');
      setVideoId('');
      setAccountMonth('');
    }
  }, [response.success])

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(requestDate, reason, videoId, accountMonth, content);
    addDocument({ requestDate, reason, videoId, accountMonth, content }); // 이 브랜치에 로그인 기능 없어서 uid 제외함
  }

  return (
    <>
      <div className="requests">
        <div className="header">
          <h1 className="board_title">수익 정정 신청</h1>
        </div>
        <form onSubmit={handleSubmit} className="requests_wrapper">
        
          <div className="contents">
            <div className="item">
              <span className="input_title">신청 날짜 *</span>
              <input className="input_box"
                type="date" 
                id="date" 
                value={requestDate} onChange={handleData}
                data-placeholder="날짜를 선택해주세요" 
                required 
              />
            </div>

            <div className="item">
              <span className="input_title">사유 *</span>
              <input className="input_box"
                type="text" 
                id="reason" 
                value={reason} onChange={handleData}
                placeholder="사유를 선택해주세요" 
                required 
              />
            </div>
          </div>

          
          <div className="contents">
            <div className="item">
              <span className="input_title">관련 영상 ID</span>
              <input className="input_box"
                type="text" 
                id="videoId" 
                value={videoId} onChange={handleData} 
                placeholder="영상 ID를 입력해주세요" 
              />
            </div>

            <div className="item">
              <span className="input_title">정산 기간 (월)</span>
              <input className="input_box"
                type="month" 
                id="month" 
                value={accountMonth} onChange={handleData} 
                placeholder="정산 기간을 선택해주세요" 
              />
            </div>
          </div>

          <div className="contents">
            <div className="item--detail">
              <span className="input_title">신청 내용</span>
              <input className="input_box"
                type="text" 
                id="cont" 
                value={content} onChange={handleData} 
                maxLength="300" 
                placeholder="설명을 입력해주세요 (최대 300자)" 
                
              />
              </div>
          </div>

          <div className="contents">
            <button className="btn_submit" type="submit">신청하기</button>
          </div>
          
        </form>
      </div>
    </>
  )
}