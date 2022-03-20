import * as React from "react";

import "./styles.css";

export interface IHStackProps {}

export const HStack: React.FC<IHStackProps> = ({ children }) => {
  return (
    <div className="HStack">
      {React.Children.map(children, (child) =>
        child ? <div className="container">{child}</div> : null
      )}
    </div>
  );
};
