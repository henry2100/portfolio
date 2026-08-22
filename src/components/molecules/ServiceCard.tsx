import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.2, delay: 0.1 },
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.15 },
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <motion.div
      className="group overflow-hidden relative z-10 w-full h-auto flex flex-col px-5 mobile:px-4 py-8 mobile:py-6 gap-8 mobile:gap-6 rounded-lg border border-Secondary hover:border-Primary transition-colors duration-300"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {serviceHeader({
        btnText: showLayer ? "Close" : "What it covers",
        onClick: () => setShowLayer((prevState) => !prevState),
      })}

      <div className="flex items-center gap-5">
        <motion.div
          animate={{ rotate: showLayer ? 360 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <ServiceIcon className="mobile:absolute z-[8] w-36 h-36 mobile:w-24 mobile:h-24 mobile:top-3 mobile:right-3 top-5 -right-10 stroke-Secondary mobile:!stroke-Secondary/30 group-hover:stroke-Primary flex-shrink-0 transition-colors duration-300" />
        </motion.div>
        <p className="text-2xl mobile:text-lg text-Secondary text-left">{description}</p>
      </div>

      <AnimatePresence>
        {showLayer && (
          <motion.div
            className="relative z-[15] w-full flex flex-col gap-2 p-5 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {overview.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                variants={itemVariants}
              >
                <span className="font-bold text-Primary">{`${index + 1}.`}</span>
                <p className="text-Secondary text-left">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServiceCard;
