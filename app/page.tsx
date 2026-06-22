import Card from "../components/Card";
import { Spot } from "./types/spot";
import { mockSpots } from "./data";
import Modal from "../components/Modal";
export default function Home() {
  return (
    <>
      <div className=" flex gap-5 mx-30 my-10 items-center">
        <p>6 amazing spots discovered</p>
        <div className="flex flex-row gap-3 p-1 px-5 rounded-2xl bg-gray-200">
          <button>Map</button>
          <button>Grid</button>
        </div>
      </div>
      <div className=" grid grid-cols-3 mx-30   gap-10">
        <Card spot={mockSpots[0]} />
        <Card spot={mockSpots[1]} />
        <Card spot={mockSpots[2]} />
        <Card spot={mockSpots[3]} />
        <Card spot={mockSpots[4]} />
        <Card spot={mockSpots[5]} />
        <Modal />
      </div>
    </>
  );
}
