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

interface DayFoodDetails {
  sáng: string[];
  trưa: string[];
  tối: string[];
  phụ: string[];
}

interface Day {
  dayNumber: string;
  foodDetails: DayFoodDetails;
  totalCalories: number;
  totalByMealType?: {
    Breakfast?: { calories: number };
    Lunch?: { calories: number };
    Dinner?: { calories: number };
    Snacks?: { calories: number };
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
    <div className="flex w-full">
      <div className="w-2/3">
        <Form name={`form_${day.dayNumber}`} style={{ maxWidth: 600 }}>
          {["sáng", "trưa", "tối", "phụ"].map((mealType) => (
            <Form.Item key={mealType} label={`Bữa ${mealType}`}>
              <Select
                mode="multiple"
                allowClear
                value={day.foodDetails[mealType as keyof DayFoodDetails]}
                disabled={!editMode || isLoading} // Disable nếu không phải chế độ edit
                loading={isLoading}
                onChange={(values) =>
                  handleChange(mealType as keyof DayFoodDetails, values)
                }
              >
                {foodList?.map((food) => (
                  <Select.Option key={food.foodId} value={food.foodId}>
                    {food.foodName} {/* Hiển thị foodName */}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ))}
        </Form>
      </div>
      <div className="w-1/3">
        <div>
          <p className="flex justify-center text-xl font-semibold">Tổng calo</p>
          <div className="space-y-5">
            <p>Bữa sáng: {day.totalByMealType?.Breakfast?.calories} cal</p>
            <p>Bữa trưa: {day.totalByMealType?.Lunch?.calories} cal</p>
            <p>Bữa tối: {day.totalByMealType?.Dinner?.calories} cal</p>
            <p>Bữa phụ: {day.totalByMealType?.Snacks?.calories} cal</p>
            <p>Tổng cộng: {day.totalCalories} cal</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// Removed duplicate React import block.

interface DayFoodDetails {
  sáng: string[];
  trưa: string[];
  tối: string[];
  phụ: string[];
}

interface Day {
  dayNumber: string;
  foodDetails: DayFoodDetails;
  totalCalories: number;
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
        foodDetails: { sáng: [], trưa: [], tối: [], phụ: [] },
        totalCalories: 0,
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

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Chi tiết thực đơn</div>
        <Button className="bg-green-800 text-white" onClick={addDay} disabled={isDisabled}>
          Thêm ngày
        </Button>
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
              {editMode[day.dayNumber] ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => toggleEditMode(Number(day.dayNumber))}
                  >
                    Lưu
                  </Button>
                  <Button onClick={() => toggleEditMode(Number(day.dayNumber))}>
                    Hủy
                  </Button>
                </>
              ) : (
                <Button disabled={isDisabled} onClick={() => toggleEditMode(Number(day.dayNumber))}>
                  Sửa
                </Button>
              )}
              <Button
                className="bg-red-600 text-white"
                disabled={isDisabled}
                onClick={() => deleteDay(Number(day.dayNumber))}
              >
                Xóa
              </Button>
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
                Tổng calo: {day.totalCalories} cal
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default UpdateMealPlan;

