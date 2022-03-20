import * as React from "react";
import { useActivities } from "../../hooks/useActivities";
import { Toggle } from "../Toggle";
import { IDay } from "../../types/IDay";
import { IActivityPerformed } from "../../types/IActivityPerformed";
import dayjs from "dayjs";
import { useMemo } from "react";
import { ToggleGroup } from "../ToggleGroup";
import { Button } from "@mui/material";
import { useApp } from "../../hooks/useApp";

export interface IDayEditorProps {
  initDay: IDay;
  onSuccess: (day: IDay) => unknown;
}

export const DayEditor: React.FC<IDayEditorProps> = ({
  initDay,
  onSuccess
}) => {
  const { activities, rituals } = useActivities();
  const { services } = useApp();

  const day = useMemo(() => {
    const newDay: IDay = {
      activities: (activities || []).map((a) => {
        const activity: IActivityPerformed = {
          activity: a,
          timesPerformed: 0
        };
        return activity;
      }),
      rituals: (rituals || []).map((a) => {
        const activity: IActivityPerformed = {
          activity: a,
          timesPerformed: 0
        };
        return activity;
      }),
      date: initDay ? initDay.date : dayjs().toISOString()
    };
    return newDay;
  }, [activities, rituals]);

  const saveDay = async () => {
    const savedDay = await services.createDay(day);
    onSuccess && onSuccess(savedDay);
  };

  return (
    <div>
      <h2>Rituals</h2>
      {day.rituals.map((ritual, i) => {
        const newCount = i + 1;
        const onClick = () => {
          ritual.timesPerformed =
            ritual.timesPerformed === newCount ? 0 : newCount;
        };
        return (
          <Toggle
            key={ritual.activity.id}
            label={ritual.activity.title}
            onChange={onClick}
            value={ritual.timesPerformed > 0}
          />
        );
      })}
      <h2>Activities</h2>
      {day.activities.map((performances, i) => {
        const newCount = i + 1;
        const onClick = () => {
          performances.timesPerformed =
            performances.timesPerformed === newCount ? 0 : newCount;
        };
        return (
          <>
            <h4>{performances.activity.title}</h4>
            <ToggleGroup
              key={performances.activity.id}
              onChange={onClick}
              count={performances.activity.maxCount || 1}
            />
          </>
        );
      })}
      <Button variant="contained" onClick={saveDay}>
        Submit
      </Button>
    </div>
  );
};
