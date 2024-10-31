export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse<T> {
  message: string;
  data: T;
}
