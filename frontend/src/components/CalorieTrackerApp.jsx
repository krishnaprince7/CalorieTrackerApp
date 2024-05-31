import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CalorieTrackerApp() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [foodList, setFoodList] = useState([]);
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedFoodList = localStorage.getItem('foodList');
    if (storedFoodList) {
      setFoodList(JSON.parse(storedFoodList));
    }
  }, []);

  // Save data to localStorage whenever foodList changes
  useEffect(() => {
    localStorage.setItem('foodList', JSON.stringify(foodList));
  }, [foodList]);

  const getTotalCalories = () => {
    return foodList.reduce((total, item) => total + parseInt(item.calories), 0);
  };

  const handleAddItem = () => {
    if (food && calories) {
      const newFoodItem = { food: food, calories: calories, completed: false };
      setFoodList([...foodList, newFoodItem]);
      setFood('');
      setCalories('');
    }
  };

  const handleToggleCompletion = (index) => {
    const updatedFoodList = [...foodList];
    updatedFoodList[index].completed = !updatedFoodList[index].completed;
    setFoodList(updatedFoodList);
  };

  const handleDeleteItem = (index) => {
    const updatedFoodList = [...foodList];
    updatedFoodList.splice(index, 1);
    setFoodList(updatedFoodList);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Clear foodList when logging out
    localStorage.removeItem('foodList');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen">
      <img src="/images/healthy.png" alt="Food" className="absolute inset-0 object-cover w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-70"></div>
      <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-70 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Calorie Tracker</h1>
        <div className="flex flex-col sm:flex-row items-center mb-8">
          <input
            type="text"
            placeholder="Food"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 sm:mr-4 sm:mb-0 w-full sm:w-auto"
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mb-4 sm:mr-4 sm:mb-0 w-full sm:w-auto"
          />
          <button onClick={handleAddItem} className="px-6 py-2 bg-blue-500 text-white rounded">
            Add
          </button>
        </div>
        <div className="absolute top-0 right-0 mr-4 mt-4 text-lg font-semibold">
          Total Calories: {getTotalCalories()}
        </div>
        <ul className="list-disc pl-4">
          {foodList.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <div>
                <span
                  className={`text-lg ${item.completed ? 'line-through text-gray-500' : ''}`}
                  onClick={() => handleToggleCompletion(index)}
                >
                  {item.food} - {item.calories} calories
                </span>
              </div>
              <button onClick={() => handleDeleteItem(index)} className="text-red-500">
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button 
            onClick={handleLogout} 
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
            Logout
        </button>
      </div>
    </div>
  );
}

export default CalorieTrackerApp;
