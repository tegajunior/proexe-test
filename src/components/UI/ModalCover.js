import React from 'react';
import './ModalCover.css';

const ModalCover = (props) => {
  return <div className="modal-overlay">{props.children}</div>;
};

export default ModalCover;
