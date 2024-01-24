

const Loader = () => {
    return (
        <div className="h-[100vh]">
            <div className="bg-gray-200 animate-pulse  rounded-md">
                <div className="bg-gray-300 h-[20vh] mb-2 rounded"></div>
                <div className="bg-gray-300 h-[20vh] mb-2 rounded"></div>
                <div className="bg-gray-300 h-[20vh] mb-2 flex justify-center text-green-900 text-5xl rounded">Loading....</div>
                <div className="bg-gray-300 h-[20vh] mb-2 rounded"></div>
                <div className="bg-gray-300 h-[20vh] mb-2 rounded"></div>
            </div>
        </div>
    )
}

export default Loader;