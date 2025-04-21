// import React, { useState, useEffect, useCallback } from "react";
// import { DownOutlined } from "@ant-design/icons";
// import { Button, Form, Select, message, Input, InputNumber } from "antd";
// import { useGetAllFoods, updateMealPlan } from "@/app/data";
// import Cookies from "js-cookie";

// interface DayFoodDetails {
//   breakfast: string[];
//   lunch: string[];
//   dinner: string[];
//   evening: string[];
// }

// interface Day {
//   dayNumber: string;
//   foodDetails: DayFoodDetails;
//   totalCalories: number;
// }

// interface UpdateMealPlanProps {
//   mealPlanId: number;
//   mealPlanDetails: Day[];
//   planName: string;
//   healthGoal: string;
//   duration: number;
//   createdBy: string;
//   createdAt: string;
// }

// const MealSelectionForm: React.FC<{
//   day: Day;
//   editMode: boolean;
//   updateDay: (dayNumber: string, foodDetails: DayFoodDetails) => void;
// }> = ({ day, editMode, updateDay }) => {
//   const { data: foodList, isLoading } = useGetAllFoods(1, 100, "");

//   const handleChange = (
//     mealType: keyof DayFoodDetails,
//     selectedFoods: string[],
//   ) => {
//     updateDay(day.dayNumber, { ...day.foodDetails, [mealType]: selectedFoods });
//   };

//   return (
//     <Form name={`form_${day.dayNumber}`} style={{ maxWidth: 600 }}>
//       {["breakfast", "lunch", "dinner", "evening"].map((mealType) => (
//         <Form.Item key={mealType} label={`Bữa ${mealType}`}>
//           <Select
//             mode="multiple"
//             allowClear
//             value={day.foodDetails[mealType as keyof DayFoodDetails]}
//             disabled={!editMode || isLoading}
//             loading={isLoading}
//             onChange={(values) =>
//               handleChange(mealType as keyof DayFoodDetails, values)
//             }
//           >
//             {foodList?.map((food) => (
//               <Select.Option key={food.foodId} value={food.foodId}>
//                 {food.foodName}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//       ))}
//     </Form>
//   );
// };

// const UpdateMealPlan: React.FC<UpdateMealPlanProps> = ({
//   mealPlanId,
//   mealPlanDetails,
//   planName,
//   healthGoal,
//   duration,
//   createdBy,
//   createdAt,
// }) => {
//   const [days, setDays] = useState<Day[]>([]);
//   const [open, setOpen] = useState<string | null>(null);
//   const [editMode, setEditMode] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     if (mealPlanDetails?.length > 0) {
//       setDays(mealPlanDetails);
//     }
//   }, [mealPlanDetails]);

//   const updateDay = (dayNumber: string, foodDetails: DayFoodDetails) => {
//     setDays((prevDays) =>
//       prevDays.map((day) =>
//         day.dayNumber === dayNumber ? { ...day, foodDetails } : day,
//       ),
//     );
//   };

//   const saveChanges = async () => {
//     const mealPlanDetails = days.flatMap((day) =>
//       Object.entries(day.foodDetails).flatMap(([mealType, foodIds]) =>
//         foodIds.map((foodId: any) => ({
//           foodId: Number(foodId),
//           quantity: 1, // Điều chỉnh nếu cần
//           mealType,
//           dayNumber: Number(day.dayNumber),
//         })),
//       ),
//     );

//     const params = {
//       planName,
//       healthGoal,
//       mealPlanDetails,
//     };

//     try {
//       await updateMealPlan(mealPlanId, params);
//       message.success("Cập nhật thực đơn thành công!");
//     } catch (error) {
//       message.error("Lỗi khi cập nhật thực đơn!");
//     }
//   };

//   return (
//     <div>
//       <div className="mb-3 flex items-center justify-between">
//         <div className="text-lg font-semibold">Cập nhật thực đơn</div>
//       </div>
//       {days.map((day) => (
//         <div key={day.dayNumber} className="pt-10">
//           <div
//             className="flex w-full justify-between rounded-t-xl bg-green-800 p-3 font-semibold text-white"
//             onClick={() =>
//               setOpen(open === day.dayNumber ? null : day.dayNumber)
//             }
//           >
//             <div>{day.dayNumber}</div>
//             <div className="action-buttons flex space-x-3">
//               <DownOutlined
//                 className={`${open === day.dayNumber ? "rotate-180" : ""}`}
//               />
//               {editMode[day.dayNumber] ? (
//                 <Button
//                   type="primary"
//                   onClick={() =>
//                     setEditMode((prev) => ({
//                       ...prev,
//                       [day.dayNumber]: false,
//                     }))
//                   }
//                 >
//                   Lưu
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() =>
//                     setEditMode((prev) => ({
//                       ...prev,
//                       [day.dayNumber]: true,
//                     }))
//                   }
//                 >
//                   Sửa
//                 </Button>
//               )}
//             </div>
//           </div>

