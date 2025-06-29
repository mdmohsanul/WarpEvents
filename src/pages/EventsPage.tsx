import { useAppDispatch, useAppSelector } from "@/app/store";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/EventForm";
import ShimmerEventsPage from "@/components/Shimmer/ShimmerEventsPage";
import { setPage, setSortOrder } from "@/features/events/eventSlice";
import { fetchEvents } from "@/features/events/eventThunk";
import type { EventType } from "@/types/event";
import { useEffect, useState } from "react";

const EventsPage = () => {
  const dispatch = useAppDispatch();
  const {
    events,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    sortOrder,
  } = useAppSelector((state) => state.events);

  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      fetchEvents({
        page: currentPage,
        limit: 6,
        search: searchTerm,
        sort: sortOrder,
      })
    );
  }, [dispatch, currentPage, searchTerm, sortOrder]);

  const handlePrev = () => dispatch(setPage(Math.max(1, currentPage - 1)));
  const handleNext = () =>
    dispatch(setPage(Math.min(totalPages, currentPage + 1)));
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(e.target.value as "asc" | "desc"));
  };
  if (loading) return <ShimmerEventsPage />;
  if (error) return <p className="pt-20">{error}</p>;
  // const length = totalPages;
  // const totalPageArr = Array.from({ length }, (_, i) => i + 1);

  return (
    <>
      <div className="max-w-5xl mx-auto pt-28 px-4 md:px-0">
        <div className="pb-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Events</h1>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border px-3 py-1 rounded"
          >
            <option value="asc">Date ↑ (Oldest first)</option>
            <option value="desc">Date ↓ (Newest first)</option>
          </select>
          <button
            onClick={() => setShowEventForm(true)}
            className="px-3 md:px-5 md:py-2 py-1 rounded-md text-white bg-stone-700 cursor-pointer hover:bg-stone-800 transition"
          >
            + Add Event
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 ">
          {events?.map((item: EventType) => (
            <EventCard event={item} key={item._id} />
          ))}
        </div>
      </div>
      {/* Pagination */}

      <div className="mt-4 flex items-center gap-4 justify-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
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
