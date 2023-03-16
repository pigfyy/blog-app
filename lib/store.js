import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAppStore = create(
  devtools((set) => ({
    userId: "",
    setUserId: (id) => {
      set(() => ({
        userId: id,
      }));
    },
  }))
);

export { useAppStore };
