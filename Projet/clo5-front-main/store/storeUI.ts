import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { persist } from "zustand/middleware";

interface UIStoreState {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (sidebarIsOpen: boolean) => void;
}

const useUIStore = create<UIStoreState>()(
  persist(
    (set) => ({
      sidebarIsOpen: false,
      setSidebarIsOpen: (sidebarIsOpen) => set({ sidebarIsOpen }),
    }),
    {
      name: "UIStore",
    }
  )
);

mountStoreDevtool("UIStore", useUIStore as any);

export { useUIStore };
