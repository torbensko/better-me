import * as React from "react";

import { ToggleGroup } from ".";

export const DemoStandard = () => {
  return <>
    <h4>One</h4>
    <ToggleGroup count={1} />
    <h4>Two</h4>
    <ToggleGroup count={2} />
    <h4>Three</h4>
    <ToggleGroup count={3} />
  </>;
};
