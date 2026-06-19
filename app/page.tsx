import Card from "./components/Card";
import { Spot } from "./types/spot";
import { mockSpots } from "./data";
import Modal from "./components/Modal";
 export default function Home() {
   return (
    <div className=" grid grid-cols-3 mx-30 gap-10">
      {/* <main className="flex min-h-screen items-center justify-center"> */}
      {/* <Card spot={mockSpots[0]} />
      <Card spot={mockSpots[1]} />
      <Card spot={mockSpots[2]} />
      <Card spot={mockSpots[3]} /> 
      <Card spot={mockSpots[4]} />
      <Card spot={mockSpots[5]} /> */}
      <Modal />
      {/* </main> */}
    </div>
  );
}
