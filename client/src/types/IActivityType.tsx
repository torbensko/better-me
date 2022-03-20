import { TActivityType } from "./TActivityType";

export interface IActivityType {
  id: number;
  title: string;
  color: string;
  type: TActivityType;
  maxCount?: number;
}
