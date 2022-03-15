import * as React from "react";

import "./styles.css";

export interface IToggleProps {
  value?: boolean;
  onChange: (value: boolean) => unknown;
}

export const Toggle: React.FC<IToggleProps> = ({ value, onChange }) => {
  const [val, setVal] = React.useState<boolean>(value || false);

  const onClick = () => {
    setVal(!val);
    onChange(!val);
  };

  const className = `Toggle ${val ? '-active' : ''}`;

  return <div className={className} onClick={onClick}>My Toggle</div>;
};
