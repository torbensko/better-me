import * as React from "react";

import "./App.css";
import { AppProvider } from "../../hooks/useApp/AppProvider";

interface IAppProps {}

export const App: React.FC<IAppProps> = () => {
  return (
    <AppProvider>
      <div className="App">
        Eu ex eiusmod et id occaecat tempor ex esse amet. Reprehenderit
        adipisicing ea veniam enim enim non. Ex magna elit deserunt sit qui
        commodo non. Esse Lorem qui pariatur dolore ullamco ea anim ut ex tempor
        cillum fugiat amet. Velit id culpa qui cupidatat consequat mollit
        aliqua. Anim proident minim velit labore in esse duis fugiat ullamco ex.
        Non minim commodo est mollit sit est enim. Cillum labore occaecat ad
        commodo non elit id dolor amet aliquip do aliquip excepteur in.
      </div>
    </AppProvider>
  );
};

export const AppDemo: React.FC = () => {
  return <App />;
};
