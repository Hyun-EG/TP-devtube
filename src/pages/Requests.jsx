import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';
import RequestModal from '../components/RequestModal';

function Requests() {
	const [reload, setReload] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleFormSubmit = () => {
    setReload(prev => !prev);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
	};

  useEffect(() => {
		const modalEl = document.querySelector('.request_modal');
		if (modalEl) {
			if (isModalOpen) {
				document.querySelector('.request_modal').classList.add('modal-open');
			} else {
				document.querySelector('.request_modal').classList.remove('modal-open');
			}
		}
	}, [isModalOpen]);

	return (
    <>
      <Header />
      <Sidebar />
      <div className="requests">
        <div className="requests__title">수익 정정 신청</div>
        <RequestForm onFormSubmit={handleFormSubmit} />
        <div className="requests__title">신청 내역</div>
        <RequestList reload={reload} onEditClick={handleEditClick} />
        {isModalOpen && (
          <RequestModal
            onClose={handleCloseModal}
            onFormSubmit={handleFormSubmit}
            initialData={selectedEvent}
          />
        )}
      </div>
    </>
	);
}

export default Requests;
