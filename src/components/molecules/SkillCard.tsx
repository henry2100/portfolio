import React from "react";
import { motion } from "framer-motion";

interface SkillCardProps {
  title: string;
  proficiency?: string;
  description?: string;
  images?: string;
}

const levelWidth = (proficiency = "intermediate") => {
  switch (proficiency.toLowerCase()) {
    case "beginner":
      return "40%";
    case "advanced":
      return "85%";
    case "expert":
      return "100%";
    default:
      return "65%";
  }
};

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  proficiency = "intermediate",
  description,
  images,
}) => {
  const label = proficiency.charAt(0).toUpperCase() + proficiency.slice(1);

  return (
    <motion.div
      className="group relative w-full h-full flex flex-col gap-4 p-5 rounded-lg border hover:border-Primary transition-colors duration-300 overflow-hidden"
      style={{ borderColor: 'var(--site-card-border)', background: 'var(--site-card-bg)' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full flex items-center gap-3">
        {images && (
          <span className="w-11 h-11 flex justify-center items-center rounded-md bg-Primary_Accents_2xs border border-Primary/20 flex-shrink-0">
            <img src={images} alt={title} className="w-6 h-6 object-contain" />
          </span>
        )}
        <span className="font-semibold text-base mobile:text-sm group-hover:text-Primary transition-colors duration-300" style={{ color: 'var(--site-text-secondary)' }}>
          {title}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'color-mix(in srgb, var(--site-text-secondary) 20%, transparent)' }}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-Primary_Accents_md to-Primary"
            initial={{ width: 0 }}
            whileInView={{ width: levelWidth(proficiency) }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--site-text-gray)' }}>
          {label}
        </span>
      </div>

      {description && (
        <p className="text-xs mobile:text-[11px] leading-relaxed text-left" style={{ color: 'var(--site-text-gray)' }}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SkillCard;
