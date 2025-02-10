export type Ingredient = {
    IngredientID: number;      // ID của nguyên liệu
    IngredientName: string;    // Tên nguyên liệu
    Category: string;          // Loại nguyên liệu (ví dụ: Rau củ, Thịt, Gia vị...)
    Unit: string;              // Đơn vị của nguyên liệu (gram, ml, piece...)
         
  };
  
  export type FoodIngredient = {
    FoodIngredientID: number;  // ID duy nhất của FoodIngredient
    FoodID: number;            // ID của món ăn (liên kết với Food)
    IngredientID: number;      // ID của nguyên liệu (liên kết với Ingredient)
    Amount: number;            // Tổng số lượng nguyên liệu này trong món ăn
    Notes: string;             // Ghi chú về cách sử dụng nguyên liệu này
  };
  
  export type Food = {
    FoodID: number;            // ID của món ăn
    FoodName: string;          // Tên món ăn
    MealType: string;          // Loại bữa (Sáng, Trưa, Tối, ...)
    ImageUrl: string;          // URL hình ảnh của món ăn
    FoodType: string;          // Loại món ăn (Chay, Mặn)
    Description: string;       // Mô tả món ăn
    ServingSize: string;       // Khẩu phần (ví dụ: 100g, 1 thìa...)
    FoodIngredient: number[];  // Danh sách các FoodIngredientID (liên kết với FoodIngredient)
    Calories: number;          // Tổng lượng calo của món ăn
    Protein: number;           // Lượng protein trong món ăn
    Carbs: number;             // Lượng carbohydrate trong món ăn
    Fat: number;               // Lượng chất béo trong món ăn
    Glucid: number;            // Lượng glucid trong món ăn
    Fiber: number;             // Lượng chất xơ trong món ăn
    Others: string;            // Các ghi chú khác về món ăn
  };
  