//           {open === day.dayNumber && (
//             <div className="border-2 border-green-800 p-10">
//               <MealSelectionForm
//                 day={day}
//                 editMode={!!editMode[day.dayNumber]}
//                 updateDay={updateDay}
//               />
//               <div className="bg-green-800 p-5 text-center text-lg font-semibold text-white">
//                 Tổng calo: {day.totalCalories} cal
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       <div className="mt-5 flex justify-end">
//         <Button type="primary" onClick={saveChanges}>
//           Cập nhật thực đơn
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default UpdateMealPlan;
import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, message, Select } from "antd";
import { updateMealPlan, useGetAllFoods } from "@/app/data";
import Cookies from "js-cookie";

interface Day {
  dayNumber: string;
  foodDetails: DayFoodDetails;
  totalCalories: number;
  totalFat: number;
  totalCarbs: number;
  totalProtein: number;
  totalByMealType?: {
    Breakfast?: { calories: number, fat: number, carbs: number, protein:number };
    Lunch?: { calories: number,fat: number, carbs: number, protein:number };
    Dinner?: { calories: number,fat:number, carbs: number, protein:number };
    Snacks?: { calories: number, fat:number, carbs: number, protein:number };
  };
}

interface UpdateMealPlanProps {
  mealPlanId: number;
  mealPlanDetails: Day[];
  planName: string;
  healthGoal: string;
  duration: number;
  createdBy: string;
  createdAt: string;
  isDisabled: boolean; // Thêm thuộc tính này
  saveChanges: (updatedMealPlan: any) => Promise<void>;
}

// const MealSelectionForm: React.FC<{
//   day: Day;
//     editMode: boolean;
//   updateDay: (dayNumber: string, foodDetails: DayFoodDetails) => void;
// }> = ({ day, editMode, updateDay }) => {
//     const handleChange = (
//     mealType: keyof DayFoodDetails,
//     selectedFoods: string[],
//   ) => {
//     updateDay(day.dayNumber, { ...day.foodDetails, [mealType]: selectedFoods });
//   };

//   const { data: foodList, isLoading } = useGetAllFoods(1, 500, "");

//   return (
//     <div className="flex w-full">
//     <div className="w-2/3" >


//     <Form name={`form_${day.dayNumber}`} style={{ maxWidth: 600 }}>
//       {["sáng", "trưa", "tối", "phụ"].map((mealType) => (
//         <Form.Item key={mealType} label={`Bữa ${mealType}`}>
//           <Select
//             mode="multiple"
//             allowClear
//             value={day.foodDetails[mealType as keyof DayFoodDetails]}
//             disabled={!editMode || isLoading}
//             loading={isLoading}
//                         onChange={(values) =>
//               handleChange(mealType as keyof DayFoodDetails, values)
//             }
//           >
//             {foodList?.map((food) => (
//               <Select.Option key={food.foodId} value={food.foodId}>
//                 {food.foodName} {/* Hiển thị foodName */}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>
//       ))}
//     </Form>
//     </div>
//     <div className="w-1/3" >
//     <div>

   
//       <p className="flex justify-center text-xl font-semibold">Tổng calo</p>
//       <div className="space-y-5">
//       <p>Bữa sáng: </p>
//       <p>Bữa trưa: </p>
//       <p>Bữa tối: </p>
//       <p>Bữa phụ: </p>
//       </div>
//       </div>
//     </div>
//     </div>
//   );
// };

