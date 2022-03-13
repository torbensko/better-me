export interface ISerializable<T> {
  // fromJson: (data: T) => void;
  toJson: () => T;
}
