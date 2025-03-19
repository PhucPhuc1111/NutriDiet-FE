import React, { useState, useEffect, useCallback } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { useGetAllFoods } from "@/app/data";
import { DayMeal } from "@/app/admin/meal/create-meal/page";

interface MealSelectionFormProps {
  day: DayMeal;
  editMode: boolean;
  updateDay: (dayNumber: number, foodDetails: DayMeal["foodDetails"]) => void;
}

const MealSelectionForm: React.FC<MealSelectionFormProps> = ({
  day,
  editMode,
  updateDay,
}) => {
  const { data: foodList, isLoading } = useGetAllFoods(1, 100, "");

  const handleChange = (
    mealType: keyof DayMeal["foodDetails"],
    selectedFoods: number[],
  ) => {
    updateDay(day.dayNumber, { ...day.foodDetails, [mealType]: selectedFoods });
  };

  return (
    <Form
      name={`form_${day.dayNumber}`}
      style={{ maxWidth: 600 }}
      disabled={!editMode}
    >
      {(
        [
          "breakfast",
          "lunch",
          "dinner",
          "snacks",
        ] as (keyof DayMeal["foodDetails"])[]
      ).map((mealType) => (
        // <Form.Item key={mealType} label={`Bữa ${mealType}`}>
        //   <Select
        //     placeholder={`Chọn bữa ${mealType}`}
        //     allowClear
        //     mode="multiple"
        //     value={day.foodDetails[mealType]}
        //     disabled={!editMode || isLoading}
        //     loading={isLoading}
        //     onChange={(values) => handleChange(mealType, values as number[])}
        //   >
        //     {foodList?.map((food) => (
        //       <Select.Option key={food.foodId} value={food.foodId}>
        //         {food.foodName}
        //       </Select.Option>
        //     ))}
        //   </Select>
        // </Form.Item>
        <Form.Item key={mealType} label={`Bữa ${mealType}`}>
  <Select
    placeholder={`Chọn bữa ${mealType}`}
    allowClear
    mode="multiple"
    value={day.foodDetails[mealType]}
    disabled={!editMode || isLoading}
    loading={isLoading}
    onChange={(values) => handleChange(mealType, values as number[])}
    showSearch // Bật tính năng tìm kiếm
    filterOption={(input, option) => {
      // Đảm bảo 'option?.label' là chuỗi trước khi so sánh
      if (option?.label) {
        return (option.label as string).toLowerCase().includes(input.toLowerCase());
      }
      return false;
    }}
  >
    {foodList?.map((food) => (
      <Select.Option key={food.foodId} value={food.foodId} label={food.foodName}>
        {food.foodName}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
      ))}
    </Form>
  );
};

interface AddMealDailyProps {
  onChange: (days: DayMeal[]) => void;
}

const AddMealDaily: React.FC<AddMealDailyProps> = ({ onChange = () => {} }) => {
  const [days, setDays] = useState<DayMeal[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<Record<number, boolean>>({});

  useEffect(() => {
    onChange(days);
  }, [days, onChange]);

  const addDay = useCallback(() => {
    setDays((prevDays) => [
      ...prevDays,
      {
        dayNumber: prevDays.length + 1,
        foodDetails: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        totalCalories: 0,
      },
    ]);
  }, []);

  const deleteDay = useCallback((dayNumber: number) => {
    setDays((prevDays) =>
      prevDays.filter((day) => day.dayNumber !== dayNumber),
    );
  }, []);

  const toggleEditMode = useCallback((dayNumber: number) => {
    setEditMode((prev) => ({ ...prev, [dayNumber]: !prev[dayNumber] }));
  }, []);

  const updateDay = (
    dayNumber: number,
    foodDetails: DayMeal["foodDetails"],
  ) => {
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
            <div>{`Ngày ${day.dayNumber}`}</div>
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
