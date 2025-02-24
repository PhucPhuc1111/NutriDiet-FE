import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";

// Define the food details structure
interface DayFoodDetails {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  evening: string[];
}

// Define the day structure
interface Day {
  dayNumber: string;
  foodDetails: DayFoodDetails;
  totalCalories: number;
}

const AddMealDaily = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [days, setDays] = useState<Day[]>([
    {
      dayNumber: "Ngày 1",
      foodDetails: { breakfast: [], lunch: [], dinner: [], evening: [] },
      totalCalories: 0,
    },
  ]);

  const onFinish = (dayNumber: string) => {
    console.log("Submitting meal plan for:", dayNumber, days);
    setEditMode((prev) => ({ ...prev, [dayNumber]: false }));
  };

  const addDay = () => {
    setDays([
      ...days,
      {
        dayNumber: `Ngày ${days.length + 1}`,
        foodDetails: { breakfast: [], lunch: [], dinner: [], evening: [] },
        totalCalories: 0,
      },
    ]);
  };

  const deleteDay = (dayNumber: string) => {
    const updatedDays = days.filter((day) => day.dayNumber !== dayNumber);
    setDays(updatedDays);
  };

  const toggleDropdown = (dayNumber: string) => {
    setOpen(open === dayNumber ? null : dayNumber);
  };

  const calculateMealCalories = (foodItems: string[]): number => {
    const calorieValues: Record<string, number> = {
      "Phở bò": 350,
      "Phở gà": 200,
      "Cơm sườn": 300,
      "Bún bò huế": 250,
    };
    return foodItems.reduce(
      (total, food) => total + (calorieValues[food] || 0),
      0,
    );
  };

  // Update food selection for each day and calculate total calories
  const updateFoodSelection = (
    dayNumber: string,
    mealType: keyof DayFoodDetails,
    selectedFood: string[],
  ) => {
    const newDays = days.map((day) => {
      if (day.dayNumber === dayNumber) {
        const newFoodDetails = { ...day.foodDetails, [mealType]: selectedFood };
        const totalCalories = Object.values(newFoodDetails).reduce(
          (total, meal) => total + calculateMealCalories(meal),
          0,
        );
        return {
          ...day,
          foodDetails: newFoodDetails,
          totalCalories: totalCalories,
        };
      }
      return day;
    });
    setDays(newDays);
  };

  const toggleEditMode = (dayNumber: string) => {
    setEditMode((prev) => ({
      ...prev,
      [dayNumber]: !prev[dayNumber], // Toggle edit mode
    }));
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Danh sách các ngày</div>
        <Button className="bg-green-800 text-white" onClick={addDay}>
          Thêm ngày
        </Button>
      </div>

      {days.map((day, index) => (
        <div key={index} className="pt-10">
          <div
            className="flex w-full justify-between rounded-t-xl bg-green-800 p-3 font-semibold text-white"
            onClick={() => toggleDropdown(day.dayNumber)}
          >
            <div>{day.dayNumber}</div>
            <div className="flex space-x-3">
              <DownOutlined
                className={`${open === day.dayNumber ? "rotate-180" : ""}`}
              />
              {editMode[day.dayNumber] ? (
                <>
                  <Button
                    className=""
                    type="primary"
                    onClick={() => onFinish(day.dayNumber)}
                  >
                    Lưu
                  </Button>
                  <Button
                    className=""
                    onClick={() => toggleEditMode(day.dayNumber)}
                  >
                    Hủy
                  </Button>
                </>
              ) : (
                <Button
                  className=""
                  onClick={() => toggleEditMode(day.dayNumber)}
                >
                  Sửa
                </Button>
              )}

              <Button
                className="bg-red-600 text-white "
                onClick={() => deleteDay(day.dayNumber)}
              >
                Xóa
              </Button>
            </div>
          </div>

          {open === day.dayNumber && (
            <div className="border-2 border-green-800 p-10">
              <div className="flex">
                <div className="w-3/4 border-r-2 border-green-800">
                  <div>{day.dayNumber}</div>
                  <Form
                    name={`form_${day.dayNumber}`} // Unique name for each form
                    className="text-white"
                    onFinish={() => onFinish(day.dayNumber)}
                    initialValues={day.foodDetails}
                    style={{ maxWidth: 600 }}
                    disabled={!editMode[day.dayNumber]} // Disable form if not in edit mode
                  >
                    {["breakfast", "lunch", "dinner", "evening"].map(
                      (mealType) => (
                        <Form.Item
                          key={mealType}
                          name={mealType}
                          label={`Bữa ${mealType}`}
                          rules={[
                            {
                              required: true,
                              message: `Bữa ${mealType} là bắt buộc`,
                            },
                          ]}
                        >
                          <Select
                            placeholder={`Chọn bữa ${mealType}`}
                            allowClear
                            mode="multiple"
                            onChange={(selectedFood) =>
                              updateFoodSelection(
                                day.dayNumber,
                                mealType as keyof DayFoodDetails,
                                selectedFood,
                              )
                            }
                          >
                            <Select.Option value="Phở bò">Phở bò</Select.Option>
                            <Select.Option value="Phở gà">Phở gà</Select.Option>
                            <Select.Option value="Cơm sườn">
                              Cơm sườn
                            </Select.Option>
                            <Select.Option value="Bún bò huế">
                              Bún bò huế
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      ),
                    )}
                  </Form>
                </div>
                <div className="w-1/4 space-y-3">
                  <div className="space-y-4 p-5">
                    <div className="flex justify-center bg-green-800 text-lg font-semibold text-white">
                      Tổng calo {day.dayNumber}
                    </div>
                    <div className="flex justify-center space-x-4 border-b-2 border-green-800">
                      <div className="space-y-3">
                        <p>Bữa sáng:</p>
                        <p>Bữa trưa:</p>
                        <p>Bữa chiều:</p>
                        <p>Bữa tối:</p>
                      </div>
                      <div className="space-y-3 pb-2">
                        <p>
                          {calculateMealCalories(day.foodDetails.breakfast)} cal
                        </p>
                        <p>
                          {calculateMealCalories(day.foodDetails.lunch)} cal
                        </p>
                        <p>
                          {calculateMealCalories(day.foodDetails.dinner)} cal
                        </p>
                        <p>
                          {calculateMealCalories(day.foodDetails.evening)} cal
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="p-2">Tổng cộng:</div>
                      <div className="rounded-lg bg-green-800 p-2 font-semibold text-white">
                        {day.totalCalories} cal
                      </div>
                    </div>
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

export default AddMealDaily;
