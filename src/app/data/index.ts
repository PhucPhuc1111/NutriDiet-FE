export * from "./types";
export * from "./account";
export * from "./allergy";
export * from "./disease";
export * from "./food";
export * from "./ingredient";
export * from "./mealPlan";
export * from "./package";
export * from "./system-configuration";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;


}