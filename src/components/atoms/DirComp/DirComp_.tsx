import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image1.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image2.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image3.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image4.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image5.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image6.jpg",
];

const DirectionAwareHover = () => {
  const getSlideDirection = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const topDist = y;
    const bottomDist = height - y;
    const leftDist = x;
    const rightDist = width - x;
    const min = Math.min(topDist, bottomDist, leftDist, rightDist);

    if (min === topDist) return { x: 0, y: -1 }; // Slide from top
    if (min === bottomDist) return { x: 0, y: 1 }; // Slide from bottom
    if (min === leftDist) return { x: -1, y: 0 }; // Slide from left
    return { x: 1, y: 0 }; // Slide from right
  };

  const handleHoverStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { x: dirX, y: dirY } = getSlideDirection(x, y, rect.width, rect.height);

    element.style.setProperty("--direction-x", dirX.toString());
    element.style.setProperty("--direction-y", dirY.toString());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-6">Direction Aware Hover</h1>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
            onMouseEnter={handleHoverStart}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <motion.div
              className="absolute inset-0 bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100"
              initial={{ x: "var(--direction-x, 0) * -100%", y: "var(--direction-y, 0) * -100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "var(--direction-x, 0) * 100%", y: "var(--direction-y, 0) * 100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p className="text-xl font-bold">Hovered</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectionAwareHover;
