import * as React from "react";

import "./styles.css";

import { RequireSubscription } from "../RequireSubscription";
import { YearSummary } from "../YearSummary";

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <div className="App">
      <RequireSubscription>
        <YearSummary />
      </RequireSubscription>
    </div>
  );
};
