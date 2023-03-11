import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAppStore = create(
  devtools((set) => ({
    editPostPage: {
      coverImg: "",
      isEdit: "",
      newImg: "",
      setCoverImg: (img) => {
        set((state) => ({
          editPostPage: {
            ...state.editPostPage, // keep other properties
            coverImg: img, // update coverImg property
          },
        }));
      },
    },
  }))
);

export { useAppStore };
