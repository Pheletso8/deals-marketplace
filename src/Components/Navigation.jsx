import { HiOutlineLightningBolt } from "react-icons/hi";

export default function Navigation() {
  return (
    <div className="backdrop-blur-sm shadow-md flex justify-between items-center w-full h-20  px-20 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center gap-2">
            <div className="p-2 bg-white/50 rounded-lg">
                <HiOutlineLightningBolt color="teal"/>
            </div>
            <h1 className="text-2xl">Deal<span className="text-teal-400">Finder</span></h1>
        </div>
        <div className="flex gap-3">
          <a href="" className="p-2 bg-teal-400 text-white rounded-full">Categories</a>
          <a href="" className="p-2 bg-teal-400 text-white rounded-full">Hot Picks</a>
        </div>
        <div className="p-2 bg-white/30 text-teal-400 rounded-xl"><a href="" className="text- font-medium bg-black/40 p-2 rounded-lg">Sign in</a></div>
    </div>
  )
}
