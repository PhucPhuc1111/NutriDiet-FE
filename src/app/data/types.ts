


export type Ingredient = {
  ingredientId: number;     
  ingredientName: string;   
  category: string;         
  unit: string;      
  calories: number;       
  foodId: number;
  };
  export type Role ={
    RoleID: number[];
    RoleName: string;
  };
  export type Account = {
    userId: number,
    fullName: string;
    avatar: string;
    email: string;
    phone: number;
    age: number;
    gender: "Male" | "Female" | "Other"; 
    location: string; 
    status: "Active" | "Inactive"; 
  }
  
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
    foodId: number;            
    foodName: string;          
    mealType: string;          
    imageUrl: string;          
    foodType: string;          
    description: string;       
    servingSize: string;       
    calories: number;          
    protein: number;           
    carbs: number;             
    fat: number;               
    glucid: number;            
    fiber: number;             
    others: string;       
      
    allergies: Allergy[],
    diseases: Disease[]
  };
   export type MealPlan ={
    mealPlanId:number;
    planName:string;
    healthGoal:string;
    duration: number;
    status: string;
    createdBy: string;
    createdAt:string;
    mealPlanDetails:[]
    
   }

   export type MealPlanDetail ={
    MealPlanDetailID:number;
    mealPlanId: number;
    foodId: number;
    foodName: string;
    Quantity: number;
    mealType: string;
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
   
export type Profile = {
  token: string;
  role?: string;
  avatar?: {
    value?: string;
  }[];
}