// "use client";
// import React, { useState } from "react";
// import { Button, Form, Input, Select, InputNumber, Spin } from "antd";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import {
//   Day,
//   DayFoodDetails,
//   MealPlanDetail,
//   useGetMealPlanById,
// } from "@/app/data";
// import UpdateMealDaily from "@/components/MealPlan/UpdateMealDaily";

// const MealPlanDetailPage = () => {
//   const { MealPlanID } = useParams();
//   const mealPlanId = MealPlanID;
//   console.log(mealPlanId);
//   const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   const {
//     data: mealPlan,
//     isLoading,
//     isError,
//   } = useGetMealPlanById(Number(mealPlanId));

//   const handleEdit = () => {
//     setIsEditing(true);
//     setComponentDisabled(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setComponentDisabled(true);
//   };

//   if (isLoading) {
//     return (
//       <DefaultLayout>
//         <div className="flex h-screen items-center justify-center">
//           <Spin size="large" />
//         </div>
//       </DefaultLayout>
//     );
//   }

//   if (isError || !mealPlan) {
//     return (
//       <DefaultLayout>
//         <p className="text-center text-red-500">Không tìm thấy kế hoạch ăn.</p>
//       </DefaultLayout>
//     );
//   }
//   const transformMealPlanDetails = (
//     mealPlanDetails: MealPlanDetail[],
//   ): Day[] => {
//     const groupedDays: Record<
//       string,
//       DayFoodDetails & { totalCalories: number }
//     > = {};

//     mealPlanDetails.forEach((detail) => {
//       if (!groupedDays[detail.dayNumber]) {
//         groupedDays[detail.dayNumber] = {
//           breakfast: [],
//           lunch: [],
//           dinner: [],
//           evening: [],
//           totalCalories: 0,
//         };
//       }

//       // Mapping từ tiếng Việt sang key chuẩn
//       const mealTypeMap: Record<string, keyof DayFoodDetails> = {
//         "Bữa sáng": "breakfast",
//         "Bữa trưa": "lunch",
//         "Bữa tối": "dinner",
//         "Bữa phụ": "evening",
//       };

//       const mealType = mealTypeMap[detail.mealType];

//       if (mealType) {
//         groupedDays[detail.dayNumber][mealType].push(
//           detail.foodName.toString(),
//         );
//       } else {
//         console.warn(`⚠️ Meal type không hợp lệ: ${detail.mealType}`);
//       }

//       groupedDays[detail.dayNumber].totalCalories += detail.totalCalories;
//     });

//     return Object.entries(groupedDays).map(
//       ([dayNumber, { totalCalories, ...foodDetails }]) => ({
//         dayNumber,
//         foodDetails,
//         totalCalories,
//       }),
//     );
//   };

//   return (
//     <DefaultLayout>
//       <div className="flex justify-between">
//         <Link href="/admin/meal">
//           <div className="cursor-pointer p-3">Trở về</div>
//         </Link>
//         <div className="flex space-x-4">
//           {isEditing ? (
//             <>
//               <Button className="h-10 p-3" onClick={handleCancel}>
//                 Hủy
//               </Button>
//               <Button className="h-10 p-3" type="primary">
//                 Lưu kế hoạch bữa ăn
//               </Button>
//             </>
//           ) : (
//             <Button className="h-10 p-3" onClick={handleEdit}>
//               Sửa kế hoạch bữa ăn
//             </Button>
//           )}
//         </div>
//       </div>

//       <div className="w-full rounded-lg border-2 border-green-800">
//         <div className="px-10 py-5 text-lg font-bold">
//           Chi tiết kế hoạch bữa ăn
//         </div>
//         <div className="px-10">
//           <Form name="mealPlanForm">
//             <Form.Item name="planName" label="Tên kế hoạch">
//               <Input
//                 defaultValue={mealPlan.planName}
//                 disabled={componentDisabled}
//               />
//             </Form.Item>

//             <Form.Item name="healthGoal" label="Mục tiêu sức khỏe">
//               <Select
//                 defaultValue={mealPlan.healthGoal}
//                 disabled={componentDisabled}
//               >
//                 <Select.Option value="Tăng cân">Tăng cân</Select.Option>
//                 <Select.Option value="Giảm cân">Giảm cân</Select.Option>
//                 <Select.Option value="Giữ cân">Giữ cân</Select.Option>
//                 <Select.Option value="Tăng cân giảm mỡ">
//                   Tăng cân giảm mỡ
//                 </Select.Option>
//               </Select>
//             </Form.Item>

//             <Form.Item name="duration" label="Thời gian hoàn thành">
//               <InputNumber
//                 defaultValue={mealPlan.duration}
//                 disabled={componentDisabled}
//               />
//             </Form.Item>

