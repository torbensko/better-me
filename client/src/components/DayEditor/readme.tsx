import * as React from "react";

import { DayEditor } from ".";
import { mockDay } from "./mockDay";

export const DemoStandard = () => {
  return <DayEditor initDay={mockDay} />;
};
