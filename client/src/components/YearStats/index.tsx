import * as React from "react";
import { useMemo } from "react";

import { useActivities } from "../../hooks/useActivities";
import { useDays } from "../../hooks/useDays";
import "./styles.css";

export interface IYearStatsProps {}

export const YearStats: React.FC<IYearStatsProps> = ({}) => {
  const { activities } = useActivities();
  const { days } = useDays();

  const stats = useMemo(() => {
    if (!activities || !days) return null;
    return activities.map((activity) => {
      const activityCount = days.reduce(
        (total, day) =>
          total +
          (day.activities.find((a) => a.activity.id === activity.id)
            ?.timesPerformed || 0),
        0
      );
      return {
        activity,
        count: activityCount
      };
    });
  }, [activities, days]);

  if (!stats) return null;

  return (
    <div className="YearStats">
      <ul>
        {stats.map((stat) => (
          <li>
            <label>
              <span
                className="dot"
                style={{ backgroundColor: stat.activity.color }}
              ></span>
              {stat.activity.title}: {stat.count}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
