import * as React from "react";
import { Toggle } from "../Toggle";

export interface IToggleGroupProps {
  count: number;
}

export const ToggleGroup: React.FC<IToggleGroupProps> = ({ }) => {
  return <div><Toggle onChange={() => { }} /></div>;
};
