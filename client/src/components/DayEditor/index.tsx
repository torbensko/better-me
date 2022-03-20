import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";

import { useActivities } from "../../hooks/useActivities";
import { Toggle } from "../Toggle";
import { IDay } from "../../types/IDay";
import { IActivityPerformed } from "../../types/IActivityPerformed";
import { ToggleGroup } from "../ToggleGroup";
import { useApp } from "../../hooks/useApp";
import { cloneDeep } from "lodash";

export interface IDayEditorProps {
  initDay: IDay;
  onSuccess: (day: IDay) => unknown;
}

export const DayEditor: React.FC<IDayEditorProps> = ({
  initDay,
  onSuccess
}) => {
  const { activities, rituals } = useActivities();
  const { services, subscription } = useApp();

  const [day, setDay] = useState<IDay>();

  useEffect(() => {
    // build a blank day
    const newDay: IDay = {
      activities: (activities || []).map((activity) => {
        // find previous data
        const priorActivity =
          initDay?.activities.find((a) => a.activity.id === activity.id)
            ?.timesPerformed || 0;
        const performance: IActivityPerformed = {
          activity: activity,
          timesPerformed: priorActivity
        };
        return performance;
      }),
      rituals: (rituals || []).map((activity) => {
        // find previous data
        const priorActivity =
          initDay?.rituals.find((a) => a.activity.id === activity.id)
            ?.timesPerformed || 0;
        const performance: IActivityPerformed = {
          activity: activity,
          timesPerformed: priorActivity
        };
        return performance;
      }),
      date: initDay ? initDay.date : dayjs().toISOString()
    };
    setDay(newDay);
  }, [activities, rituals]);

  if (!day) return null;

  const saveDay = async () => {
    if (!subscription) throw new Error("no subscription");
    const savedDay = await services.createDay(subscription, day);
    onSuccess && onSuccess(savedDay);
  };

  return (
    <div>
      <h1>{dayjs(day.date).format("DD MMM YYYY")}</h1>
      <h2>Rituals</h2>
      {day.rituals.map((performance, i) => {
        const onClick = (value: boolean) => {
          const dayUpdate = cloneDeep(day);
          const updatedPerformance = dayUpdate.rituals.find(
            (r) => r.activity.id === performance.activity.id
          );
          if (updatedPerformance)
            updatedPerformance.timesPerformed = value ? 1 : 0;
          setDay(dayUpdate);
        };
        return (
          <Toggle
            key={performance.activity.id}
            label={performance.activity.title}
            onChange={onClick}
            value={performance.timesPerformed > 0}
          />
        );
      })}
      <h2>Activities</h2>
      {day.activities.map((performance, i) => {
        const onClick = (value: number) => {
          const dayUpdate = cloneDeep(day);
          const updatedPerformance = dayUpdate.activities.find(
            (a) => a.activity.id === performance.activity.id
          );
          if (updatedPerformance) updatedPerformance.timesPerformed = value;
          setDay(dayUpdate);
        };
        return (
          <>
            <h4>{performance.activity.title}</h4>
            <ToggleGroup
              key={performance.activity.id}
              onChange={onClick}
              value={performance.timesPerformed}
              count={performance.activity.maxCount || 1}
            />
          </>
        );
      })}
      <br />
      <Button variant="contained" fullWidth={true} onClick={saveDay}>
        Submit
      </Button>
    </div>
  );
};
