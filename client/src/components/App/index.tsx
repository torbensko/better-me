import * as React from "react";

import "./styles.css";

import { RequireSubscription } from "../RequireSubscription";
import { YearSummary } from "../YearSummary";

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <RequireSubscription>
      <YearSummary />
    </RequireSubscription>
  );
};

export const AppDemo: React.FC = () => {
  return <App />;
};
