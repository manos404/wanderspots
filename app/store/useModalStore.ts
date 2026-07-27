import { create } from "zustand";
import { SpotWithAuthor } from "../types/spot";

type ModalType = 'login' | 'signup' | 'addSpot' | 'spotDetail' | null
interface PickedLocation {
    lat: number;
    lon: number;
    city: string;
    country: string;
    displayName: string;
}
interface ModalStore {
    activeModal: ModalType
    selectedSpot: SpotWithAuthor | null
    openModal: (type: ModalType, spot?: SpotWithAuthor | null) => void
    closeModal: () => void

    isMapPickerOpen: boolean
    pickedLocation: PickedLocation | null
    openMapPicker: () => void
    closeMapPicker: () => void
    setPickedLocation: (location: PickedLocation | null) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    activeModal: null,
    selectedSpot: null,
    openModal: (type, spot = null) => set({ activeModal: type, selectedSpot: spot }),
    closeModal: () => set({ activeModal: null, selectedSpot: null }),

    isMapPickerOpen: false,
    pickedLocation: null,
    openMapPicker: () => set({ isMapPickerOpen: true }),
    closeMapPicker: () => set({ isMapPickerOpen: false }),
    setPickedLocation: (location) => set({ pickedLocation: location }),
}))