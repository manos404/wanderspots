import { useModalStore } from "@/app/store/useModalStore";

export default function AddSpot() {
  const { activeModal, openModal, closeModal } = useModalStore();

  return (
    <>
      <div className="p-3 pl-7 pb-7 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600">
        <h1 className="text-2xl font-bold  ">Add Your Favorite Spot</h1>
      </div>
      <div className="mt-2 pl-7 flex flex-col text-black">
        <label htmlFor="name">Spot Name</label>
        <input
          type="name"
          name="name"
          placeholder="e.g. The Cozy Corner"
          className=" h-10 mt-2  rounded-xl border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="w-full border rounded p-2 text-black"
        >
          <option value="">Select a category</option>
          <option value="beach">Food & Drink</option>
          <option value="mountain">Nature</option>
          <option value="lake">Art & Culture</option>
          <option value="lake">Architecture</option>
          <option value="lake">Entertainment</option>
          <option value="lake">Shopping</option>
          <option value="lake">Sports & Recreation</option>
        </select>

        <label htmlFor="description">Description</label>
        <input
          type="description"
          name="description"
          placeholder="What makes this spot special?"
          className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </>
  );
}
