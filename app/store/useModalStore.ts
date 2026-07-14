import { create } from "zustand";
import { SpotWithAuthor } from "../types/spot";

type ModalType = 'login' | 'signup' | 'addSpot' | 'spotDetail' | null

interface ModalStore {
    activeModal: ModalType
    selectedSpot: SpotWithAuthor | null  
    openModal: (type: ModalType, spot?: SpotWithAuthor | null) => void
    closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    activeModal: null,
    selectedSpot: null,
    openModal: (type, spot = null) => set({ activeModal: type, selectedSpot: spot }),
    closeModal: () => set({ activeModal: null, selectedSpot: null }),
}))