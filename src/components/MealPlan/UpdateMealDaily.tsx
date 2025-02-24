import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { useGetAllFoods } from "@/app/data";

// Định nghĩa kiểu dữ liệu
interface DayFoodDetails {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  evening: string[];
}

interface Day {
  dayNumber: string;
  foodDetails: DayFoodDetails;
  totalCalories: number;
}

interface UpdateMealDailyProps {
  isEditing: boolean;
  mealPlanDetails: Day[];
}

// Component Form chọn bữa ăn
const MealSelectionForm: React.FC<{ day: Day; editMode: boolean }> = ({ day, editMode }) => {
  const { data: foodList, isLoading } = useGetAllFoods(1, 100, ""); // Lấy danh sách món ăn

  return (
    <Form name={`form_${day.dayNumber}`} style={{ maxWidth: 600 }} disabled={!editMode}>
      {["breakfast", "lunch", "dinner", "evening"].map((mealType) => (
        <Form.Item key={mealType} label={`Bữa ${mealType}`}>
          <Select
            placeholder={`Chọn bữa ${mealType}`}
            allowClear
            mode="multiple"
            value={day.foodDetails[mealType as keyof DayFoodDetails]}
            disabled={!editMode || isLoading}
            loading={isLoading}
          >
            {editMode
              ? foodList?.map((food) => (
                  <Select.Option key={food.foodId} value={food.foodName}>
                    {food.foodName}
                  </Select.Option>
                ))
              : day.foodDetails[mealType as keyof DayFoodDetails].map((food) => (
                  <Select.Option key={food} value={food}>
                    {food}
                  </Select.Option>
                ))}
          </Select>
        </Form.Item>
      ))}
      </Form>
    );
  };

const UpdateMealDaily: React.FC<UpdateMealDailyProps> = ({ isEditing, mealPlanDetails }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [days, setDays] = useState<Day[]>([]);

  // Cập nhật danh sách ngày khi có mealPlanDetails mới
  useEffect(() => {
    if (mealPlanDetails?.length > 0) {
      setDays(mealPlanDetails.map((day, index) => ({ ...day, dayNumber: `Ngày ${index + 1}` })));
    }
  }, [mealPlanDetails]);

  // Thêm ngày mới
  const addDay = useCallback(() => {
    setDays((prevDays) => [
      ...prevDays,
      {
        dayNumber: `Ngày ${prevDays.length + 1}`,
        foodDetails: { breakfast: [], lunch: [], dinner: [], evening: [] },
        totalCalories: 0,
      },
    ]);
  }, []);

  // Xóa ngày
  const deleteDay = useCallback((dayNumber: string) => {
    setDays((prevDays) => prevDays.filter((day) => day.dayNumber !== dayNumber));
  }, []);

  // Bật/tắt chế độ chỉnh sửa
  const toggleEditMode = useCallback((dayNumber: string) => {
    setEditMode((prev) => ({ ...prev, [dayNumber]: !prev[dayNumber] }));
  }, []);

  // Lưu chỉnh sửa
  const onSave = useCallback((dayNumber: string) => {
    console.log("Lưu thay đổi cho:", dayNumber, days);
    setEditMode((prev) => ({ ...prev, [dayNumber]: false }));
  }, [days]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Danh sách các ngày</div>
        {isEditing && <Button className="bg-green-800 text-white" onClick={addDay}>Thêm ngày</Button>}
      </div>

      {days.map((day) => (
        <div key={day.dayNumber} className="pt-10">
          {/* Header ngày */}
          <div
            className="flex w-full justify-between rounded-t-xl bg-green-800 p-3 font-semibold text-white"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest(".action-buttons")) {
                setOpen(open === day.dayNumber ? null : day.dayNumber);
              }
            }}
          >
            <div>{day.dayNumber}</div>
            <div className="flex space-x-3 action-buttons">
              <DownOutlined className={`${open === day.dayNumber ? "rotate-180" : ""}`} />
              {isEditing && (
                <>
                  {editMode[day.dayNumber] ? (
                    <>
                      <Button type="primary" onClick={() => onSave(day.dayNumber)}>Lưu</Button>
                      <Button onClick={() => toggleEditMode(day.dayNumber)}>Hủy</Button>
                    </>
                  ) : (
                    <Button onClick={() => toggleEditMode(day.dayNumber)}>Sửa</Button>
                  )}
                  <Button className="bg-red-600 text-white" onClick={() => deleteDay(day.dayNumber)}>Xóa</Button>
                </>
              )}
            </div>
          </div>

          {/* Nội dung ngày */}
          {open === day.dayNumber && (
            <div className="border-2 border-green-800 p-10">
              <div className="flex">
                {/* Form chọn bữa ăn */}
                <div className="w-3/4 border-r-2 border-green-800">
                  <MealSelectionForm day={day} editMode={!!editMode[day.dayNumber]} />
                </div>
                {/* Tổng calories */}
                <div className="w-1/4 space-y-3">
                  <div className="bg-green-800 p-5 text-center text-lg font-semibold text-white">
                    Tổng calo: {day.totalCalories} cal
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpdateMealDaily;
