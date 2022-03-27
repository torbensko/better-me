import * as React from "react";

import { useEffect } from "react";

import "./styles.css";
import { DonutChart } from "./helpers/DonutChart";
import { removeChildren } from "./helpers/removeChildren";
import { IData } from "./helpers/IData";
import { IDay } from "../../types/IDay";

export interface IMedalionProps {
  size?: number;
  day: IDay;
}

export const Medalion: React.FC<IMedalionProps> = ({ size = 30, day }) => {
  const medalion = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!medalion.current) {
      return;
    }
    const ritualsOuterRadius = size / 2;
    const ritualsInnerRadius = (size * 0.9) / 2;
    const activitiesOuterRadius = (size * 0.8) / 2;
    const activitiesInnerRadius = (size * 0) / 2;

    const ritualColors: string[] = [];
    const ritualData: IData[] = day.rituals.map((r) => {
      ritualColors.push(r.activity.color);
      return {
        name: r.activity.title,
        size: 1,
        visible: r.timesPerformed > 0
      };
    });

    const ritualsSvg = DonutChart(ritualData, {
      name: (d) => d.name,
      value: (d) => d.size,
      width: size,
      height: size,
      outerRadius: ritualsOuterRadius,
      innerRadius: ritualsInnerRadius,
      colors: ritualColors
    });
    medalion.current?.appendChild(ritualsSvg);

    const activityColors: string[] = [];
    const activitiesData: IData[] = day.activities
      .filter((a) => a.timesPerformed > 0)
      .map((a) => {
        activityColors.push(a.activity.color);
        return {
          name: a.activity.title,
          size: a.timesPerformed
        };
      });

    if (activitiesData.length) {
      const maxActivities = 3;
      const activityCount = day.activities.reduce(
        (total, x) => x.timesPerformed + total,
        0
      );
      const sizeScale = activityCount / Math.max(activityCount, maxActivities);
      const sizeMin = (size * 0.2) / 2;
      const sizeVariation = activitiesOuterRadius - sizeMin;
      const activitySize = sizeMin + sizeVariation * sizeScale;

      const activitiesSvg = DonutChart(activitiesData, {
        name: (d) => d.name,
        value: (d) => d.size,
        width: size,
        height: size,
        outerRadius: activitySize,
        innerRadius: activitiesInnerRadius,
        stroke: "none",
        colors: activityColors,
        strokeWidth: 0,
        padAngle: 0
      });
      medalion.current?.appendChild(activitiesSvg);
    }

    return () => {
      medalion.current && removeChildren(medalion.current);
    };
  }, [day, medalion]);

  return <div ref={medalion} className={"Medalion"}></div>;
};
