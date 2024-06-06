import { IIngredients } from "./ingredients";
import { ISteps } from "./steps";

export interface IReceipe {
  slug: string;
  title: string;
  description: string;
  serving: number;
  duration: number;
  image_url: string;
  createdAt: string;
  updatedAt: string;
  ingredients?: IIngredients[];
  steps?: ISteps[];
}
