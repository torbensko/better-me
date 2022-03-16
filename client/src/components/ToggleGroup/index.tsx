import * as React from "react";
import { useState } from "react";
import { times } from "lodash";

import { Toggle } from "../Toggle";
import "./styles.css";
export interface IToggleGroupProps {
  count: number;
  onChange: (value: number) => unknown;
}

export const ToggleGroup: React.FC<IToggleGroupProps> = ({ count, onChange }) => {
  const [val, setVal] = useState<number>(0);
  const onToggleClick = (i: number) => {
    // toggle off if clicking the same value again
    if (i === val) {
      i = 0;
    }
    setVal(i);
    onChange && onChange(i);
  };

  return (
    <div className="ToggleGroup">
      <p>{val}</p>
      {times(count, (i) => (
        <Toggle
          key={i}
          onChange={() => onToggleClick(i + 1)}
          label={`${i + 1}`}
          value={val > i}
        />
      ))}
    </div>
  );
};
