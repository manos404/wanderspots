"use client";
import { useModalStore } from "@/app/store/useModalStore";
import { hasMinLength, isNotEmpty } from "@/app/util/validation";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

type SpotFormProps = {
  isEditing?: boolean;
  onSuccess?: () => void;
};

async function AddSpotAction(prevFormState, formData, selectedSpot, onSuccess) {
  const name = formData.get("name");
  const category = formData.get("category");
  const description = formData.get("description");
  const location = formData.get("location");
  const image = formData.get("image") as File;
  const errors = [];

  if (!name) errors.push("Name is required");
  if (!category) errors.push("Category is required");
  if (!description) errors.push("Description is required");
  if (!location) errors.push("Location is required");
  if (!selectedSpot && (!image || image.size === 0)) {
    errors.push("Image is required");
  }
  if (errors.length > 0)
    return {
      errors,
      values: { name, category, description, location },
    };

  // εδώ θα προσθέσουμε upload + nominatim + save
  let imageUrl = selectedSpot?.imageUrl;

  if (image && image.size > 0) {
    const uploadForm = new FormData();
    uploadForm.append("file", image);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadForm,
    });

    // const uploadData = await res.json();
    if (!res.ok) {
      throw new Error("Upload failed");
    }
    const text = await res.text();

    console.log("UPLOAD RESPONSE:", text);

    const uploadData = JSON.parse(text);
    imageUrl = uploadData.secure_url;
    // const uploadData = await res.json();
    // imageUrl = uploadData.secure_url;
  }

  const query = `${name},${location}`;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=jsonv2`
  );
  const locationData = await response.json();
  if (locationData.length === 0) {
    return {
      errors: ["Location not found. Try a more specific name."],
      values: { name, category, description, location },
    };
  }
  const lat = parseFloat(locationData[0].lat);
  const lon = parseFloat(locationData[0].lon);

  const spotRes = await fetch(
    selectedSpot ? `/api/spots/${selectedSpot.id}` : "/api/spots",
    {
      method: selectedSpot ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        description,
        location,
        imageUrl,
        lat,
        lon,
      }),
    }
  );

  if (!spotRes.ok) {
    return {
      errors: ["Failed to save spot"],
      values: { name, category, description, location },
    };
  }
  onSuccess?.();
  return { errors: null };
}

export default function SpotForm({
  isEditing = false,
  onSuccess,
}: SpotFormProps) {
  const router = useRouter();
  const { selectedSpot } = useModalStore();
  const [formState, formAction] = useActionState(
    (prevState, formData) =>
      AddSpotAction(prevState, formData, selectedSpot, onSuccess),
    {
      errors: null,
    }
  );
  async function handleDelete() {
    if (!selectedSpot) return;

    await fetch(`/api/spots/${selectedSpot.id}`, {
      method: "DELETE",
    });

    onSuccess?.();
    router.refresh();
  }
  return (
    <>
      <div className="p-3 pl-7 pb-5 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600">
        <h1 className="text-2xl font-bold  ">
          {" "}
          {selectedSpot ? "Edit Spot" : "Add Your Favorite Spot"}
        </h1>
      </div>
      <form action={formAction}>
        <div className="mt-2 px-7 pb-6 flex flex-col gap-2 text-black">
          <label htmlFor="name">Spot Name</label>
          <input
            type="name"
            name="name"
            placeholder="e.g. The Cozy Corner"
            defaultValue={formState.values?.name ?? selectedSpot?.name}
            className=" h-10 mt-2  rounded-xl border border-gray-300 pl-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            key={formState.values?.category}
            defaultValue={
              formState.values?.category ?? selectedSpot?.category ?? ""
            }
            className="w-full h-10  mt-2  border rounded-lg pl-2 text-black"
          >
            <option value="">Select a category</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Nature">Nature</option>
            <option value="Art & Culture">Art & Culture</option>
            <option value="Architecture">Architecture</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Sports & Recreation">Sports & Recreation</option>
          </select>
          <label htmlFor="description">Description</label>
          <textarea
            // type="description"
            name="description"
            rows={4}
            placeholder="What makes this spot special?"
            defaultValue={
              formState.values?.description ?? selectedSpot?.description
            }
            className="w-full mt-2 resize-y   rounded-xl border border-gray-300 pl-2 pt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g., Portland, Oregon"
            defaultValue={formState.values?.location ?? selectedSpot?.location}
            className=" h-10 mt-2  rounded-xl border border-gray-300 pl-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label htmlFor="image">Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {formState.errors && (
            <ul className="text-red-600 text-sm pt-1  pl-3 list-disc">
              {formState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          {selectedSpot && (
            <button
              type="button"
              onClick={handleDelete}
              className="mt-2 flex flex-row gap-1 align-center text-red-500 hover:text-red-600  "
            >
              <Trash2 size={16} />
              Delete Spot
            </button>
          )}
          <button className="mt-4 w-full h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white hover:from-blue-700 hover:to-purple-700 transition-all">
            {selectedSpot ? "Save Changes" : "Add Spot"}
          </button>
        </div>
      </form>
    </>
  );
}
