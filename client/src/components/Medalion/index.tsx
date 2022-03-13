import * as React from "react";

import { useEffect } from "react";

import "./styles.css";
import { DonutChart } from "./helpers/DonutChart";
import { removeChildren } from "./helpers/removeChildren";
import { IData } from "./helpers/IData";

export interface IMedalionProps {
  size?: number;
  rituals: { name: string; complete: boolean }[];
  activities: { name: string; count: number }[];
}

export const Medalion: React.FC<IMedalionProps> = ({
  size = 100,
  rituals,
  activities
}) => {
  const medalion = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!medalion.current) {
      return;
    }
    const ritualsOuterRadius = size / 2;
    const ritualsInnerRadius = (size * 0.9) / 2;
    const activitiesOuterRadius = (size * 0.8) / 2;
    const activitiesInnerRadius = (size * 0) / 2;

    const ritualData: IData[] = rituals.map((r) => ({
      name: r.name,
      size: 1,
      visible: r.complete
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

    const activitiesData: IData[] = activities.map((a) => ({
      name: a.name,
      size: a.count
    }));

    const maxActivities = 3;
    const activityCount = activities.reduce((total, x) => x.count + total, 0);
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
  }, [medalion]);

  return <div ref={medalion} className={"Medalion"}></div>;
};
