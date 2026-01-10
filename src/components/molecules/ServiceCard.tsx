import React, { useState } from "react";
import PageHeader from "./PageHeader";

interface ServiceCardProps {
  service: string;
  serviceIcon: React.ElementType;
  description: string;
  overview: string[];
}

const ServiceCard = ({
  service,
  serviceIcon: ServiceIcon,
  description,
  overview,
}: ServiceCardProps) => {
  const [showLayer, setShowLayer] = useState(false);

  const serviceHeader = ({
    btnText,
    onClick,
  }: {
    btnText: string;
    onClick: () => void;
  }) => (
    <PageHeader
      pageTitle={service}
      pageTitleStyle="text-lg !text-Secondary group-hover:!text-Primary mobile:text-base"
      headerLayout="!pb-0 w-full"
      headerBtn={onClick}
      headerBtnText={btnText}
      headerBtnStyle="whitespace-nowrap border-2 border-Primary text-white px-4 py-2 rounded-full hover:!bg-Primary_Accents_lg transition duration-300 text-sm"
    />
  );

  return (
    <div className="group overflow-hidden relative z-10 w-full h-auto flex flex-col px-5 py-8 gap-8 rounded-lg border border-Secondary hover:border-Primary transition duration-300">
      {serviceHeader({
        btnText: showLayer ? "Close" : "What it covers",
        onClick: () => setShowLayer((prevState) => !prevState),
      })}

      <div className="flex items-center gap-5">
        <ServiceIcon className="mobile:absolute z-[8] w-36 h-36 mobile:w-56 mobile:h-56 top-5 -right-10 stroke-Secondary mobile:!stroke-Secondary/20 group-hover:stroke-Primary flex-shrink-0" />
        <p className="text-2xl mobile:text-xl text-Secondary text-left">{description}</p>
      </div>

      {showLayer && (
        <div className="relative z-[15] top-0 left-0 w-full flex flex-col gap-2 p-5 animate-slide_down">
          {overview.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="font-bold text-Primary">{`${index + 1}.`}</span>
              <p className="text-Secondary text-left">{point}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
