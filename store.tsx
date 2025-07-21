import { create } from 'zustand';

interface Store {
    imageSrc: string | null;
    setImageSrc: (imageSrc: string | null) => void;
    type: string | null;
    setType: (type: string | null) => void;
    openedProjects: boolean[];
    toggleOpenedProject: (index: number) => void;
}

const useStore = create<Store>((set) => ({
    imageSrc: null,
    type: null,
    setImageSrc: (imageSrc: string | null) => set({ imageSrc }),
    setType: (type: string | null) => set({ type }),
    openedProjects: [true, false, false, false],
    toggleOpenedProject: (index: number) => set((state) => ({ openedProjects: state.openedProjects.map((current, i) => i === index ? !current : current )})),
}));

export default useStore;