import * as React from "react";
import { parseUrl } from "query-string";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Services } from "../../lib/Services";
import "./styles.css";

const PARAM_SUBSCRIPTION = "key";

export interface IAppContextValue {
  services: Services;
  subscription?: string;
}

export const AppContext = React.createContext<IAppContextValue>({
  services: new Services(),
  subscription: undefined
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

  const subscription = useMemo(() => {
    const url = parseUrl(window.location.href, {
      parseBooleans: true,
      parseNumbers: true,
      arrayFormat: "bracket"
    }).query;
    return url[PARAM_SUBSCRIPTION] as string;
  }, []);

  const value = useMemo(() => {
    return { services: new Services(), subscription };
  }, []);

  return (
    <AppContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
};
