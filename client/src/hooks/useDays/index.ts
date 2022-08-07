import { useMemo } from "react";
import { useQuery } from "react-query";
import { IActivityType } from "../../types/IActivityType";
import { IDay } from "../../types/IDay";

import { useApp } from "../useApp";

export interface IDayWithScores extends IDay {
  isGoodDay: boolean;
  activityCount: number;
  /** Was an activity that requires rest performed? */
  requireRest: boolean;
}

interface IUseDays {
  days?: IDayWithScores[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => unknown;
}

const processDays = (days: IDay[]): IDayWithScores[] => {

  const daysWithCounts: IDayWithScores[] = days.map((d, i) => {
    // total for that day
    const activityCount = d.activities.reduce(
      (total, x) => x.timesPerformed + total,
      0
    );
    // HACK should be based on a flag
    const requireRest = d.activities.filter(x =>
      x.activity.title === "Gym" && x.timesPerformed > 0
    ).length > 0;

    return {
    ...d,
    isGoodDay: false, // to be calculated next
    requireRest,
    activityCount
  };
});

  return daysWithCounts.map((d, i) => {
    
    const lastSevenDays = daysWithCounts.slice(Math.max(0, i - 6), i + 1);
    
    // bad day when...
    // > more than 5 days of 'requires rest' activity and today we require rest
    const tooMuchTraining = lastSevenDays.filter((n) => n.requireRest).length > 5 && d.requireRest;
    // > more than 2 days of nothing and today we did nothing
    const tooMuchRest =
      lastSevenDays.filter((n) => n.activityCount === 0).length > 2 && d.activityCount === 0;

    return {
    ...d,
    isGoodDay: !tooMuchTraining && !tooMuchRest
  };
});
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useDays = (): IUseDays => {
  const { services, subscription } = useApp();

  const {
    data: days,
    error,
    isLoading,
    refetch
  } = useQuery<IDayWithScores[] | undefined, Error>(
    ["fetchDays", subscription],
    async () => {
      if (subscription) {
        const days = await services.fetchDays(subscription)
        return processDays(days);
      }
      return undefined;
    },
    { refetchOnMount: false }
  );

  return useMemo<IUseDays>(
    () => ({
      days,
      error,
      isLoading,
      refetch
    }),
    [days, error, isLoading, refetch]
  );
};
