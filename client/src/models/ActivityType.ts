import { ISerializable } from "../types/ISerializable";

export interface IActivityType {
  id: string;
}

export class ActivityType implements ISerializable<IActivityType> {
  private id: string;

  constructor(src: IActivityType) {
    this.id = src.id;
  }

  toJson() {
    const data: IActivityType = {
      id: this.id
    };
    return data;
  }
}
