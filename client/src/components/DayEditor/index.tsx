import * as React from "react";
import { useActivities } from "../../hooks/useActivities";
import { Toggle } from "../Toggle";
import { IDay } from "../../types/IDay";

export interface IDayEditorProps {
  initDay: IDay;
}

export const DayEditor: React.FC<IDayEditorProps> = ({ initDay }) => {
  const [day, setDay] = React.useState<IDay>(initDay);

  const { activities, rituals } = useActivities();

  // const id: string[] = day.activities.map((c, i) => c.category.id);

  return (
    <div>
      <h4>Rituals</h4>
      {day.rituals.map((ritual, i) => {
        const newCount = i + 1;
        const onClick = () => {
          ritual.timesPerformed =
            ritual.timesPerformed === newCount ? 0 : newCount;
        };
        return (
          <Toggle
            label={ritual.activity.label}
            onChange={onClick}
            value={ritual.timesPerformed > 0}
          />
        );
      })}
      <h4>Activities</h4>
    </div>
  );
};
