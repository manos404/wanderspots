"use client";
import { useModalStore } from "@/app/store/useModalStore";
import { SpotWithAuthor } from "@/app/types/spot";
import { hasMinLength, isNotEmpty } from "@/app/util/validation";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });
type SpotFormState = {
  errors: string[] | null;
  values?: {
    name?: string;
    category?: string;
    description?: string;
    city?: string;
    country?: string;
  };
};

type SpotFormProps = {
  isEditing?: boolean;
  onSuccess?: () => void;
};
type SubmitButtonProps = {
  selectedSpot: SpotWithAuthor | null;
};
async function AddSpotAction(
  prevFormState: SpotFormState,
  formData: FormData,
  selectedSpot: SpotWithAuthor | null,
  onSuccess?: () => void
): Promise<SpotFormState> {
  const name = formData.get("name");
  const category = formData.get("category");
  const description = formData.get("description");
  const city = formData.get("city");
  const country = formData.get("country");
  const image = formData.get("image") as File;
  const errors = [];

  const lat = formData.get("lat");
  const lng = formData.get("lng");
  try {
    if (!name) errors.push("Name is required");
    if (!category) errors.push("Category is required");
    if (!description) errors.push("Description is required");
    if (!city) errors.push("City is required");
    if (!country) errors.push("Country is required");
    if (!selectedSpot && (!image || image.size === 0)) {
      errors.push("Image is required");
    }
    if (errors.length > 0)
      return {
        errors,
        values: {
          name: name?.toString() ?? "",
          category: category?.toString() ?? "",
          description: description?.toString() ?? "",
          city: city?.toString() ?? "",
          country: country?.toString() ?? "",
        },
      };

    let latitude: number, longitude: number, searchLocation: string;

    if (lat && lng) {
      latitude = parseFloat(lat as string);
      longitude = parseFloat(lng as string);
      searchLocation = [city, country].filter(Boolean).join(", ");
    } else {
      const query = `${name}, ${city}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=jsonv2&addressdetails=1`
      );
      const locationData = await response.json();

      if (locationData.length === 0) {
        return {
          errors: ["Location not found. Try a more specific name."],
          values: {
            name: name?.toString() ?? "",
            category: category?.toString() ?? "",
            description: description?.toString() ?? "",
            city: city?.toString() ?? "",
            country: country?.toString() ?? "",
          },
        };
      }

      const address = locationData[0].address;

      searchLocation = [
        address.city,
        address.town,
        address.village,
        address.municipality,
        address.county,
        address.state,
        address.country,
      ]
        .filter(Boolean)
        .join(", ");
      latitude = parseFloat(locationData[0].lat);
      longitude = parseFloat(locationData[0].lon);
    }

    let imageUrl = selectedSpot?.imageUrl;
    let imageId = selectedSpot?.imageId;

    if (image && image.size > 0) {
      const uploadForm = new FormData();
      uploadForm.append("file", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });

      if (!res.ok) {
        return {
          errors: ["Image upload failed"],
          values: {
            name: name?.toString() ?? "",
            category: category?.toString() ?? "",
            description: description?.toString() ?? "",
            city: city?.toString() ?? "",
            country: country?.toString() ?? "",
          },
        };
      }
      const uploadData = await res.json();
      imageUrl = uploadData.secure_url;
      imageId = uploadData.public_id;
    }
    const spotRes = await fetch(
      selectedSpot ? `/api/spots/${selectedSpot.id}` : "/api/spots",
      {
        method: selectedSpot ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          description,
          city,
          country,
          searchLocation,
          imageUrl,
          imageId,
          latitude,
          longitude,
        }),
      }
    );

    if (!spotRes.ok) {
      return {
        errors: ["Failed to save spot"],
        values: {
          name: name?.toString() ?? "",
          category: category?.toString() ?? "",
          description: description?.toString() ?? "",
          city: city?.toString() ?? "",
          country: country?.toString() ?? "",
        },
      };
    }
    onSuccess?.();
    if (selectedSpot) {
      toast.success("Spot updated successfully! ✨");
    } else {
      toast.success("Your spot has been added! 🎉");
    }
    return { errors: null };
  } catch (error) {
    console.error(error);

    return {
      errors: ["Something went wrong. Try again."],
      values: {
        name: name?.toString() ?? "",
        category: category?.toString() ?? "",
        description: description?.toString() ?? "",
        city: city?.toString() ?? "",
        country: country?.toString() ?? "",
      },
    };
  }
}
function SubmitButton({ selectedSpot }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="mt-4 w-full h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white disabled:opacity-50"
    >
      {pending ? "Saving..." : selectedSpot ? "Save Changes" : "Add Spot"}
    </button>
  );
}
export default function SpotForm({
  isEditing = false,
  onSuccess,
}: SpotFormProps) {
  const [activeButton, setActiveButton] = useState("search");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [pickedLocation, setPickedLocation] = useState<{
    city: string;
    country: string;
    displayName: string;
  } | null>(null);

  useEffect(() => {
    if (!position) return;

    async function reverseGeocode() {
      if (!position) return;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=jsonv2&addressdetails=1`
      );
      const data = await res.json();
      const address = data.address;

      setPickedLocation({
        city: address.city || address.town || address.village || "",
        country: address.country || "",
        displayName: data.display_name,
      });
    }

    reverseGeocode();
  }, [position]);

  const router = useRouter();
  const { selectedSpot } = useModalStore();
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formState, formAction] = useActionState(
    (prevState: SpotFormState, formData: FormData) =>
      AddSpotAction(prevState, formData, selectedSpot, onSuccess),
    {
      errors: null,
    }
  );
  const { openModal } = useModalStore();

  async function handleDelete() {
    if (!selectedSpot) return;
    setDeleting(true);
    await fetch(`/api/spots/${selectedSpot.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    onSuccess?.();
    router.refresh();
    toast.success("Spot deleted successfully! 🗑️");
  }

  return (
    <>
      <div className="p-3 pl-7 pb-5 bg-gradient-to-br from-blue-600 rounded-t-lg to-purple-600">
        <h1 className="text-2xl font-bold  ">
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
            name="description"
            rows={4}
            placeholder="What makes this spot special?"
            defaultValue={
              formState.values?.description ?? selectedSpot?.description
            }
            className="w-full mt-2 resize-y   rounded-xl border border-gray-300 pl-2 pt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex flex-row w-fit gap-3 px-1 rounded-lg bg-gray-100 text-sm p-1">
            <button
              type="button"
              className={`flex gap-1 items-center rounded-md px-2 py-1.5 ${
                activeButton === "search" ? "text-blue-500 bg-white" : ""
              }`}
              onClick={() => setActiveButton("search")}
            >
              <span>Search by name</span>
            </button>
            <button
              type="button"
              className={`flex gap-1 items-center rounded-md px-2 py-1.5 ${
                activeButton === "pick" ? "text-blue-500 bg-white" : ""
              }`}
              onClick={() => setActiveButton("pick")}
            >
              <span>Pick on map</span>
            </button>
          </div>
          {activeButton === "search" && (
            <>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                key={pickedLocation?.city ?? "empty-city"}
                placeholder="e.g., Portland"
                defaultValue={
                  pickedLocation?.city ??
                  formState.values?.city ??
                  selectedSpot?.city
                }
                className=" h-10 mt-2  rounded-xl border border-gray-300 pl-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                key={pickedLocation?.country ?? "empty-country"}
                placeholder="e.g., Portland, Oregon"
                defaultValue={
                  pickedLocation?.country ??
                  formState.values?.country ??
                  selectedSpot?.country
                }
                className=" h-10 mt-2  rounded-xl border border-gray-300 pl-2  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </>
          )}
          {activeButton === "pick" && (
            <div
              className="mt-2 rounded-xl overflow-hidden"
              style={{ height: "300px" }}
            >
              <Map
                pickable
                pickedPosition={position}
                onPick={(lat, lng) => setPosition({ lat, lng })}
              />
            </div>
          )}
          {activeButton === "pick" && pickedLocation && (
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-gray-500">
                📍 {pickedLocation.displayName}
              </p>
              <button
                type="button"
                onClick={() => setActiveButton("search")}
                className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white shrink-0"
              >
                OK
              </button>
            </div>
          )}
          {position && (
            <>
              <input type="hidden" name="lat" value={position.lat} />
              <input type="hidden" name="lng" value={position.lng} />
            </>
          )}
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
          {selectedSpot && !showDeleteConfirm && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="mt-2 flex flex-row gap-1 align-center text-red-500 hover:text-red-600  "
            >
              <Trash2 size={16} />
              Delete Spot
            </button>
          )}
          {showDeleteConfirm && (
            <div className="mt-3 flex row  justify-between items-baseline gap-1 p-3 rounded-xl bg-red-100 text-red-600">
              <p className="mb-3">Are you sure? This cannot be undone.</p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 text-black px-3 h-10 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="flex-1 h-10 text-red-600 rounded-xl disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          )}
          <SubmitButton selectedSpot={selectedSpot} />
        </div>
      </form>
    </>
  );
}
