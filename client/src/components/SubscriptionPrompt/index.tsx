import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import { random, times } from "lodash";
import { PinInput } from "react-input-pin-code";

import { useApp } from "../../hooks/useApp";
import { VStack } from "../VStack";
import { IActivityType } from "../../types/IActivityType";
import { ActivityEditor } from "../ActivityEditor";

import "./styles.css";

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
  const [activities, setActivities] = useState<IActivityType[]>([]);

  const setSubscription = async () => {
    const code = pin.join("");
    if (!code.match(/\w{4}/)) return;
    if (mode === "create") {
      await services.createSubscription(code, activities);
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
      <VStack>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={mode}
          onChange={(evt, value) => setMode(value)}
        >
          <ToggleButton value="load">Load</ToggleButton>
          <ToggleButton value="create">Create</ToggleButton>
        </ToggleButtonGroup>
        {mode === "load" ? (
          <p style={{ textAlign: "center" }}>
            Enter your subscription pin
            <br />
            <small>
              Don't have one yet? Click <strong>create</strong> instead
            </small>
          </p>
        ) : (
          <p style={{ textAlign: "center" }}>
            Your new subscription pin is <strong>{pin}</strong>
          </p>
        )}
        <PinInput
          values={pin}
          type="text"
          onChange={(value, index, values) => {
            const upperPin = values.map((n) => n.toUpperCase());
            setPin(upperPin);
          }}
        />
        {mode === "create" && (
          <div>
            <h2>Set your activities</h2>
            <p>
              Rituals are things you want to uphold every day such as: no
              drinking, no caffeine, positive mindset. Activities are things you
              perform and includes things like: running, yoga, gym.
            </p>
            {[...activities, {}].map((a, i) => {
              const updateActivities = (activity: IActivityType) => {
                const newActivities = [...activities];
                newActivities[i] = activity;
                setActivities(newActivities);
              };
              return <ActivityEditor onChange={updateActivities} />;
            })}
            <p style={{ textAlign: "center" }}>
              <small>
                You cannot edit these yet so... you know... don't screw them up
              </small>
            </p>
          </div>
        )}
        <Button variant="contained" onClick={setSubscription}>
          {mode === "load" ? "Load" : "Create"}
        </Button>
      </VStack>
    </div>
  );
};
