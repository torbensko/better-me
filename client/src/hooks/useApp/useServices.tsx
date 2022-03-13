import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useServices = () => {
  const { services } = useContext(AppContext);
  return services;
};
