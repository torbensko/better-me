import axios from "axios";
import { ActivityType, IActivityType } from "../models/ActivityType";

export const serverUrl: string = process.env.REACT_APP_SERVICES_URL as string;

/**
 * Simple class for talking to the services.
 */
export interface IServices {
  fetchActivityTypes: () => Promise<ActivityType>;
}

export class Services implements IServices {
  constructor() {
    axios.defaults.baseURL = serverUrl;
  }
  async fetchActivityTypes() {
    const { data } = await axios.get(`activity-types`);
    // TODO some safety checks
    return data.activityTypes.map((a: IActivityType) => new ActivityType(a));
  }
}
