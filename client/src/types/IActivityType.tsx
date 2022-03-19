import { TActivityType } from "./TActivityType";

export interface IActivityType {
  id: string;
  color: string;
  label: string;
  type: TActivityType;
  maxCount?: number;
}
