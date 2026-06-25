import React from "react";
import {servicesData} from "../../../mockData/servicesData";
import ServiceCard from "../../../components/molecules/ServiceCard";
import { FadeUp, StaggerContainer, StaggerItem } from "components/atoms/MotionWrapper";

const Service = () => {
  return (
    <div className="max-w-6xl w-full mobile:!p-5 tablet:p-8 flex flex-col gap-8 justify-start items-center">
      <FadeUp>
        <span className="text-left mobile:text-center font-bold text-5xl mobile:text-3xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase">
          Services I Offer
        </span>
      </FadeUp>

      <StaggerContainer
        className="grid grid-cols-2 mobile:grid-cols-1 auto-rows-auto items-start gap-10 w-full"
        staggerDelay={0.12}
      >
        {servicesData.map((item, index) => (
          <StaggerItem key={index}>
            <ServiceCard {...item} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default Service;
