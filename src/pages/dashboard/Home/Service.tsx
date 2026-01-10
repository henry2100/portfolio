import React from "react";
import {servicesData} from "../../../mockData/servicesData";
import ServiceCard from "../../../components/molecules/ServiceCard";

const Service = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-8 justify-start items-center">
      <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
        These are my skills
      </span>

      <div className="grid grid-cols-2 mobile:grid-cols-1 auto-rows-auto items-start gap-10 w-full">
        {servicesData.map((item, index) => (
            <ServiceCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Service;
