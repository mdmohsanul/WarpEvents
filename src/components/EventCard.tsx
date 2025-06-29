import { useAppDispatch, useAppSelector } from "@/app/store";
import {  registerForEvent } from "@/features/events/eventThunk";
import type { EventType } from "@/types/event";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";

type EventCardProps ={
    event:EventType
}

const EventCard : React.FC<EventCardProps>= ({event}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const checkRegistration = !!user && event.attendees.includes(user._id);

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const handleRegister = async () => {
    try {
      await dispatch(registerForEvent({ id: event._id })).unwrap();
      toast.success("Successfully registered for event!");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <>
      <div className="w-80 h-64 mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <ToastContainer />
        <div className="p-5 space-y-4">
          <Link to={`/events/${event._id}`} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 ">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600 ">{event.description}</p>
            <div className="text-sm text-gray-700 mt-3 space-y-1">
              <p>
                📍 <span className="font-medium">{event.location}</span>
              </p>
              <p>
                📅 {formattedDate} — 🕘 {formattedTime}
              </p>
            </div>
          </Link>
          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={checkRegistration}
            className={`mt-4 w-full py-2 px-4 text-white text-sm font-medium rounded-md transition ${
              checkRegistration
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-stone-800 hover:bg-stone-900 cursor-pointer"
            }`}
          >
            {checkRegistration ? "Registered" : "Click to Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EventCard;
