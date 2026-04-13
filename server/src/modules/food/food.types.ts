import { Food } from '@prisma/prisma/client';

export type FoodPublic = Pick<Food, 'id' | 'name' | 'calories' | 'protein' | 'carbs' | 'fat'>;

export const foodSelect = {
  id: true,
  name: true,
  calories: true,
  protein: true,
  carbs: true,
  fat: true,
} as const;
