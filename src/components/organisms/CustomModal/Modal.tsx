import React from 'react';
import { FiX } from "react-icons/fi";

import closeIcon from '../../../assets/svg/close-circle-solid.svg';

type Props = {
    isOpen: boolean,
    children: JSX.Element,
    modalStyle: String,
    contentStyle?: String,
    closeBtnStyle?: string,
    onClose: () => void
}

const Modal: React.FC<Props> = ({ isOpen, children, modalStyle, contentStyle, closeBtnStyle, onClose }) => {

    return (
        <div className={`${modalStyle} fixed`}>
            <div className={`${contentStyle} relative z-30 overflow-y-scroll custom_container`}>
                {onClose === undefined
                    ? null
                    : <FiX
                        className={`${closeBtnStyle} absolute right-3 top-3 cursor-pointer w-6 h-6 transition ease-in-out duration-250`}
                        onClick={onClose}
                    />}
                {children}
            </div>
        </div>
    )
}

export default Modal;