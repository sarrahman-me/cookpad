export interface PayloadReceipes {
  title: string;
  description: string;
  serving: number;
  duration: number;
  receipe_image: string;
  steps: {
    description: string;
    order_step: number;
  }[];
  ingredients: {
    ingredient: string;
    quantity: number;
    dose: string;
  }[];
}
