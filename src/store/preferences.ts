import type { ModalData, PreferencesState } from "../models/store/preferences";
import { create } from "zustand";

export const usePreferencesStore = create<PreferencesState>()((set) => ({
  modalData: {
    children: null,
    containerClassName: "",
    callback: () => {},
    noCloseButton: false,
  },
  setModalData: (value: ModalData) => {
    set(() => ({
      modalData: value,
    }));
  },
}));
