import React, { useState } from 'react';

const TimeSlot = ({ time, onClick, selected }) => {
  return (
    <div
      className={`p-2 cursor-pointer border ${
        selected ? 'bg-blue-500 text-white' : 'bg-white text-black'
      }`}
      onClick={() => onClick(time)}
    >
      {time}
    </div>
  );
};

const TimeSlotList = ({ timeslots, onTimeSlotClick, selectedTimeSlot }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {timeslots.map((time, index) => (
        <TimeSlot
          key={index}
          time={time}
          onClick={onTimeSlotClick}
          selected={time === selectedTimeSlot}
        />
      ))}
    </div>
  );
};

const TimeSlotPicker = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(time);
    console.log('Selected Time Slot:', time); 
    // You can do other operations with the selected time slot here
  };

  const generateTimeSlots = () => {
    const startTime = 9;
    const endTime = 10;
    const interval = 30;
    const timeslots = [];

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        timeslots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }

    return timeslots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select a Time Slot</h2>
      <TimeSlotList
        timeslots={timeSlots}
        onTimeSlotClick={handleTimeSlotClick}
        selectedTimeSlot={selectedTimeSlot}
      />
    </div>
  );
};

export default TimeSlotPicker;
