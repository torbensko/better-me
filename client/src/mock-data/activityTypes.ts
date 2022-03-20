import { IActivityType } from "../types/IActivityType";

export const mockActivitiesTypes: IActivityType[] = [
  {
    id: 1,
    title: "No caffeine",
    type: "ritual",
    color: "red"
  },
  {
    id: 2,
    title: "No alcohol",
    type: "ritual",
    color: "blue"
  },
  {
    id: 3,
    title: "Running",
    type: "activity",
    color: "red",
    maxCount: 2
  },
  {
    id: 4,
    title: "F45",
    type: "activity",
    color: "blue",
    maxCount: 2
  },
  {
    id: 5,
    title: "Gym",
    type: "activity",
    color: "blue",
    maxCount: 3
  }
];
