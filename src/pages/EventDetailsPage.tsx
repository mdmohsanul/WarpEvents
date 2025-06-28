import { useAppDispatch, useAppSelector } from "@/app/store";
import ShimmerEventsPage from "@/components/Shimmer/ShimmerEventsPage";
import { fetchEventById } from "@/features/events/eventThunk";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const dispatch = useAppDispatch();
  const { event , loading, error } = useAppSelector((state) => state.events);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById({ id: eventId }));
    }
  }, [dispatch, eventId]);

  if (loading) return <ShimmerEventsPage />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!event) return <p className="text-center mt-10 text-gray-500">No event found.</p>;

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="space-y-2 text-gray-700">
        <p>
          📍 <span className="font-medium">Location:</span> {event.location}
        </p>
        <p>
          📅 <span className="font-medium">Date:</span> {formattedDate}
        </p>
        <p>
          🕒 <span className="font-medium">Time:</span> {formattedTime}
        </p>
        <p>
          👤 <span className="font-medium">Created By:</span>{" "}
          {event.createdBy?.name} ({event.createdBy?.email})
        </p>
        <p>
          🙋‍♂️ <span className="font-medium">Attendees:</span>{" "}
          {event.attendees.length > 0
            ? `${event.attendees.length} attending`
            : "No attendees yet"}
        </p>
      </div>
    </div>
  );
};

export default EventDetailsPage;
