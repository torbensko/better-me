import * as React from "react";
import { useState } from "react";

import { Toggle } from ".";

export const DemoStandard = () => {
  const [value, setValue] = useState<boolean>();

  return <>
    <Toggle onChange={setValue} value={true} />
    <Toggle onChange={setValue} value={false} />
    <br />
    <h4>Last update:</h4>
    <pre>{value === undefined ? "unknown" : (value ? "true" : "false")}</pre>
  </>;
};
