import { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';

export default function RequestForm() {

  const [requestDate, setRequestDate] = useState(""); // 신청 날짜
  const [reason, setReason] = useState(""); // 신청 사유
  const [videoId, setVideoId] = useState(""); // 영상 ID
  const [accountMonth, setAccountMonth] = useState(""); // 정산 기간??
  const [content, setContent] = useState(""); // 신청 내용
  const { addDocument, response } = useFirestore('request');

  useEffect(() => {
    if (response.success) {
      setRequestDate('');
      setReason('');
      setVideoId('');
      setAccountMonth('');
      setContent('');
    }
  }, [response.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(requestDate, reason, videoId, accountMonth, content);
    addDocument({ requestDate, reason, videoId, accountMonth, content });
  }

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="requests_wrapper">
        <div className="contents">
          <div className="item">
            <span className="input_title">신청 날짜 *</span>
            <input className="input_box"
              type="date" 
              id="date" 
              value={requestDate} 
              onChange={handleInputChange(setRequestDate)}
              data-placeholder="날짜를 선택해주세요" 
              required 
            />
          </div>
          <div className="item">
            <span className="input_title">사유 *</span>
            <input className="input_box"
              type="text" 
              id="reason" 
              value={reason} 
              onChange={handleInputChange(setReason)}
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
              value={videoId} 
              onChange={handleInputChange(setVideoId)}
              placeholder="영상 ID를 입력해주세요" 
            />
          </div>
          <div className="item">
            <span className="input_title">정산 기간 (월)</span>
            <input className="input_box"
              type="month" 
              id="month" 
              value={accountMonth} 
              onChange={handleInputChange(setAccountMonth)}
              placeholder="정산 기간을 선택해주세요" 
            />
          </div>
        </div>
        <div className="contents">
          <div className="item__detail">
            <span className="input_title">신청 내용</span>
            <input className="input_box"
              type="text" 
              id="cont" 
              value={content} 
              onChange={handleInputChange(setContent)}
              maxLength="300" 
              placeholder="설명을 입력해주세요 (최대 300자)" 
            />
          </div>
        </div>
        <div className="contents">
          <button className="btn_submit" type="submit">신청하기</button>
        </div>
      </form>
    </>
  )
}