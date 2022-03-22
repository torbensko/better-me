import * as React from "react";
import { parseUrl } from "query-string";
import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Services } from "../../lib/Services";
import "./styles.css";

const PARAM_SUBSCRIPTION = "key";

export interface IAppContextValue {
  services: Services;
  subscription?: string;
  setSubscription: (subscription: string) => unknown;
}

export const AppContext = React.createContext<IAppContextValue>({
  services: new Services(),
  subscription: undefined,
  setSubscription: () => {}
});

export interface IAppProviderProps {}

export const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // query options
      },
      mutations: {
        // mutation options
      }
    }
  });

  // const subscription = useMemo(() => {
  //   const url = parseUrl(window.location.href, {
  //     parseBooleans: true,
  //     parseNumbers: true,
  //     arrayFormat: "bracket"
  //   }).query;
  //   return url[PARAM_SUBSCRIPTION] as string;
  // }, []);

  const [subscription, setSubscription] = useState<string>(
    localStorage.getItem(PARAM_SUBSCRIPTION) || ""
  );

  useEffect(() => {
    if (subscription) localStorage.setItem(PARAM_SUBSCRIPTION, subscription);
    else localStorage.removeItem(PARAM_SUBSCRIPTION);
  }, [subscription]);

  const value = useMemo(() => {
    return {
      services: new Services(),
      subscription: subscription?.length ? subscription : undefined,
      setSubscription
    };
  }, [subscription]);

  return (
    <AppContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
};
