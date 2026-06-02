import Image from "next/image";
import compass from "../../public/compass.png";
import human from "../../public/human.png";
import plane from "../../public/flight.png";
export default function Navbar() {
  return (
    <div className="flex justify-between shadow-xl p-5">
      <div className="flex row gap-5">
        <Image src={compass} alt="" className="w-12 h-12" />
        <div className="column text-center">
          <h1 className="text-4xl font-bold">Wanderspots </h1>
          <p className="text-xl">Discover & share amazing places</p>
        </div>
      </div>
          <Image src={plane} alt="" className="w-15 h-15" />

      <div className=" flex gap-5 ">
        <button className="text-2xl cursor-pointer">Log in</button>
        <div></div>
        <button className="text-2xl  cursor-pointer bg-blue-400 rounded-4xl items-center px-3 flex row gap-2 justify-center">
          <Image src={human} alt="" className="w-6 h-6" />
          <span>Sign up</span>
        </button>
      </div>
    </div>
  );
}
