import * as React from "react";

import { Medalion } from ".";

export const DemoStandard = () => {
  return (
    <>
      <Medalion
        rituals={[
          {
            name: "dry",
            complete: false
          },
          {
            name: "no-caffine",
            complete: false
          }
        ]}
        activities={[
          {
            name: "running",
            count: 1
          }
        ]}
      />
      <Medalion
        rituals={[
          {
            name: "dry",
            complete: false
          },
          {
            name: "no-caffine",
            complete: true
          }
        ]}
        activities={[
          {
            name: "running",
            count: 2
          }
        ]}
      />
      <Medalion
        rituals={[
          {
            name: "dry",
            complete: true
          },
          {
            name: "no-caffine",
            complete: true
          }
        ]}
        activities={[
          {
            name: "running",
            count: 1
          },
          {
            name: "gym",
            count: 2
          }
        ]}
      />
    </>
  );
};
