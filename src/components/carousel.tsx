import { useState } from "react";
import Indicators from "./indicators";
import PoolForm from "./pollForm";


export type Inputs = {
  id: string
  title: string,
  answer?:string
}
export interface SlidesProps {
  slides: Inputs[];
}


let scrollTimer: number | undefined;

const Carousel = ({ slides }: SlidesProps) => {
  const [current, setCurrent] = useState(0);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {

    let dir = e.deltaY > 0 ? 'down' : 'up';

    clearTimeout(scrollTimer);

    // Set a new timer
    scrollTimer = setTimeout(function () {
      // This code will run when the wheel scrolling has stopped
      if (current === slides.length && dir === 'down') return;
      if (current === 0 && dir === 'up') return;
      if (dir === 'up') {
        setCurrent(current - 1);
      }
      else {
        setCurrent(current + 1);
      }
    }, 35);
  }

  return (
    <div className="overflow-hidden h-[100vh] relative"
      onWheel={(e) => handleScroll(e)}>
      <div
        className={`flex flex-col transition ease-in duration-500`}
        style={{
          transform: `translateY(-${current * 100}vh)`,
        }}
      >
        <PoolForm slides={slides} />

      </div>

      <Indicators length={slides.length} setCurrent={setCurrent} current={current} />


    </div>
  );
};

export default Carousel;