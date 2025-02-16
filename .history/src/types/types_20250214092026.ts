

export type Ingredient = {
    IngredientID: number;     
    IngredientName: string;   
    Category: string;         
    Unit: string;             
    FoodID: number;
  };
  

  
  export type Food = {
    FoodID: number;            
    FoodName: string;          // Tên món ăn
    MealType: string;          // Loại bữa (Sáng, Trưa, Tối, ...)
    ImageUrl: string;          // URL hình ảnh của món ăn
    FoodType: string;          // Loại món ăn (Chay, Mặn)
    Description: string;       // Mô tả món ăn
    ServingSize: string;       // Khẩu phần (ví dụ: 100g, 1 thìa...)
    Ingredient: number[];  

    Calories: number;          // Tổng lượng calo của món ăn
    Protein: number;           // Lượng protein trong món ăn
    Carbs: number;             // Lượng carbohydrate trong món ăn
    Fat: number;               // Lượng chất béo trong món ăn
    Glucid: number;            // Lượng glucid trong món ăn
    Fiber: number;             // Lượng chất xơ trong món ăn
    Others: string;            // Các ghi chú khác về món ăn
  };
   export type MealPlan ={
    MealPlanID:number;
    UserID: number; 
    PlanName:string;
    HealthGoal:string;
    Duration: number;
    Status: string;
    CreatedBy: string;
    CreatedAt:string;
    UpdatedBy: string;
    UpdatedAt: string
    MealPlanDetails:number[]
    
   }

   export type MealPlanDetail ={
    MealPlanDetailID:number;
    MealPlanID: number;
    FoodID: number;
    FoodName: string;
    Quantity: number;
    MealType: string;
    DayNumber: number;
    TotalCalories: number
   }