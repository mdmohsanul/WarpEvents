import { useAppDispatch, useAppSelector } from "@/app/store";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/EventForm";
import ShimmerEventsPage from "@/components/Shimmer/ShimmerEventsPage";
import { fetchEvents } from "@/features/events/eventThunk";
import type { EventType } from "@/types/event";
import { useEffect, useState } from "react";


const EventsPage = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.events);
 const [showEventForm,setShowEventForm] = useState<boolean>(false)
  useEffect(() => { 
    dispatch(fetchEvents());
  }, [dispatch]);
 
  if (loading) return <ShimmerEventsPage />;
  if(error) return <p className="pt-20">{error}</p>
  return (
    <>
    <div className="max-w-5xl mx-auto pt-20 px-4 md:px-0">
         <div className="pb-5 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Events</h1>
            <button
             onClick={() => setShowEventForm(true)}
            className="px-3 md:px-5 md:py-2 py-1 rounded-md text-white bg-stone-700 cursor-pointer hover:bg-stone-800 transition">+ Add Event</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 ">

         {events?.map((item:EventType) => <EventCard event={item} key={item._id} />)}
         </div>
    </div>
      {showEventForm && (
         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50 min-h-screen">
            <EventForm setShowEventForm={setShowEventForm} />
         </div>
      )}
    </>
  );
};

export default EventsPage;
