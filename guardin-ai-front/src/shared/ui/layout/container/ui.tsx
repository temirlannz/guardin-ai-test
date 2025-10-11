import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`mx-auto w-full max-w-[1180px] ${className || ''}`}>
      {children}
    </div>
  );
};
