

interface Props{
    length:number,
    setCurrent:React.Dispatch<React.SetStateAction<number>>,
    current:number
}
const Indicators = ({length,setCurrent,current}:Props) => {

    const elements = [];

    for (let i = 0; i < length; i++) {
     
      elements.push(
        <div key={"circle" + i}>
         <div onClick={() => { setCurrent(i); }} 
              className={`rounded-full w-5 h-5 cursor-pointer border-2 border-white  ${i == current ? "bg-white" : "bg-transparent"}`}
            ></div>
        </div>
      );
    }
  return (
    <div className="absolute left-10 -translate-y-1/2 py-4 flex justify-center top-1/2 gap-3 flex-col">
        {/* {slides.map((_, i) => {
          return (
            <div onClick={() => { setCurrent(i); }} key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${i == current ? "bg-white" : "bg-gray-500"}`}
            ></div>
          );
        })} */}
        {elements}
        <div onClick={() => { setCurrent(length); }}
          className={`rounded-full w-5 h-5 cursor-pointer border-2 border-white ${current == length ? "bg-white" : "bg-transparent"}`}
        ></div>
      </div>
  )
}

export default Indicators