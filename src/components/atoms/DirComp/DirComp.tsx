import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface DirCardProps {
  itemIndex?: number;
  images?: string;
  imgStyle?: string;
  title?: string;
  titleStyle?: string;
  proficiency?: string;
  description?: string;
  wrapperStyle?: string;
  overlayStyle?: string;
  overlayContentLayout?: string;
  overlayDescriptionLayout?: string;
  children?: React.ReactNode;
  type?: "card" | "overlay";
}

type Edge = "left" | "right" | "top" | "bottom";

const DirComp: React.FC<DirCardProps> = ({
  itemIndex = 0,
  images,
  imgStyle,
  title,
  titleStyle,
  proficiency,
  description,
  wrapperStyle,
  overlayStyle,
  overlayContentLayout,
  overlayDescriptionLayout,
  children,
  type = "card",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [enterEdge, setEnterEdge] = useState<Edge>("top");

  // For 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const getEdgeFromPosition = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): Edge => {
    const topDist = mouseY;
    const bottomDist = height - mouseY;
    const leftDist = mouseX;
    const rightDist = width - mouseX;
    const min = Math.min(topDist, bottomDist, leftDist, rightDist);

    if (min === topDist) return "top";
    if (min === bottomDist) return "bottom";
    if (min === leftDist) return "left";
    return "right";
  };

  const getInitialPosition = (edge: Edge) => {
    switch (edge) {
      case "top": return { x: 0, y: -100 };
      case "bottom": return { x: 0, y: 100 };
      case "left": return { x: -100, y: 0 };
      case "right": return { x: 100, y: 0 };
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const edge = getEdgeFromPosition(mouseX, mouseY, rect.width, rect.height);
    setEnterEdge(edge);
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const edge = getEdgeFromPosition(mouseX, mouseY, rect.width, rect.height);
    setEnterEdge(edge);
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX - centerX) / rect.width);
    y.set((mouseY - centerY) / rect.height);
  };

  const initialPos = getInitialPosition(enterEdge);

  const overlayVariants = {
    hidden: {
      x: `${initialPos.x}%`,
      y: `${initialPos.y}%`,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35,
      },
    },
    exit: {
      x: `${initialPos.x}%`,
      y: `${initialPos.y}%`,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35,
      },
    },
  };

  const OverlayContent = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 mobile:p-2 gap-3 mobile:gap-1.5">
      <div className={`w-full flex flex-col items-center justify-center gap-1 ${overlayContentLayout}`}>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={`text-xl font-bold text-Primary leading-8 text-center ${titleStyle}`}
        >
          {title}
        </motion.h3>
        <motion.span
          initial={{ width: 25 }}
          animate={isHovered ? { width: 50 } : { width: 25 }}
          transition={{ duration: 0.3 }}
          className="border-b border-Primary"
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="font-normal text-xs uppercase tracking-wider text-gray-400"
        >
          {proficiency}
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-start gap-3 mobile:gap-2 w-full max-w-[220px] mobile:max-w-full mx-auto"
      >
        <img src={images} alt={title} className="w-6 h-6 mobile:w-4 mobile:h-4 object-contain flex-shrink-0 mt-0.5" />
        <p className={`${overlayDescriptionLayout} text-sm mobile:text-[11px] leading-relaxed mobile:leading-snug text-gray-200 text-left`}>
          {description}
        </p>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group w-full h-56 overflow-hidden bg-DarkBg2 rounded-lg cursor-pointer ${wrapperStyle}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {type === "card" ? (
        <>
          <motion.img
            className={`${imgStyle} w-full h-full object-cover`}
            src={images}
            alt={`Image ${itemIndex + 1}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: isHovered ? 1.15 : 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <img
            className={`${imgStyle} absolute right-3 top-[10%] flex desktop:hidden mobile:hidden w-28 h-28 object-cover transition-transform duration-500 scale-110 group-hover:scale-125`}
            src={images}
            alt=""
          />
        </>
      ) : (
        children
      )}

      <motion.div
        className={`overlay absolute inset-0 bg-black/90 backdrop-blur-sm text-white p-5 ${overlayStyle}`}
        variants={overlayVariants}
        initial="hidden"
        animate={isHovered ? "visible" : "exit"}
      >
        <OverlayContent />
      </motion.div>
    </motion.div>
  );
};

export default DirComp;
