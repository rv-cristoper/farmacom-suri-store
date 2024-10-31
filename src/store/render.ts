import { create } from "zustand";

interface IRenderState {
  sidebarIsOpen: boolean;
  toggleSidebarIsOpen: () => void;
}

export const useRenderStore = create<IRenderState>()((set) => ({
  sidebarIsOpen: true,
  toggleSidebarIsOpen: () => {
    set((state) => ({
      sidebarIsOpen: !state.sidebarIsOpen,
    }));
  },
}));
