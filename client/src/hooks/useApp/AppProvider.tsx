import * as React from "react";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Services } from "../../lib/Services";

export interface IAppContextValue {
  services: Services;
}

export const AppContext = React.createContext<IAppContextValue>({
  services: new Services()
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

  const value = useMemo(() => {
    return { services: new Services() };
  }, []);

  return (
    <AppContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
};
