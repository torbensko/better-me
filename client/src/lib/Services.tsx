import axios from "axios";
import { mockActivitiesTypes } from "../mock-data/activityTypes";
import { IActivityType } from "../types/IActivityType";
import { IDay } from "../types/IDay";
import { ISubscription } from "../types/ISubscription";

export const serverUrl: string = process.env.REACT_APP_SERVICES_URL as string;

/**
 * Simple class for talking to the services.
 */
export interface IServices {
  createSubscription: (
    subscription: string,
    activities: IActivityType[]
  ) => Promise<ISubscription>;
  fetchActivityTypes: (subscription: string) => Promise<IActivityType[]>;
  fetchDays: (subscription: string) => Promise<IDay[]>;
  createDay: (subscription: string, day: IDay) => Promise<IDay>;
}

export class Services implements IServices {
  constructor() {
    axios.defaults.baseURL = serverUrl;
  }
  async createSubscription(subscription: string, activities: IActivityType[]) {
    const { data } = await axios.post(`subscriptions`, {
      subscription,
      activities
    });
    return data;
  }
  async fetchActivityTypes(subscription: string) {
    // return mockActivitiesTypes;
    const { data } = await axios.get(
      `subscriptions/${subscription}/activity-types`
    );
    return data.activityTypes;
  }
  async fetchDays(subscription: string) {
    const { data } = await axios.get(`subscriptions/${subscription}/days`);
    return data.activityTypes;
  }
  async createDay(subscription: string, day: IDay) {
    const { data } = await axios.post(`subscriptions/${subscription}/days`, {
      day
    });
    return data;
  }
}
