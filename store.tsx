import { create } from 'zustand';

interface Store {
    imageSrc: string | null;
    setImageSrc: (imageSrc: string | null) => void;
    type: string | null;
    setType: (type: string | null) => void;
    openedProjects: boolean[];
    toggleOpenedProject: (index: number) => void;
    locked: {
        [key: string]: boolean;
    };
    setLocked: (locked: { [key: string]: boolean }) => void;
    clearAllLocked: () => void;
    isAnyLocked: () => boolean;
}

const useStore = create<Store>((set, get) => ({
    imageSrc: null,
    type: null,
    setImageSrc: (imageSrc: string | null) => set({ imageSrc }),
    setType: (type: string | null) => set({ type }),
    openedProjects: [false, false, false, false],
    toggleOpenedProject: (index: number) => set((state) => ({ openedProjects: state.openedProjects.map((current, i) => i === index ? !current : current )})),
    locked: {
        "me": false,
        "climb": false,
        "music": false,
        "travel": false,
        "movie": false,
        "learn": false
    },
    setLocked: (locked: { [key: string]: boolean }) => set({ locked }),
    clearAllLocked: () => set({ locked: {
        "me": false,
        "climb": false,
        "music": false,
        "travel": false,
        "movie": false,
        "learn": false
    }}),
    isAnyLocked: () => {
        for (const key in get().locked) {
            if (get().locked[key]) {
                return true;
            }
        }
        return false;
    }
}));

export default useStore;