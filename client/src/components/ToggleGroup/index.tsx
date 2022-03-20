import * as React from "react";
import { useState } from "react";
import { times } from "lodash";

import { Toggle } from "../Toggle";
import "./styles.css";
export interface IToggleGroupProps {
  count: number;
  value: number;
  onChange: (value: number) => unknown;
}

export const ToggleGroup: React.FC<IToggleGroupProps> = ({
  count,
  value,
  onChange
}) => {
  // const [val, setVal] = useState<number>(0);

  const onToggleClick = (i: number) => {
    // toggle off if clicking the same value again
    if (i === value) {
      i = 0;
    }
    onChange && onChange(i);
  };

  return (
    <div className="ToggleGroup">
      {times(count, (i) => (
        <Toggle
          key={i}
          onChange={() => onToggleClick(i + 1)}
          label={`${i + 1}`}
          value={value > i}
        />
      ))}
    </div>
  );
};
