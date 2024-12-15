import React from 'react'

type Props = {
    btnType: 'button' | 'submit' | 'reset' | undefined;
    btnStyle?: string;
    btnText?: any;
    btnIcon?: any;
    btnImg?: string;
    btnImgStyle?: string;
    disableBtn?: boolean;
    disableBtnStyle?: string;
    handleClick?: (e?:any) => void;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button
            type={props.btnType}
            onClick={props.handleClick}
            className={`${props.btnStyle} ${props.disableBtn && props.disableBtnStyle} flex justify-center items-center text-center gap-2`}
            disabled={props.disableBtn}
        >
            {props.btnText}
            {props.btnImg 
                ?   <img src={props.btnImg} alt='btn_icon' className={`${props.btnImgStyle} w-4 h-4`}/>
                :   props.btnIcon 
                    ?   props.btnIcon
                    :   null
            }
        </button>
    )
}

export default Button