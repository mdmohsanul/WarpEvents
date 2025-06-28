import { RxCrossCircled } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema,type EventFormData } from "../schema/eventSchema";
import { useAppDispatch } from "@/app/store";
import { addEvent, fetchEvents } from "@/features/events/eventThunk";
import { useState } from "react";


type EventFormProps = {
  setShowEventForm: React.Dispatch<React.SetStateAction<boolean>>;
  
};
const EventForm:React.FC<EventFormProps> = ({setShowEventForm}) => {
    const dispatch = useAppDispatch()
    const [err, setErr] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async(data: EventFormData) => {
    try{

     await dispatch(addEvent(data)).unwrap();
      dispatch(fetchEvents());

      setShowEventForm(false); // close modal on success
       
    } catch (error) {
      setErr(error as string);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 md:w-2/4 mx-auto p-4 md:p-6 bg-white rounded-lg shadow space-y-2 md:space-y-4"
    >
        <div className="flex items-center  justify-between">
      <h2 className="text-xl font-semibold md:mb-2">Create Event</h2>
     <button className="cursor-pointer" onClick={() => setShowEventForm(false)}><RxCrossCircled size={30} /></button>
        </div>

      {/* Title */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium ">Title</label>
        <input
          {...register("title")}
          className="px-3 md:py-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Description</label>
        <textarea
          {...register("description")}
          className="px-3 md:py-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

      
      <div className="flex flex-col w-full">
        <label className="mb-1 font-medium">Location</label>
        <input
          {...register("location")}
          className="px-3  md:py-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.location && (
          <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="flex flex-col w-full">
        <label className="mb-1 font-medium">Date</label>
        <input
          type="datetime-local"
          {...register("date")}
          className="px-3 md:py-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && (
          <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>
</div>
{err && <p className="text-white bg-red-400 px-3 inline">{err}</p>}
      <button
        type="submit"
        className="w-full mt-4 py-2 cursor-pointer bg-stone-700 hover:bg-stone-800 text-white font-semibold rounded"
      >
        Create Event
      </button>
    </form>
  );
};

export  default EventForm