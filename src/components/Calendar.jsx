import { useAuth } from "../auth/AuthContext";
import { getCalendarDays } from "./MonthGrid";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import SideBar from "./SideBar";
import { generateTimeSlots, validateEvent } from "../services/timeUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventError, setEventError] = useState("");


  const days = getCalendarDays(currentDate);
  const timeSlots = generateTimeSlots();

  const openAddEventModal = (date) => {
    setSelectedDate(date);
    //setShowModal(true);
  }

  const toggleModal = () => {
    setShowModal(true);
  }

  const saveEvent = () => {
    setEventError("");
    const key = format(selectedDate,"yyyy-MM-dd");
    const existing = events[key] || [];

    const error = validateEvent(eventTitle, startTime, endTime, existing);

    if(error){
      setEventError(error);
      return;
    }

    const newEvents = {
      ...events,
      [key] : [...existing, {title: eventTitle, startTime, endTime}]
    };

    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents))

    setShowModal(false);
    setEventTitle("");
    setStartTime("");
    setEndTime("");
    
  }

  const cancelEvent = () => {
    setEventError("");
    setShowModal(false);
    setEventTitle("");
    setStartTime("");
    setEndTime("");
  }

  const deleteEvent = (dateKey, eventToDelete) => {
    const updatedEvents = {
      ...events,
      [dateKey] : events[dateKey].filter(ev => !(ev.title == eventToDelete.title && ev.startTime === eventToDelete.startTime && ev.endTime === eventToDelete.endTime))
    };

    setEvents(updatedEvents);
    localStorage.setItem("events",JSON.stringify(updatedEvents));
  }

  useEffect(() => {
    const saved = localStorage.getItem("events");
    if(saved) setEvents(JSON.parse(saved));
  },[]);


  return (
    <div className="flex bg-linear-to-br from-indigo-50 to-purple-50 min-h-screen">
      <SideBar deleteEvent={deleteEvent} events={events} selectedDate={selectedDate} toggleModal={toggleModal}/>
      <div className="w-3/4 min-h-screen bg-linear-to-br from-[#0a1220] via-[#111827] to-[#1f2937] p-6">

        <div className="bg-[#1e293b] rounded-xl shadow-xl p-6 border border-gray-700">
          {/** Month Header */}
          <div className="flex justify-between items-center mb-6">
            {/** Previous Month */}
            <button
              className="p-2 rounded-lg hover:bg-gray-500 text-white transition"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            >
              <ChevronLeft />
            </button>
            <h2 className="text-3xl font-bold text-[#00EFE3] tracking-wide">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button
              className="p-2 rounded-lg hover:bg-gray-500 text-white transition"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            >
              <ChevronRight />
            </button>
          </div>

          {/** Weekday labels */}
          <div className="grid grid-cols-7 text-center font-semibold text-gray-500 tracking-wide mb-3">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d)=>(
              <p key={d}>{d}</p>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3 mt-2 pl-6">
            {days.map((day, id) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const dateKey = format(day, "yyyy-MM-dd");
              const eventList = events[dateKey] || [];

              return (
                <div
                  key={id}
                  className={`min-h-24 rounded-xl p-3 transition-all ${
                    isCurrentMonth
                      ? "bg-[#1e293b] hover:bg-[#27354a] cursor-pointer border-gray-700 shadow-xs hover:border-blue-500 hover:shadow-blue-500/20 transition-all"
                      : "bg-transparent"
                  }`}
                  onClick={() => isCurrentMonth && openAddEventModal(day)}
                >
                  <p
                    className={`text-lg font-semibold mb-2 ${
                      isCurrentMonth ? "text-gray-100" : "text-gray-700"
                    }`}
                  >
                    {isCurrentMonth ? format(day, "d") : ""}
                  </p>

                  {/* Events */}
                  {isCurrentMonth && (
                    <div className="mt-1 space-y-1">
                      {eventList.slice(0, 2).map((ev, index) => (
                        <p
                          key={index}
                          className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded-md truncate shadow-md"
                        >
                          {ev.title}
                        </p>
                      ))}

                      {eventList.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{eventList.length - 2} more
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {
            showModal && (
              <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center">
                <div className="bg-white p-6 rounded-xl shadow-2xl w-96 border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Event - {format(selectedDate, "PPP")}</h2>
                  <input type="text" placeholder="Event Title *" onChange={(e) => setEventTitle(e.target.value)} value={eventTitle} className="border border-gray-300 w-full p-2.5 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-gray-300 w-full p-2.5 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  >
                    <option value="">Start Time *</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-gray-300 w-full p-2.5 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  >
                    <option value="">End Time *</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <div className="mb-3"> 
                    {
                      eventError && (
                        <p className='text-red-600 text-sm font-medium text-center px-2'>{eventError}</p>  
                      )
                    }
                  </div>
                  <div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded w-full mb-3 transition" onClick={saveEvent}>
                    Save Event
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded w-full mb-3 transition" onClick={cancelEvent}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Calendar;