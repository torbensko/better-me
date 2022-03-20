import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { IActivityType } from "../../types/IActivityType";
import { TActivityType } from "../../types/TActivityType";
import { HStack } from "../HStack";
import { VStack } from "../VStack";

import "./styles.css";

export interface IActivityEditorProps {
  onChange: (activity: IActivityType) => unknown;
}

export const ActivityEditor: React.FC<IActivityEditorProps> = ({
  onChange
}) => {
  const [color, setColor] = useState<string>();
  const [type, setType] = useState<TActivityType>();
  const [title, setTitle] = useState<string>();
  const [maxCount, setMaxCount] = useState<number>();

  useEffect(() => {
    if (!color || !type || !title) return;
    onChange({
      color,
      type,
      title,
      maxCount
    });
  }, [color, type, title, maxCount]);

  return (
    <div className="ActivityEditor">
      <HStack>
        <ToggleButtonGroup
          color="primary"
          size="medium"
          value={type}
          exclusive
          onChange={(evt, value) => setType(value)}
        >
          <ToggleButton value="activity">Activity</ToggleButton>
          <ToggleButton value="ritual">Ritual</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          id="outlined-basic"
          label="Name"
          // variant="outlined"
          size="medium"
          onChange={(event) => setTitle(event.target.value)}
        />
        <TwitterPicker onChange={(c) => setColor(c.hex)} color={color} />
        <TextField
          id="outlined-basic"
          label="Max count"
          // variant="outlined"
          size="medium"
          disabled={type !== "activity"}
          onChange={(event) => setMaxCount(parseInt(event.target.value))}
        />
      </HStack>
    </div>
  );
};
