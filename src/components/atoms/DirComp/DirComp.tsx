import React, { useRef } from "react";

interface dirCardProps {
  itemIndex: number
  images?: string
  imgStyle?: string
  title?: string
  titleStyle?: string
  proficiency?: string
  description?: string
  style?: string
  overlayStyle?: string
  overlayContentLayout?: string
  overlayDescriptionLayout?: string
  children?: JSX.Element,
  type?: 'card' | 'overlay' | undefined
}

const DirComp: React.FC<dirCardProps> = ({ itemIndex, images, imgStyle, title, titleStyle, proficiency, description, style, overlayStyle, overlayContentLayout, overlayDescriptionLayout, children, type = 'card' }) => {
  const containerRefs = useRef<HTMLDivElement[]>([]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const container = containerRefs.current[index];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const edge = closestEdge(x, y, rect.width, rect.height);

    const overlay = container.querySelector(".overlay") as HTMLElement;
    if (!overlay) return;

    switch (edge) {
      case "left":
        overlay.style.transform = "translateX(-100%)";
        break;
      case "right":
        overlay.style.transform = "translateX(100%)";
        break;
      case "top":
        overlay.style.transform = "translateY(-100%)";
        break;
      case "bottom":
        overlay.style.transform = "translateY(100%)";
        break;
    }

    requestAnimationFrame(() => {
      overlay.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      overlay.style.transform = "translate(0, 0)";
      overlay.style.opacity = "1";
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const container = containerRefs.current[index];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const edge = closestEdge(x, y, rect.width, rect.height);

    const overlay = container.querySelector(".overlay") as HTMLElement;
    if (!overlay) return;

    overlay.style.opacity = "0";
    switch (edge) {
      case "left":
        overlay.style.transform = "translateX(-100%)";
        break;
      case "right":
        overlay.style.transform = "translateX(100%)";
        break;
      case "top":
        overlay.style.transform = "translateY(-100%)";
        break;
      case "bottom":
        overlay.style.transform = "translateY(100%)";
        break;
    }
  };

  const displayCard = (
    <div
      ref={(el) => {
        if (el) containerRefs.current[itemIndex] = el;
      }}
      className={`relative group w-full h-56 overflow-hidden bg-DarkBg2 rounded-lg cursor-pointer ${style}`}
      onMouseEnter={(e) => handleMouseEnter(e, itemIndex)}
      onMouseLeave={(e) => handleMouseLeave(e, itemIndex)}
    >
      <img className={`${imgStyle} w-full h-full object-cover transition-transform duration-500 scale-110 group-hover:scale-125`} src={images} alt={`Image ${itemIndex + 1}`} />
      <div
        className={`overlay absolute inset-0 bg-black/70 text-white flex items-center justify-center opacity-0 transition-all duration-500 p-5 ${overlayStyle}`}
        style={{ transform: "translate(0, 0)" }}
      >
        <span className={`w-full h-full flex flex-col items-start justify-between mobile:items-center mobile:justify-center mobile:gap-1 ${overlayContentLayout}`}>
          <h3 className={`text-xl font-bold group-hover:text-2xl text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500 ${titleStyle}`}>{title}</h3>
          <div className='flex flex-col gap-1'>
            <p className='font-normal text-sm text-gray-600 group-hover:text-white my-1 transition ease-in-out duration-500'>{proficiency}</p>
            <span className='border-b border-black group-hover:border-Primary min-w-[25px] group-hover:min-w-[50px] transition ease-in-out duration-500'></span>
          </div>
        </span>

        <span className={`${overlayDescriptionLayout} w-full text-sm font-normal text-gray-800 group-hover:text-white transition ease-in-out duration-500 max-w-[200px] text-right`}>
          {description}
        </span>
      </div>
    </div>
  );

  const displayCard_Overlay = (
    <div
      ref={(el) => {
        if (el) containerRefs.current[itemIndex] = el;
      }}
      className={`relative group w-full h-56 overflow-hidden bg-DarkBg2 rounded-lg cursor-pointer ${style}`}
      onMouseEnter={(e) => handleMouseEnter(e, itemIndex)}
      onMouseLeave={(e) => handleMouseLeave(e, itemIndex)}
    >
      {children}

      <div
        className={`overlay absolute inset-0 bg-black/70 text-white flex items-center justify-center opacity-0 transition-all duration-500 p-5 ${overlayStyle}`}
        style={{ transform: "translate(0, 0)" }}
      >
        <span className={`w-full h-full flex flex-col items-start justify-between mobile:items-center mobile:justify-center mobile:gap-1 ${overlayContentLayout}`}>
          <h3 className={`text-xl font-bold group-hover:text-2xl text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500 ${titleStyle}`}>{title}</h3>
          <div className='flex flex-col gap-1'>
            <p className='font-normal text-sm text-gray-600 group-hover:text-white my-1 transition ease-in-out duration-500'>{proficiency}</p>
            <span className='border-b border-black group-hover:border-Primary min-w-[25px] group-hover:min-w-[50px] transition ease-in-out duration-500'></span>
          </div>
        </span>

        <span className={`${overlayDescriptionLayout} w-full text-sm font-normal text-gray-800 group-hover:text-white transition ease-in-out duration-500 max-w-[200px] text-right`}>
          {description}
        </span>
      </div>
    </div>
  );

  const displayContent = type === 'card'
    ? displayCard
    : displayCard_Overlay

  return displayContent;
};

// Helper Functions
function closestEdge(x: number, y: number, w: number, h: number) {
  const topEdgeDist = distMetric(x, y, w / 2, 0);
  const bottomEdgeDist = distMetric(x, y, w / 2, h);
  const leftEdgeDist = distMetric(x, y, 0, h / 2);
  const rightEdgeDist = distMetric(x, y, w, h / 2);
  const min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
  switch (min) {
    case leftEdgeDist:
      return "left";
    case rightEdgeDist:
      return "right";
    case topEdgeDist:
      return "top";
    case bottomEdgeDist:
      return "bottom";
    default:
      return "top";
  }
}

function distMetric(x: number, y: number, x2: number, y2: number) {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
}

export default DirComp;
