import { useMemo } from "react";
import { useQuery } from "react-query";
import { IActivityType } from "../../types/IActivityType";
import { IDay } from "../../types/IDay";

import { useApp } from "../useApp";

interface IUseDays {
  days?: IDay[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => unknown;
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
  } = useQuery<IDay[] | undefined, Error>(
    "fetchDays",
    () => {
      if (subscription) return services.fetchDays(subscription);
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
