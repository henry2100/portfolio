import React from 'react';
import { connect } from 'react-redux';

interface FormTextAreaProps {
    label?: string;
    labelStyle?: string;
    darkMode: boolean;
    layoutStyle?: string;
    inputContainerStyle?: string;
    inputStyle?: string;
    inputStyle2?: string;
    name: string;
    placeholder?: string;
    rows?: number;
    cols?: number;
    required?: boolean;
    disabled?: boolean;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    img?: string;
    imgStyle?: string;
    imgOnClick?: () => void;
    icon?: React.ReactNode;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
    label,
    labelStyle,
    darkMode,
    layoutStyle,
    inputContainerStyle,
    inputStyle,
    inputStyle2,
    name,
    placeholder,
    rows,
    cols,
    required = false,
    disabled = false,
    value,
    onChange,
    img,
    imgStyle,
    imgOnClick,
    icon
}) => {
    return (
        <div className={`${layoutStyle} flex flex-col`}>
            {label && (
                <label className={`${labelStyle} ${darkMode ? 'text-Primary' : 'text-PrimaryActive'} mb-2`}>
                    {label}
                </label>
            )}

            <div className={`${inputContainerStyle} flex`}>
                <div
                    className={`flex ${inputStyle} ${
                        darkMode ? 'bg-Primary_600 !border-none text-Primary_200' : 'bg-white'
                    } items-start rounded-md overflow-hidden relative`}
                >
                    {value === '' && img && (
                        <img
                            src={img}
                            alt="icon"
                            className={`${imgStyle} absolute right-5 top-4`}
                            onClick={imgOnClick}
                        />
                    )}
                    {value === '' && icon && <span className="absolute right-5 top-4">{icon}</span>}

                    <textarea
                        name={name}
                        placeholder={placeholder}
                        rows={rows}
                        cols={cols}
                        required={required}
                        disabled={disabled}
                        onChange={onChange}
                        className={`${inputStyle2} w-full bg-NoColor focus:outline-none py-2 pr-2 pl-4 text-justify`}
                        value={value}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: { app: { darkMode: boolean } }) => ({
    darkMode: state.app.darkMode,
});

export default connect(mapStateToProps)(FormTextArea);