//             <Form.Item name="createdBy" label="Tạo bởi">
//               <Input
//                 defaultValue={mealPlan.createdBy}
//                 disabled={componentDisabled}
//               />
//             </Form.Item>

//             <Form.Item name="createdAt" label="Tạo vào">
//               <Input
//                 defaultValue={mealPlan.createdAt}
//                 disabled={componentDisabled}
//               />
//             </Form.Item>
//           </Form>
//         </div>

//         <div className="space-y-5 p-10">
//           <UpdateMealDaily
//             mealPlanDetails={transformMealPlanDetails(mealPlan.mealPlanDetails)}
//             mealPlanId={0}
//             planName={""}
//             healthGoal={""}
//             duration={0}
//             createdBy={""}
//             createdAt={""}
//           />
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default MealPlanDetailPage;
"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, InputNumber, Spin } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Day,
  DayFoodDetails,
  MealPlanDetail,
  useGetMealPlanById,
} from "@/app/data";
import UpdateMealDaily from "@/components/MealPlan/UpdateMealDaily";

const MealPlanDetailPage = () => {
  const { MealPlanID } = useParams();
  const mealPlanId = MealPlanID;
  console.log(mealPlanId);

  const {
    data: mealPlan,
    isLoading,
    isError,
  } = useGetMealPlanById(Number(mealPlanId));

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex h-screen items-center justify-center">
          <Spin size="large" />
        </div>
      </DefaultLayout>
    );
  }

  if (isError || !mealPlan) {
    return (
      <DefaultLayout>
        <p className="text-center text-red-500">Không tìm thấy kế hoạch ăn.</p>
      </DefaultLayout>
    );
  }

  const transformMealPlanDetails = (
    mealPlanDetails: MealPlanDetail[],
  ): Day[] => {
    const groupedDays: Record<
      string,
      DayFoodDetails & { totalCalories: number }
    > = {};
  
    mealPlanDetails.forEach((detail) => {
      if (!groupedDays[detail.dayNumber]) {
        groupedDays[detail.dayNumber] = {
          breakfast: [],
          lunch: [],
          dinner: [],
          evening: [],
          totalCalories: 0,
        };
      }
  
      // Cập nhật bảng ánh xạ từ mealType của API
      const mealTypeMap: Record<string, keyof DayFoodDetails> = {
        "breakfast": "breakfast",
        "lunch": "lunch",
        "dinner": "dinner",
        "snacks": "evening",  // Sử dụng "snacks" cho bữa phụ
      };
  
      const mealType = mealTypeMap[detail.mealType];
  
      if (mealType) {
        groupedDays[detail.dayNumber][mealType].push(detail.foodName);
      } else {
        console.warn(`⚠️ Meal type không hợp lệ: ${detail.mealType}`);
      }
  
      groupedDays[detail.dayNumber].totalCalories += detail.totalCalories;
    });
  
    return Object.entries(groupedDays).map(
      ([dayNumber, { totalCalories, ...foodDetails }]) => ({
        dayNumber,
        foodDetails,
        totalCalories,
      }),
    );
  };
  

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <Link href="/admin/meal">
          <div className="cursor-pointer p-3">Trở về</div>
        </Link>
      </div>

      <div className="w-full rounded-lg border-2 border-green-800">
        <div className="px-10 py-5 text-lg font-bold">
          Chi tiết kế hoạch bữa ăn
        </div>
        <div className="px-10">
          <Form name="mealPlanForm">
            <Form.Item name="planName" label="Tên kế hoạch">
              <Input defaultValue={mealPlan.planName} disabled />
            </Form.Item>

            <Form.Item name="healthGoal" label="Mục tiêu sức khỏe">
              <Select defaultValue={mealPlan.healthGoal} disabled>
                <Select.Option value="Tăng cân">Tăng cân</Select.Option>
                <Select.Option value="Giảm cân">Giảm cân</Select.Option>
                <Select.Option value="Giữ cân">Giữ cân</Select.Option>
                <Select.Option value="Tăng cân giảm mỡ">
                  Tăng cân giảm mỡ
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="duration" label="Thời gian hoàn thành">
              <InputNumber defaultValue={mealPlan.duration} disabled />
            </Form.Item>

            <Form.Item name="createdBy" label="Tạo bởi">
              <Input defaultValue={mealPlan.createdBy} disabled />
            </Form.Item>

            <Form.Item name="createdAt" label="Tạo vào">
              <Input defaultValue={mealPlan.createdAt} disabled />
            </Form.Item>
          </Form>
        </div>

        <div className="space-y-5 p-10">
          <UpdateMealDaily
            mealPlanDetails={transformMealPlanDetails(mealPlan.mealPlanDetails)}
            mealPlanId={0}
            planName={""}
            healthGoal={""}
            duration={0}
            createdBy={""}
            createdAt={""}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MealPlanDetailPage;
