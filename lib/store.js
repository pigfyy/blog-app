import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAppStore = create(
  devtools((set) => ({
    userId: "",
    userUsername: "",
    setUserId: (id) => {
      set(() => ({
        userId: id,
      }));
    },
    setUserUsername: (username) => {
      set(() => ({
        userUsername: username,
      }));
    },
  }))
);

export { useAppStore };
