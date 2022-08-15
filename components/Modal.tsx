import { X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledModalBody = styled.div`
	padding-top: 10px;
	flex: 1 0 auto;
`;

const StyledModal = styled.div`
	background-color: ${(props) => props.theme.colors.gray70};
	display: flex;
	width: 330px;
	border-radius: 20px;
	flex-direction: column;

	.modal-header {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 24px;
		height: 72px;

		.modal-header-title {
			display: flex;
			color: white;
			font-weight: 700;
			font-size: 24px;
		}

		.modal-close-button {
			position: absolute;
			right: 24px;
		}
	}
`;

const StyledModalOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 99;
	display: flex;
	background: rgba(0,0,0, 0.38);
	justify-content: center;
	align-items: center;
`;

interface ModalProps {
	show: boolean;
	onBack: () => void;
	children: React.ReactNode;
	title: string;
}

function Modal({ show, onBack, children, title }: ModalProps) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleBack = () => {
		onBack();
	};

	const modalContent = show ? (
		(<StyledModalOverlay>
			<StyledModal>
				<div className="modal-header">
					<span className="modal-header-title">{title}</span>
					<X className="modal-close-button" size={24} color="#FFFFFF" onClick={handleBack} />
				</div>
				{children}
			</StyledModal>
		</StyledModalOverlay>)
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById("modal-root") as HTMLElement
		);
	} else {
		return null;
	}
}

export default Modal;
