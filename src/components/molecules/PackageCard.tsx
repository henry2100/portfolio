import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ArrowUpRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import PageHeader from "./PageHeader";

interface PackageCardProps {
  name: string;
  icon: React.ElementType;
  priceRange: string;
  description?: string;
  note?: string;
  includes: string[];
  idealFor: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({
  name,
  icon: Icon,
  priceRange,
  description,
  note,
  includes,
  idealFor,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleIncludes = showAll ? includes : includes.slice(0, 5);
  const extraCount = includes.length - 5;

  return (
    <motion.div
      className="group relative w-full h-full flex flex-col gap-4 p-6 mobile:p-5 rounded-lg border border-Secondary hover:border-Primary bg-DarkBg2 overflow-hidden transition-colors duration-300"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="absolute -right-6 -top-6 w-28 h-28 text-Primary/10 group-hover:text-Primary/20 transition-colors duration-500 pointer-events-none" />

      <PageHeader
        pageTitle={name}
        pageTitleStyle="!text-2xl mobile:!text-xl !text-Secondary group-hover:!text-Primary"
        headerLayout="!pb-0 w-full"
      />

      <span className="font-[800] text-2xl mobile:text-xl text-Primary leading-tight">
        {priceRange}
      </span>

      {description && (
        <p className="text-sm mobile:text-xs text-Secondary text-left leading-relaxed">
          {description}
        </p>
      )}

      <div className="w-full border-t border-Secondary/30 pt-3 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-GrayCustom font-medium">
          What's Included
        </span>
        <ul className="flex flex-col gap-1.5">
          {visibleIncludes.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm mobile:text-xs text-Secondary text-left"
            >
              <Check className="w-4 h-4 text-Primary mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {extraCount > 0 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="w-fit flex items-center gap-1.5 text-xs text-Primary hover:underline cursor-pointer"
          >
            {showAll ? "Show less" : `+${extraCount} more`}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {note && (
        <p className="text-xs mobile:text-[11px] text-GrayCustom text-left leading-relaxed">
          {note}
        </p>
      )}

      <div className="w-full border-t border-Secondary/30 pt-3 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-GrayCustom font-medium">
          Ideal For
        </span>
        <div className="flex flex-wrap gap-2">
          {idealFor.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full border border-Primary/40 text-xs text-GrayCustom bg-Primary_Accents_2xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ScrollLink
        to="Contact"
        spy={true}
        smooth={true}
        offset={0}
        duration={1500}
        className="mt-auto cursor-pointer"
      >
        <span className="inline-flex items-center gap-2 mt-1 border-2 border-Primary text-Primary group-hover:text-white group-hover:bg-Primary px-4 py-2 rounded-full transition duration-300 text-sm">
          Get a Quote
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </ScrollLink>
    </motion.div>
  );
};

export default PackageCard;
