import * as React from "react";
import { useApp } from "../../hooks/useApp";
import { SubscriptionPrompt } from "../SubscriptionPrompt";

export interface IRequireSubscriptionProps {}

export const RequireSubscription: React.FC<IRequireSubscriptionProps> = ({
  children
}) => {
  const { subscription } = useApp();
  return <div>{subscription ? children : <SubscriptionPrompt />}</div>;
};
