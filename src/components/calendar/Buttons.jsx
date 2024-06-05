import React from 'react';
import '../../styles/components/calendar/_eventModal.scss';

const Buttons = ({ onSave, onCancel, onDelete, showDelete }) => (
	<div className="button-group-container">
		<button className="button save" type="button" onClick={onSave}>
			저장
		</button>
		<button className="button cancel" type="button" onClick={onCancel}>
			취소
		</button>
		{showDelete && (
			<button className="button delete" type="button" onClick={onDelete}>
				삭제
			</button>
		)}
	</div>
);

export default Buttons;
