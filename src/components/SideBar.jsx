import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
const SideBar = ({selectedDate, events, deleteEvent, toggleModal}) => {
    const key = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
    const dayEvents = key ? events[key] || [] : [];

  return (
    <div className='w-1/4 bg-[#111827] p-6 border-r border-gray-800 shadow-2xl'>
        <h2 className='text-xl font-semibold mb-5 text-gray-300 tracking-wide'>
            Events on {" "}
            <span className='text-blue-400'>{selectedDate ? format(selectedDate, "PPP") : "Please Select a day"}</span>
        </h2>

        {
            selectedDate && (
                <button 
                    onClick={toggleModal}
                    className='p-4 bg-[#1f2937] rounded-xl border border-gray-700 shadow-lg 
                                hover:border-blue-500 hover:shadow-blue-500/20 transition-all font-bold text-lg text-blue-400 w-full my-4'
                >
                    + Add Event
                </button>
            )
        }

        {dayEvents.length === 0 ? (
            <p className='text-gray-500 text-sm italic'>No events</p>
        ) : (
            <ul className='space-y-4'>
                {dayEvents.map((ev, id) => (
                    <li
                        key={id}
                        className='relative p-4 bg-[#1f2937] rounded-xl border border-gray-700 shadow-lg 
                         hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300'
                    >
                        <p className='font-semibold text-lg text-gray-100 tracking-wide'>
                            {ev.title}
                        </p>
                        {
                            ev.startTime && ev.endTime && (
                                <p className='text-gray-400 text-md mt-1'>
                                    {ev.startTime} - {ev.endTime}
                                </p>
                            )
                        }

                        <button
                            onClick={() => deleteEvent(key,ev)}
                            className='absolute top-3 right-3 text-red-500 hover:text-red-700 transition cursor-pointer font-bold text-lg leading-none'
                        >
                            <Trash2 size={22}/>
                        </button> 

                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default SideBar