import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import noData from '../assets/no_data.png';

function Requests() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="requests">
        
        <div className="header">
          <h1 className="board_title">수익 정정 신청</h1>
        </div>

        <div className="requests_wrapper">

          <div className="contents">
            <div className="item">
              <span className="input_title">신청 날짜 *</span>
              <input className="input_box"
                type="date" 
                id="date" 
                data-placeholder="날짜를 선택해주세요" 
                required
              />
            </div>

            <div className="item">
              <span className="input_title">사유 *</span>
              <input className="input_box"
                type="text" 
                id="reason" 
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
                id="videoID" 
                placeholder="영상 ID를 입력해주세요" 
              />
            </div>

            <div className="item">
              <span className="input_title">정산 기간 (월)</span>
              <input className="input_box"
                type="month" 
                id="month" 
                placeholder="정산 기간을 선택해주세요" 
              />
            </div>
          </div>

          <div className="contents">
            <div className="item--detail">
              <span className="input_title">신청 내용</span>
              <input className="input_box"
                type="text" 
                id="content" 
                placeholder="설명을 입력해주세요 (최대 300자)" 
                maxLength="300" 
              />
              </div>
          </div>

          <div className="contents">
            <input className="btn_submit"
              type="button" 
              value="신청하기"
            />
          </div>
        </div>
      </div>

      <div className="requests">

        <div className="header">
          <h1 className="board_title">신청 내역</h1>
        </div>
        
        <div className="contents">
          <input className="btn_delete"
            type="button" 
            value="선택 삭제"
          />
        </div>
        <div className="requests_list">
          <div className="contents">
            <div className="item">
              <img src={ noData } alt="no data" />
            </div>
            <div className="item">
              <span className="text">신청 내역이 없습니다.</span>
              <p>정정 신청 해보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Requests;