const MealSelectionForm: React.FC<{
  day: Day;
  editMode: boolean;
  updateDay: (dayNumber: string, foodDetails: DayFoodDetails) => void;
}> = ({ day, editMode, updateDay }) => {
  const handleChange = (
    mealType: keyof DayFoodDetails,
    selectedFoods: string[]
  ) => {
    updateDay(day.dayNumber, { ...day.foodDetails, [mealType]: selectedFoods });
  };

  const { data: foodList, isLoading } = useGetAllFoods(1, 500, "");

  return (
    <div>
    <div className="flex w-full">
      <div className="w-2/3">
        <Form name={`form_${day.dayNumber}`} style={{ maxWidth: 600 }}>
          {[ "Breakfast",
              "Lunch",
              "Dinner",
              "Snacks",].map((mealType) => (
            <Form.Item key={mealType} label={`${mealType}`}>
              <Select
                mode="multiple"
                allowClear
                value={day.foodDetails[mealType as keyof DayFoodDetails]}
                disabled={!editMode || isLoading} // Disable nếu không phải chế độ edit
                loading={isLoading}
                onChange={(values) =>
                                  handleChange(mealType as keyof DayFoodDetails, values as string[])
                                }
                showSearch
                filterOption={(input, option) => {
                  if (option?.label) {
                    return (option.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }
                  return false;
                }}
              >
                {foodList?.map((food) => (
                  <Select.Option key={food.foodId} value={food.foodId} label={food.foodName}
                  >
                    {food.foodName} {/* Hiển thị foodName */}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ))}
        </Form>
      </div>
      <div className="w-1/3">
        
      </div>
    </div>
    <div className="flex justify-between ">
    <div className="border-2 rounded-lg border-green-800  mb-5 ">
    <div className="flex justify-center bg-green-800 text-white p-3 w-full text-xl font-semibold">Total Calories</div>
          <div className="space-y-5 p-5">
            <p>Breakfast: {day.totalByMealType?.Breakfast?.calories} cal</p>
            <p>Lunch: {day.totalByMealType?.Lunch?.calories} cal</p>
            <p>Dinner: {day.totalByMealType?.Dinner?.calories} cal</p>
            <p>Snacks: {day.totalByMealType?.Snacks?.calories} cal</p>
            
          </div>
        </div>
        <div className="border-2 rounded-lg border-green-800  mb-5 ">
        <div className="flex justify-center bg-green-800 text-white p-3 w-full text-xl font-semibold">Total Fat</div>
          <div className="space-y-5 p-5">
            <p>Breakfast: {day.totalByMealType?.Breakfast?.fat} g</p>
            <p>Lunch: {day.totalByMealType?.Lunch?.fat} g</p>
            <p>Dinner: {day.totalByMealType?.Dinner?.fat} g</p>
            <p>Snacks: {day.totalByMealType?.Snacks?.fat} g</p>
            
          </div>
        </div>
        <div className="border-2 rounded-lg border-green-800  mb-5 ">
          <div className="flex justify-center bg-green-800 text-white p-3 w-full text-xl font-semibold">Total Carbs</div>
          <div className="space-y-5 p-5">
            <p>Breakfast: {day.totalByMealType?.Breakfast?.carbs} g</p>
            <p>Lunch: {day.totalByMealType?.Lunch?.carbs} g</p>
            <p>Dinner: {day.totalByMealType?.Dinner?.carbs} g</p>
            <p>Snacks: {day.totalByMealType?.Snacks?.carbs} g</p>
            
          </div>
        </div>
        <div className="border-2 rounded-lg border-green-800  mb-5 ">
          <div className="flex justify-center bg-green-800 text-white p-3 w-full text-xl font-semibold">Total Protein</div>
          <div className="space-y-5 p-5">
            <p>Breakfast: {day.totalByMealType?.Breakfast?.protein} g</p>
            <p>Lunch: {day.totalByMealType?.Lunch?.protein} g</p>
            <p>Dinner: {day.totalByMealType?.Dinner?.protein} g</p>
            <p>Snacks: {day.totalByMealType?.Snacks?.protein} g</p>
            
          </div>
        </div>
    </div>
    </div>
  );
};


// Removed duplicate React import block.

interface DayFoodDetails {
  Breakfast: string[];
  Lunch: string[];
  Dinner: string[];
  Snacks: string[];
}



interface UpdateMealPlanProps {
  mealPlanId: number;
  mealPlanDetails: Day[];
  planName: string;
  healthGoal: string;
  duration: number;
  createdBy: string;
  createdAt: string;
  isDisabled: boolean; // Thêm thuộc tính này
}

// Removed duplicate declaration of MealSelectionForm to avoid redeclaration error.

const UpdateMealPlan: React.FC<UpdateMealPlanProps> = ({
  mealPlanId,
  mealPlanDetails,
  planName,
  healthGoal,
  duration,
  createdBy,
  createdAt,
  isDisabled,
}) => {
  const [days, setDays] = useState<Day[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (mealPlanDetails?.length > 0) {
      setDays(mealPlanDetails);
    }
  }, [mealPlanDetails]);

  const toggleEditMode = useCallback((dayNumber: number) => {
    setEditMode((prev) => ({ ...prev, [dayNumber]: !prev[dayNumber] }));
  }, []);

  const addDay = useCallback(() => {
    setDays((prevDays) => [
      ...prevDays,
      {
        dayNumber: (prevDays.length + 1).toString(),
        foodDetails: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
        totalCalories: 0,totalCarbs: 0,totalFat: 0,totalProtein: 0,
      },
      
    ]);
  }, []);

  const updateDay = (dayNumber: string, foodDetails: DayFoodDetails) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber ? { ...day, foodDetails } : day
      ),
    );
  };

  const deleteDay = useCallback((dayNumber: number) => {
    setDays((prevDays) =>
      prevDays.filter((day) => day.dayNumber !== dayNumber.toString()),
    );
  }, []);

  const saveChanges = async () => {
    const mealPlanDetails = days.flatMap((day) =>
      Object.entries(day.foodDetails).flatMap(([mealType, foodIds]) =>
        foodIds.map((foodId: any) => ({
          foodId: Number(foodId),
          quantity: 1, // Điều chỉnh nếu cần
          mealType,
          dayNumber: Number(day.dayNumber),
        }))
      )
    );

    const params = {
      planName,
      healthGoal,
      mealPlanDetails,
    };

    try {
      await updateMealPlan(mealPlanId, params); // Hàm gọi API
      message.success("Cập nhật thực đơn thành công!");
    } catch (error) {
      message.error("Lỗi khi cập nhật thực đơn!");
    }
  };
  const userRole = Cookies.get("userRole");
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Meal plan detail</div>
        {userRole !== "Admin" && (
           <Button className="bg-green-800 text-white" onClick={addDay} disabled={isDisabled}>
           Add day
          </Button>
          )}
        {/* <Button className="bg-green-800 text-white" onClick={addDay} disabled={isDisabled}>
         Add day
        </Button> */}
      </div>
      {days.map((day) => (
        <div key={day.dayNumber} className="pt-10">
          <div
            className="flex w-full justify-between rounded-t-xl bg-green-800 p-3 font-semibold text-white"
            onClick={() => setOpen(open === day.dayNumber ? null : day.dayNumber)}
          >
            <div>{day.dayNumber}</div>
            <div className="action-buttons flex space-x-3">
              <DownOutlined className={`${open === day.dayNumber ? "rotate-180" : ""}`} />
              {/* {editMode[day.dayNumber] ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => toggleEditMode(Number(day.dayNumber))}
                  >
                    Save
                  </Button>
                  <Button onClick={() => toggleEditMode(Number(day.dayNumber))}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button disabled={isDisabled} onClick={() => toggleEditMode(Number(day.dayNumber))}>
                  Edit
                </Button>
              )}
              <Button
                className="bg-red-600 text-white"
                disabled={isDisabled}
                onClick={() => deleteDay(Number(day.dayNumber))}
              >
                Delete
              </Button> */}
              {editMode[day.dayNumber] ? (
                <>
                  {userRole !== "Admin" && (
                    <>
                      <Button
                        type="primary"
                        onClick={() => toggleEditMode(Number(day.dayNumber))}
                      >
                        Save
                      </Button>
                      <Button onClick={() => toggleEditMode(Number(day.dayNumber))}>
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              ) : (
                userRole !== "Admin" && (
                  <Button
                    disabled={isDisabled}
                    onClick={() => toggleEditMode(Number(day.dayNumber))}
                  >
                    Edit
                  </Button>
                )
              )}

              {/* Always render Delete button if not Admin */}
              {userRole !== "Admin" && (
                <Button
                  className="bg-red-600 text-white"
                  disabled={isDisabled}
                  onClick={() => deleteDay(Number(day.dayNumber))}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
          {open === day.dayNumber && (
            <div className="border-2 border-green-800 p-10">
              <MealSelectionForm
                day={day}
                editMode={!!editMode[day.dayNumber]}
                updateDay={updateDay}
              />
              <div className="bg-green-800 p-5 text-center text-lg font-semibold text-white">
                <p>Total calo: {day.totalCalories.toFixed(1)} Kcal</p>
                <p>Total carbs: {day.totalCarbs.toFixed(1)} g</p>
                <p>Total fat: {day.totalFat.toFixed(1)} g</p>
                <p>Total protein: {day.totalProtein.toFixed(1)} g</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default UpdateMealPlan;

