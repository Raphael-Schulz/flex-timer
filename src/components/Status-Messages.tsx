import React from "react";

interface ErrorProps {
  error: Error;
}

export const Error: React.FC<ErrorProps> = (props) => {
  return <p>Error! {props.error.message}</p>;
};

export const Loading: React.FC = () => {
  return <p>Loading...</p>;
};
