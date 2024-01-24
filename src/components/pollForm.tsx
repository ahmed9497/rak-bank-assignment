import { useContext, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { SlidesProps } from "./carousel";
import { toast } from "react-toastify";
import { AppContext } from "../context/appContext";


type EmojiMap = {
    thumbsUp: string;
    thinking: string;
    thumbsDown: string;
};

const emojiMap: EmojiMap = {
    thumbsUp: '👍',
    thinking: '🤔',
    thumbsDown: '👎',
};
type FormData = {
    [key: string]: string;
};

const PoolForm = ({ slides }: SlidesProps) => {

    const { formSubmit } = useContext(AppContext);
    let ref = useRef<HTMLDivElement | null>(null)
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        reset
    } = useForm<FormData>();

    useEffect(() => {

        if (ref.current) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        ref.current?.classList.add('show');
                    }
                    else {
                        ref.current?.classList.remove('show');
                    }
                });
            });

            observer.observe(ref.current);
        }
    }, [])

    function getEmoji(name: string): string {
        // Check if the name is a valid key using the type guard
        if (isEmojiKey(name)) {
            const emoji = emojiMap[name];
            return emoji;
        }

        // Default value if the name is not a valid key
        return '';
    }
    function isEmojiKey(key: string): key is keyof EmojiMap {
        return key in emojiMap;
    }
    const onSubmit: SubmitHandler<FormData> = (data) => {

        let allValues = Object.values(data).some(value => value === null);
        if (allValues) {
            toast.error('Please complete the form');
            return;
        }
        slides.forEach((e, index) => {
            e.answer = data[index]
        })
        formSubmit(slides);
        reset();
        
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {slides.map((item, index) => {
                return (
                    <div key={index}>

                        <div className="h-[100vh] flex flex-wrap sm:flex-nowrap" >
                            <div className="flex justify-center items-center text-white md:text-3xl lg:text-5xl font-bold basis-full sm:basis-1/2 bg-[#6a53ff]">
                                <div className="px-20 w-10/12"> {item.title}</div>

                            </div>
                            <div className="flex flex-col gap-x-10 gap-y-10 justify-center items-center basis-full sm:basis-1/2 bg-white text-5xl">
                                <div className="flex gap-x-10 ">
                                    <label className="relative group">
                                        <div className={`flex rounded justify-center items-center cursor-pointer h-[60px] w-[60px] ${getValues(item.id) === 'thumbsUp' ? "bg-red-400" : ""} `}>
                                            <div className="absolute z-10 bottom-full  bg-black invisible opacity-0 text-white p-2 
                          group-hover:visible group-hover:opacity-100 transition-all ease-in duration-300 -left-12
                          transform  group-hover:-translate-y-4 text-lg w-[140px] text-center rounded">
                                                Thumbs Up
                                            </div>
                                            <input type="radio" className="radio" value="thumbsUp" {...register(item.id)} />
                                            👍
                                        </div>
                                    </label>
                                    <label className="relative group">
                                        <div className={` flex rounded justify-center items-center cursor-pointer h-[60px] w-[60px] ${getValues(item.id) === 'thinking' ? "bg-red-400  " : ""} `}>
                                            <div className="absolute z-10 bottom-full  bg-black visible opacity-0 text-white p-2 
                          group-hover:visible group-hover:opacity-100 transition-all ease-in duration-300 -left-12
                          transform  group-hover:-translate-y-4 text-lg w-[140px] text-center rounded">
                                                Thinking
                                            </div>
                                            <input type="radio" className="radio" value="thinking" {...register(item.id)} />
                                            🤔
                                        </div>
                                    </label>
                                    <label className="relative group">
                                        <div className={`flex rounded justify-center items-center cursor-pointer h-[60px] w-[60px] ${getValues(item.id) === 'thumbsDown' ? "bg-red-400" : ""} `}>
                                            <div className="absolute z-10 bottom-full  bg-black visible opacity-0 text-white p-2 
                          group-hover:visible group-hover:opacity-100 transition-all ease-in duration-300 -left-12
                          transform  group-hover:-translate-y-4 text-lg w-[140px] text-center rounded">
                                                Thumbs Down
                                            </div>
                                            <input type="radio" className="radio" value="thumbsDown" {...register(item.id)} />
                                            👎
                                        </div>
                                    </label>
                                </div>
                                <div className="capitalize text-2xl ">{getValues((item.id).toString())}</div>
                            </div>
                        </div>

                    </div>
                )
            })}
            <div className="h-[100vh] p-10 bg-[#333]">

                <div className="h-full">
                    <h1 className="text-white text-center text-5xl w-full">Summary</h1>

                    <div className="sm:px-20 pl-8   flex justify-center  h-full items-center flex-col">
                        <div className="w-full sm:w-8/12 animate-on-view" ref={ref}>
                            {slides.map((data, index) => (
                                <div className="flex gap-x-4 justify-between" key={index}>
                                    <h1 className="text-white text-sm lg:text-3xl ">
                                        {data.title}
                                    </h1>
                                    <h1 className="text-white text-sm lg:text-3xl"> {getEmoji(`${watch(data.id)}`)}
                                        {watch(data.id) &&
                                            <span className="ml-4 uppercase">({(watch(data.id))})
                                            </span>}
                                    </h1>
                                </div>

                            ))}
                        </div>
                        <button type="submit" className="px-4 py-3 bg-purple-400 hover:bg-purple-500 mt-10 rounded uppercase text-white w-[250px]">submit your answers</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PoolForm