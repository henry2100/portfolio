import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setSectionInView } from "../../redux/app/app.action";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  addedStyle?: string;
  sectionInView?: string;
  setSectionInView: (data: string) => void;
}

const Section: React.FC<SectionProps> = ({
  id,
  children,
  addedStyle = "",
  sectionInView,
  setSectionInView,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && sectionRef.current?.id !== sectionInView) {
        setSectionInView(entry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // 50% of the element needs to be visible
    });

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [sectionInView, setSectionInView]); // Dependencies include sectionInView and setSectionInView

  console.log({
    sectionRef: sectionRef.current?.id,
    sectionInView,
  });

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`${addedStyle} h-fit min-h-screen ${
        sectionInView === id ? "group border-[.5px] border-Primary" : ""
      } transition-colors duration-500`}
    >
      {children}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  sectionInView: state.app.sectionInView,
});

const mapDispatchToProps = (dispatch: any) => ({
  setSectionInView: (data: string) => dispatch(setSectionInView(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);