import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import { random, times } from "lodash";
import { PinInput } from "react-input-pin-code";

import { useApp } from "../../hooks/useApp";

type TMode = "load" | "create";

const PIN_CHARACTERS = "abcdefghijklmnopqrstuvwxz";
const BLANK_PIN = ["", "", "", ""];

const generateRandomPin = (): string[] => {
  return times(4, () =>
    PIN_CHARACTERS[random(PIN_CHARACTERS.length - 1)].toUpperCase()
  );
};

export interface ISubscriptionPromptProps {}

export const SubscriptionPrompt: React.FC<ISubscriptionPromptProps> = ({}) => {
  const { services } = useApp();
  const [mode, setMode] = useState<TMode>("load");

  const setSubscription = async () => {
    const code = pin.join("");
    if (!code.match(/\w{4}/)) return;
    if (mode === "create") {
      await services.createSubscription(code);
    }
    // redirect to new code
    var url = new URL(window.location.href);
    url.searchParams.append("key", code);
    window.location.href = url.href;
  };

  const [pin, setPin] = useState<string[]>(BLANK_PIN);

  useEffect(() => {
    mode === "load" ? setPin(BLANK_PIN) : setPin(generateRandomPin());
  }, [mode]);

  return (
    <div className="SubscriptionPrompt">
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={mode}
        onChange={(evt, value) => setMode(value)}
      >
        <ToggleButton value="load">Load</ToggleButton>
        <ToggleButton value="create">Create</ToggleButton>
      </ToggleButtonGroup>
      <PinInput
        values={pin}
        type="text"
        onChange={(value, index, values) => {
          const upperPin = values.map((n) => n.toUpperCase());
          setPin(upperPin);
        }}
      />
      <Button variant="contained" onClick={setSubscription}>
        Submit
      </Button>
    </div>
  );
};
