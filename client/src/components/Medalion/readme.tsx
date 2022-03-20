import * as React from "react";

import { Medalion } from ".";
import { mockDay } from "../../mock-data/mockDay";

export const DemoStandard = () => {
  return (
    <>
      <Medalion day={mockDay} />
    </>
  );
};
