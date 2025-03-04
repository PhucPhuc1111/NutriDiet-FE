import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select, message } from "antd";
import { useGetAllFoods } from "@/app/data";

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

interface UpdateMealPlanProps {
  mealPlanDetails: Day[];
  onUpdateMealPlan: (updatedDays: Day[]) => Promise<void>;
}

const MealSelectionForm: React.FC<{
  day: Day;
  editMode: boolean;
  updateDay: (dayNumber: string, foodDetails: DayFoodDetails) => void;
}> = ({ day, editMode, updateDay }) => {
  const { data: foodList, isLoading } = useGetAllFoods(1, 100, "");

  const handleChange = (
    mealType: keyof DayFoodDetails,
    selectedFoods: string[],
  ) => {
    updateDay(day.dayNumber, { ...day.foodDetails, [mealType]: selectedFoods });
  };

  return (
    <Form name={`form_${day.dayNumber}`} style={{ maxWidth: 600 }}>
      {["breakfast", "lunch", "dinner", "evening"].map((mealType) => (
        <Form.Item key={mealType} label={`Bữa ${mealType}`}>
          <Select
            mode="multiple"
            allowClear
            value={day.foodDetails[mealType as keyof DayFoodDetails]}
            disabled={!editMode || isLoading}
            loading={isLoading}
            onChange={(values) =>
              handleChange(mealType as keyof DayFoodDetails, values)
            }
          >
            {foodList?.map((food) => (
              <Select.Option key={food.foodId} value={food.foodId}>
                {food.foodName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ))}
    </Form>
  );
};

const UpdateMealPlan: React.FC<UpdateMealPlanProps> = ({
  mealPlanDetails,
  onUpdateMealPlan,
}) => {
  const [days, setDays] = useState<Day[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (mealPlanDetails?.length > 0) {
      setDays(mealPlanDetails);
    }
  }, [mealPlanDetails]);

  const updateDay = (dayNumber: string, foodDetails: DayFoodDetails) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber ? { ...day, foodDetails } : day,
      ),
    );
  };

  const saveChanges = async () => {
    try {
      await onUpdateMealPlan(days);
      message.success("Cập nhật thực đơn thành công!");
    } catch (error) {
      message.error("Lỗi khi cập nhật thực đơn!");
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Cập nhật thực đơn</div>
      </div>
      {days.map((day) => (
        <div key={day.dayNumber} className="pt-10">
          <div
            className="flex w-full justify-between rounded-t-xl bg-green-800 p-3 font-semibold text-white"
            onClick={() =>
              setOpen(open === day.dayNumber ? null : day.dayNumber)
            }
          >
            <div>{day.dayNumber}</div>
            <div className="action-buttons flex space-x-3">
              <DownOutlined
                className={`${open === day.dayNumber ? "rotate-180" : ""}`}
              />
              {editMode[day.dayNumber] ? (
                <Button
                  type="primary"
                  onClick={() =>
                    setEditMode((prev) => ({
                      ...prev,
                      [day.dayNumber]: false,
                    }))
                  }
                >
                  Lưu
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setEditMode((prev) => ({
                      ...prev,
                      [day.dayNumber]: true,
                    }))
                  }
                >
                  Sửa
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
                Tổng calo: {day.totalCalories} cal
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-5 flex justify-end">
        <Button type="primary" onClick={saveChanges}>
          Cập nhật thực đơn
        </Button>
      </div>
    </div>
  );
};

export default UpdateMealPlan;
