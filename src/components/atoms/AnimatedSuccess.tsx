import React from "react";

interface SuccessStateProps {
  title?: String;
  desc?: String;
  onSendAnother: () => void;
}

const SuccessState = ({ title, desc, onSendAnother }: SuccessStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[40vh] gap-4 animate-fade_in">
      <div className="w-16 h-16 rounded-full bg-Primary flex items-center justify-center animate-pop">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-Primary">
        {title}
      </h3>

      <p className="text-sm text-GrayCustom text-center">
        {desc}
      </p>

      <button
        onClick={onSendAnother}
        className="mt-4 px-6 py-2 rounded-md border border-Primary text-Primary hover:bg-Primary hover:text-white transition duration-300"
      >
        Send another message
      </button>
    </div>
  );
};

export default SuccessState;
