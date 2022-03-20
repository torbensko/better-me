import { useMemo } from "react";
import { useQuery } from "react-query";
import { IActivityType } from "../../types/IActivityType";

import { useApp } from "../useApp";

interface IUseActivities {
  types?: IActivityType[];
  activities?: IActivityType[];
  rituals?: IActivityType[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => unknown;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useActivities = (): IUseActivities => {
  const { subscription, services } = useApp();

  const {
    data: activityTypes,
    error,
    isLoading,
    refetch
  } = useQuery<IActivityType[] | undefined, Error>(
    "fetchActivityTypes",
    () => {
      if (subscription) return services.fetchActivityTypes(subscription);
      return undefined;
    },
    { refetchOnMount: false }
  );

  return useMemo<IUseActivities>(
    () => ({
      activityTypes,
      activities: activityTypes?.filter((n) => n.type === "activity"),
      rituals: activityTypes?.filter((n) => n.type === "ritual"),
      error,
      isLoading,
      refetch
    }),
    [activityTypes, error, isLoading, refetch]
  );
};
