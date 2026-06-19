import Image from "next/image";
import compass from "../../public/compass.png";
import plane from "../../public/flight.png";
import { User } from "lucide-react";
export default function Navbar() {
  
  return (
    <div className="flex justify-between shadow-xl pt-5 pb-2">
      <div className="flex ml-30  row gap-5">
        <Image src={compass} alt="" className="w-12 h-12" />
        <div className="column text-center">
          <h1 className="text-2xl font-bold">Wanderspots </h1>
          <p className="text-base text-gray-500 font-semibold">
            Discover & share amazing places
          </p>
        </div>
      </div>
      {/* <Image src={plane} alt="" className="w-15 h-15" /> */}

      <div className=" flex gap-5 my-2 mr-30">
        <button className="text-base  hover:opacity-80 transition-opacity">
          Log in
        </button>
        <button className="text-base  bg-blue-600 rounded-2xl items-center px-5 flex row gap-2 justify-center  hover:bg-blue-700 transition-colors text-white">
          {/* <Image src={human} alt="" className="w-6 h-6" /> */}
          <User className="w-6 h-6" />
          <span>Sign up</span>
        </button>
      </div>
    </div>
  );
}
