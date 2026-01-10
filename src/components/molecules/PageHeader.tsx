import React from "react";
import Button from "../atoms/Button";

interface PageHeaderProps {
  pageTitle: string;
  pageDesc?: string;
  pageTitleStyle?: string;
  pageDescStyle?: string;
  titleStyle?: string;
  headerLayout?: string;
  headerBtn?: (e?: any) => void;
  headerBtnText?: string;
  headerBtnIcon?: React.ElementType;
  headerBtnStyle?: string;
  headerBtnIconStyle?: string;
  hyperLinkBtn?: string;
}

const PageHeader = ({
  pageTitle,
  pageDesc,
  pageTitleStyle,
  pageDescStyle,
  titleStyle,
  headerLayout,
  headerBtn,
  headerBtnText,
  headerBtnIcon,
  headerBtnStyle,
  headerBtnIconStyle,
  hyperLinkBtn,
}: PageHeaderProps) => {
  return (
    <div
      className={`${headerLayout} h-fit pb-2 flex mobile:flex-col items-start justify-between mobile:justify-center mobile:items-center gap-5`}
    >
      <span
        className={`${titleStyle} mobile:w-full max-w-6xl w-full flex flex-col items-start justify-start mobile:items-center mobile:justify-center mobile:gap-0 text-left`}
      >
        <p
          className={`${pageTitleStyle} font-[800] text-6xl mobile:text-3xl text-Primary`}
        >
          {pageTitle}
        </p>
        <p
          className={`${pageDescStyle} font-normal text-base mobile:text-base text-Secondary`}
        >
          {pageDesc}
        </p>
        <span className="border-b border-Primary min-w-[200px] w-1/5 mt-1"></span>
      </span>

      {headerBtn && (
        <Button
          btnType="button"
          btnText={headerBtnText}
          btnIcon={headerBtnIcon}
          // btnIconStyle={`${headerBtnIconStyle} group-hover:!stroke-white`}
          btnStyle={`${headerBtnStyle} hover:!bg-softBlack hover:!text-white`}
          handleClick={headerBtn}
        />
      )}

      {hyperLinkBtn && (
        <a
          target="_blank"
          href={hyperLinkBtn}
          className={`${headerBtnStyle} hover:!bg-softBlack hover:!text-white underline-none text-center whitespace-nowrap`}
        >
          {headerBtnText}
        </a>
      )}
    </div>
  );
};

export default PageHeader;
