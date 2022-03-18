import * as React from "react";

import "./styles.css";

export interface IToggleProps {
  value?: boolean;
  onChange: (value: boolean) => unknown;
  label: string;
}

export const Toggle: React.FC<IToggleProps> = ({ value, onChange, label }) => {
  const onClick = () => {
    onChange(!value);
  };

  const className = `Toggle ${value ? "-active" : ""}`;

  return (
    <div className={className} onClick={onClick}>
      {label}
    </div>
  );
};
