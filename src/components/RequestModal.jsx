import React, { useEffect, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';

function RequestModal({ onClose, onFormSubmit, initialData }) {
  const [requestDate, setRequestDate] = useState(initialData.requestDate || "");
  const [reason, setReason] = useState(initialData.reason || "");
  const [videoId, setVideoId] = useState(initialData.videoId || "");
  const [accountMonth, setAccountMonth] = useState(initialData.accountMonth || "");
  const [content, setContent] = useState(initialData.content || "");
  const { updateDocument, response } = useFirestore('request');

  useEffect(() => {
    if (response.success) {
      onFormSubmit();
      onClose();
    }
  }, [response.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = localStorage.getItem('email');
    if (!email) {
      console.error("No email found in localStorage");
      return;
    }
    updateDocument(initialData.id, { requestDate, reason, videoId, accountMonth, content, email });
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="request_modal">
        <form onSubmit={handleSubmit} className="requests_modal_wrapper">

          <div className="request_modal_contents">
            <div className="item">
              <span className="input_title">신청 날짜 *</span>
              <input className="input_box"
                type="date" 
                id="date" 
                value={requestDate} 
                onChange={handleInputChange(setRequestDate)}
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
                required 
              />
            </div>
          </div>

          <div className="request_modal_contents">
            <div className="item">
              <span className="input_title">관련 영상 ID</span>
              <input className="input_box"
                type="text" 
                id="videoId" 
                value={videoId} 
                onChange={handleInputChange(setVideoId)}
              />
            </div>
            <div className="item">
              <span className="input_title">정산 기간 (월)</span>
              <input className="input_box"
                type="month" 
                id="month" 
                value={accountMonth} 
                onChange={handleInputChange(setAccountMonth)}
              />
            </div>
          </div>
          
          <div className="request_modal_contents">
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
          <div className="request_modal_contents">
          <span className="request_modal_close" onClick={onClose}>&times;</span>
            <button className="btn_submit" type="submit">수정하기</button>
          </div>
        </form>
      
    </div>
  );
}

export default RequestModal;
