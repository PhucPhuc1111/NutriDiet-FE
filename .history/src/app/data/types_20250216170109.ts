

export type Ingredient = {
    IngredientID: number;     
    IngredientName: string;   
    Category: string;         
    Unit: string;             
    FoodID: number;
  };
  
  export type Role ={
    RoleID: number[];
    RoleName: string;
  };
  export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    age: number;
    gender: string | "male" | "female" | "not specified";
    address: string;
    avatar: string;
    fcmToken: string;
    status: string | "Active" | "Inactive";
    role:string;
  };
  export type Food = {
    FoodID: number;            
    FoodName: string;          
    MealType: string;          
    ImageUrl: string;          
    FoodType: string;          
    Description: string;       
    ServingSize: string;       
    Ingredient: number[];  
    Calories: number;          
    Protein: number;           
    Carbs: number;             
    Fat: number;               
    Glucid: number;            
    Fiber: number;             
    Others: string;            
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

   export type Allergy ={
    allergyId: number;
    allergyName: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
   }

   export type Disease ={
    diseaseId: number;
    diseaseName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
   }