import { fetchFoodItems } from './services/foodService';

export async function getAllFoods() {
    try {
        const foodItems = await fetchFoodItems();
        return foodItems;
    } catch (error) {
        console.error('Error fetching food items:', error);
        throw error;
    }
}
