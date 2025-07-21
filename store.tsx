import { create } from 'zustand';

interface Store {
    imageSrc: string | null;
    setImageSrc: (imageSrc: string | null) => void;
    type: string | null;
    setType: (type: string | null) => void;
}

const useStore = create<Store>((set) => ({
    imageSrc: null,
    type: null,
    setImageSrc: (imageSrc: string | null) => set({ imageSrc }),
    setType: (type: string | null) => set({ type }),
}));

export default useStore;