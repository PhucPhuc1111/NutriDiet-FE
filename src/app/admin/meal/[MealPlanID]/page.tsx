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
//   const [isDisabled, setisDisabled] = useState<boolean>(true);
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   const {
//     data: mealPlan,
//     isLoading,
//     isError,
//   } = useGetMealPlanById(Number(mealPlanId));

//   const handleEdit = () => {
//     setIsEditing(true);
//     setisDisabled(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setisDisabled(true);
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
//                 disabled={isDisabled}
//               />
//             </Form.Item>

//             <Form.Item name="healthGoal" label="Mục tiêu sức khỏe">
//               <Select
//                 defaultValue={mealPlan.healthGoal}
//                 disabled={isDisabled}
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
//                 disabled={isDisabled}
//               />
//             </Form.Item>

//             <Form.Item name="createdBy" label="Tạo bởi">
//               <Input
//                 defaultValue={mealPlan.createdBy}
//                 disabled={isDisabled}
//               />
//             </Form.Item>

//             <Form.Item name="createdAt" label="Tạo vào">
//               <Input
//                 defaultValue={mealPlan.createdAt}
//                 disabled={isDisabled}
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
'use client';
import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input, Select, InputNumber, Spin, message } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetMealPlanById, MealPlanDetail, Day } from "@/app/data";
import { updateMealPlan } from "@/app/data"; // Giả sử có hàm updateMealPlan từ data API
import UpdateMealDaily from "@/components/MealPlan/UpdateMealDaily";

const MealPlanDetailPage = () => {
  const { MealPlanID } = useParams();
  const mealPlanId = MealPlanID;
  const [isEditing, setIsEditing] = useState(false);
  const [mealPlan, setMealPlan] = useState<any>(null); // State lưu trữ mealPlan sau khi được cập nhật
  const [isDisabled, setIsDisabled] = useState(true);

  const { data, isLoading, isError } = useGetMealPlanById(Number(mealPlanId));

  useEffect(() => {
    if (data) {
      setMealPlan(data);
    }
  }, [data]);

  const handleEdit = () => {
    setIsEditing(true);
    setIsDisabled(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsDisabled(true);
  };
  const saveChanges = async () => {
    const updatedData = {
      mealPlanId: mealPlan?.mealPlanId,  // mealPlanId phải có
      planName: mealPlan?.planName || "",  // Đảm bảo planName có giá trị
      healthGoal: mealPlan?.healthGoal || "",  // Đảm bảo healthGoal có giá trị
      duration: mealPlan?.duration || 0,  // Nếu không có duration thì mặc định là 0
      mealPlanDetails: mealPlan?.mealPlanDetails || [],  // Đảm bảo mealPlanDetails không phải null hoặc undefined
    };
  
    // Kiểm tra lại nếu các trường bắt buộc trống
    if (!updatedData.planName || !updatedData.healthGoal || updatedData.mealPlanDetails.length === 0) {
      message.error("Vui lòng điền đầy đủ thông tin kế hoạch bữa ăn.");
      return;  // Dừng lại nếu thiếu thông tin quan trọng
    }
  
    try {
      // Gửi dữ liệu lên API để cập nhật kế hoạch bữa ăn
      await updateMealPlan(mealPlan?.mealPlanId, updatedData);
      setMealPlan(updatedData); // Cập nhật dữ liệu đã thay đổi trong state
      setIsEditing(false);
      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating meal plan:", error);
      message.error("Lỗi khi cập nhật thực đơn!");
    }
  };
  

  const transformMealPlanDetails = (mealPlanDetails: MealPlanDetail[]): Day[] => {
    const groupedDays: Record<string, { sáng: string[]; trưa: string[]; tối: string[]; phụ: string[]; totalCalories: number }> = {};

    mealPlanDetails.forEach((detail) => {
        if (!groupedDays[detail.dayNumber]) {
          groupedDays[detail.dayNumber] = { sáng: [], trưa: [], tối: [], phụ: [], totalCalories: 0 };
        }

      const mealTypeMap: Record<string, keyof Day["foodDetails"]> = {
        "Breakfast": "sáng",
        "Lunch": "trưa",
        "Dinner": "tối",
        "Snacks": "phụ",
      };

      const mealType = mealTypeMap[detail.mealType];

      if (mealType) {
        groupedDays[detail.dayNumber][mealType].push(detail.foodName);
      }

      groupedDays[detail.dayNumber].totalCalories += detail.totalCalories;
    });

    return Object.entries(groupedDays).map(([dayNumber, { totalCalories, ...foodDetails }]) => ({
      dayNumber,
      foodDetails,
      totalCalories,
    }));
  };

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

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <Link href="/admin/meal">
          <div className="cursor-pointer p-3">Trở về</div>
        </Link>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <Button className="h-10 p-3" onClick={handleCancel}>
                Hủy
              </Button>
              <Button className="h-10 p-3" type="primary" onClick={saveChanges}>
                Lưu kế hoạch bữa ăn
              </Button>
            </>
          ) : (
            <Button className="h-10 p-3" onClick={handleEdit}>
              Sửa kế hoạch bữa ăn
            </Button>
          )}
        </div>
      </div>

      <div className="w-full rounded-lg border-2 border-green-800">
        <div className="px-10 py-5 text-lg font-bold">Chi tiết kế hoạch bữa ăn</div>
        <div className="px-10">
          <Form name="mealPlanForm">
            <Form.Item name="planName" label="Tên kế hoạch">
              <Input defaultValue={mealPlan.planName} disabled={isDisabled} />
            </Form.Item>

            <Form.Item name="healthGoal" label="Mục tiêu sức khỏe">
              <Select defaultValue={mealPlan.healthGoal} disabled={isDisabled}>
                <Select.Option value="Tăng cân">Tăng cân</Select.Option>
                <Select.Option value="Giảm cân">Giảm cân</Select.Option>
                <Select.Option value="Giữ cân">Giữ cân</Select.Option>
                <Select.Option value="Tăng cân giảm mỡ">Tăng cân giảm mỡ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="duration" label="Thời gian hoàn thành">
              <InputNumber defaultValue={mealPlan.duration} disabled={isDisabled} />
            </Form.Item>

            <Form.Item name="createdBy" label="Tạo bởi">
              <Input defaultValue={mealPlan.createdBy} disabled={isDisabled} />
            </Form.Item>

            <Form.Item name="createdAt" label="Tạo vào">
              <Input defaultValue={mealPlan.createdAt} disabled={isDisabled} />
            </Form.Item>
          </Form>
        </div>

        <div className="space-y-5 p-10">
          <UpdateMealDaily
            mealPlanDetails={transformMealPlanDetails(mealPlan.mealPlanDetails)}
            mealPlanId={Number(mealPlanId)}
            planName={mealPlan.planName}
            healthGoal={mealPlan.healthGoal}
            duration={mealPlan.duration}
            createdBy={mealPlan.createdBy}
            createdAt={mealPlan.createdAt}
            isDisabled={isDisabled}
            saveChanges={saveChanges}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MealPlanDetailPage;
