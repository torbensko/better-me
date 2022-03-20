import * as React from "react";
import { useState } from "react";

import { DayEditor } from ".";
import { mockDay } from "../../mock-data/mockDay";
import { IDay } from "../../types/IDay";

export const DemoStandard = () => {
  const [day, setDay] = useState<IDay>();
  return (
    <>
      <DayEditor initDay={mockDay} onSuccess={setDay} />
      <pre>{JSON.stringify(day, null, 2)}</pre>
    </>
  );
};
