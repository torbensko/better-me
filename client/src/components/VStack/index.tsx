import * as React from "react";

import "./styles.css";

export interface IVStackProps {}

export const VStack: React.FC<IVStackProps> = ({ children }) => {
  return (
    <div className="VStack">
      {React.Children.map(children, (child) =>
        child ? <div className="container">{child}</div> : null
      )}
    </div>
  );
};
