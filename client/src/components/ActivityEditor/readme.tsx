import * as React from "react";
import { useState } from "react";

import { ActivityEditor } from ".";
import { IActivityType } from "../../types/IActivityType";
import { HStack } from "../HStack";

export const DemoStandard = () => {
  const [activity, setActivity] = useState<IActivityType>();
  return (
    <HStack>
      <ActivityEditor onChange={setActivity} />
      <pre>{JSON.stringify(activity, null, 2)}</pre>
    </HStack>
  );
};
