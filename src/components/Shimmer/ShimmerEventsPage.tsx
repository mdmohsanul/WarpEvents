import {useEffect} from 'react'
import ShimmerCard from './ShimmerCard';

const ShimmerEventsPage = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const shimmerCardDummyArr = [5, 12, 8, 19, 27, 33, 14, 6, 21, 9, 42, 17];
  return (
   <>
   <div className=" min-h-screen flex justify-around gap-3 pt-20">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
          {shimmerCardDummyArr.map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
   </>
  )
}

export default ShimmerEventsPage