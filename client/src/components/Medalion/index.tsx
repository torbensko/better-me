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

    const ritualData: IData[] = day.rituals.map((r) => ({
      name: r.activity.title,
      size: 1,
      visible: r.timesPerformed > 0
    }));

    const ritualsSvg = DonutChart(ritualData, {
      name: (d) => d.name,
      value: (d) => d.size,
      width: size,
      height: size,
      outerRadius: ritualsOuterRadius,
      innerRadius: ritualsInnerRadius
    });
    medalion.current?.appendChild(ritualsSvg);

    const activitiesData: IData[] = day.activities.map((a) => ({
      name: a.activity.title,
      size: a.timesPerformed
    }));

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
      innerRadius: activitiesInnerRadius
    });
    medalion.current?.appendChild(activitiesSvg);

    return () => {
      medalion.current && removeChildren(medalion.current);
    };
  }, [day, medalion]);

  return <div ref={medalion} className={"Medalion"}></div>;
};
