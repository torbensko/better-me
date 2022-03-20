import * as React from "react";
import { useState } from "react";

import { ToggleGroup } from ".";

export const DemoStandard = () => {
  const [value, setValue] = useState<number>();
  return (
    <>
      <h4>One</h4>
      <ToggleGroup count={1} value={0} onChange={setValue} />
      <h4>Two</h4>
      <ToggleGroup count={2} value={0} onChange={setValue} />
      <h4>Three</h4>
      <ToggleGroup count={3} value={0} onChange={setValue} />
    </>
  );
};
