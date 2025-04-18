import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const goToPreviousMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // Create grid with leading empty days
  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    calendarCells.push(
      <div
        key={day}
        className={`text-center py-2 border cursor-pointer rounded ${
          isToday ? "bg-blue-500 text-white" : "hover:bg-gray-200"
        }`}
        onClick={() => handleDayClick(day)}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700 text-white">
            <button onClick={goToPreviousMonth}>Previous</button>
            <h2>{`${monthNames[month]} ${year}`}</h2>
            <button onClick={goToNextMonth}>Next</button>
          </div>

          <div className="grid grid-cols-7 gap-2 p-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {calendarCells}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Selected Date</p>
                <button
                  className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  onClick={closeModal}
                >
                </button>
              </div>
              <div className="text-xl font-semibold">
                {selectedDate?.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
