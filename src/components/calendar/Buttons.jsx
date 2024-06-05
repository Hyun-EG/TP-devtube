import React from 'react';
import styled from 'styled-components';

const ButtonGroupContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 1rem;
`;

const Button = styled.button`
	width: 110.5px;
	padding: 0.5rem 1rem;
	font-size: 1rem;
	cursor: pointer;
	border: none;
	border-radius: 5px;

	&.save {
		background-color: #065fd4;
		color: white;
	}

	&.cancel {
		background-color: #fafafa;
		border: 1px solid #d9d9d9;
		color: #6d6f71;
	}

	&.delete {
		background-color: #faf2f2;
		border: 1px solid #ff6666;
		color: #ff6666;
	}
`;

const Buttons = ({ onSave, onCancel, onDelete, showDelete }) => (
	<ButtonGroupContainer>
		<Button className="save" type="button" onClick={onSave}>
			저장
		</Button>
		<Button className="cancel" type="button" onClick={onCancel}>
			취소
		</Button>
		{showDelete && (
			<Button className="delete" type="button" onClick={onDelete}>
				삭제
			</Button>
		)}
	</ButtonGroupContainer>
);

export default Buttons;
