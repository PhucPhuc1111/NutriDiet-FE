import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
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
    <Form
      name={`form_${day.dayNumber}`}
      style={{ maxWidth: 600 }}
      disabled={!editMode}
    >
      {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => (
        <Form.Item key={mealType} label={`Bữa ${mealType}`}>
          <Select
            placeholder={`Chọn bữa ${mealType}`}
            allowClear
            mode="multiple"
            value={day.foodDetails[mealType as keyof DayFoodDetails]} // Giữ nguyên
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

const AddMealDaily: React.FC<Props> = ({ onChange = () => {} }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});

  useEffect(() => {
    onChange(days);
  }, [days, onChange]);

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

  const deleteDay = useCallback((dayNumber: string) => {
    setDays((prevDays) =>
      prevDays.filter((day) => day.dayNumber !== dayNumber),
    );
  }, []);

  const toggleEditMode = useCallback((dayNumber: string) => {
    setEditMode((prev) => ({ ...prev, [dayNumber]: !prev[dayNumber] }));
  }, []);

  const updateDay = (dayNumber: string, foodDetails: DayFoodDetails) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayNumber === dayNumber ? { ...day, foodDetails } : day,
      ),
    );
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Danh sách các ngày</div>
        <Button className="bg-green-800 text-white" onClick={addDay}>
          Thêm ngày
        </Button>
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
                <>
                  <Button
                    type="primary"
                    onClick={() => toggleEditMode(day.dayNumber)}
                  >
                    Lưu
                  </Button>
                  <Button onClick={() => toggleEditMode(day.dayNumber)}>
                    Hủy
                  </Button>
                </>
              ) : (
                <Button onClick={() => toggleEditMode(day.dayNumber)}>
                  Sửa
                </Button>
              )}
              <Button
                className="bg-red-600 text-white"
                onClick={() => deleteDay(day.dayNumber)}
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

export default AddMealDaily;
