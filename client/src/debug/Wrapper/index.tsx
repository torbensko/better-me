import React from "react";
import { AppProvider } from "../../providers/AppProvider";

interface IDemoWrapperProps {}

export const DemoWrapper: React.FC<IDemoWrapperProps> = ({ children }) => (
  <AppProvider>{children}</AppProvider>
);

export default DemoWrapper;
