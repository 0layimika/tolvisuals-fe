import React from "react";

interface ContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div
      id={id}
      className={
        "max-w-7xl lg:px-6 md:px-10 px-3  mx-auto w-full  " + className
      }
    >
      {children}
    </div>
  );
};
export default Container;
