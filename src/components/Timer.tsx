import React from "react";
import "./ComponentStyles.css";

interface ContainerProps {
  seconds: number;
}

const Timer: React.FC<ContainerProps> = ({ seconds }) => {
  let formattedTime: string = new Date(seconds * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <div className="container">
      <strong>{formattedTime}</strong>
    </div>
  );
};

export default Timer;
