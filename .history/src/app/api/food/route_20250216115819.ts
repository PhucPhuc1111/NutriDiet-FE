// /D:/Do an/fe/NutriDiet-FE/src/app/services/foodService.ts

export async function fetchFoodItems() {
    const response = await fetch('http://your-backend-api-url/food');
    if (!response.ok) {
        throw new Error('Failed to fetch food items');
    }
    return response.json();
}
