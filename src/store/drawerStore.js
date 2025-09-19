import { create } from 'zustand';

export const useDrawerStore = create((set, get) => ({
  drawers: {},
  isOpen: {},

  openDrawer: (key, component, configDrawer = {}) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: {
          component,
          config: configDrawer,
        },
      },
      isOpen: { ...state.isOpen, [key]: true },
    })),

  closeDrawer: (key) =>
    set((state) => {
      const newDrawers = { ...state.drawers };
      const newIsOpen = { ...state.isOpen };
      delete newDrawers[key];
      delete newIsOpen[key];

      return {
        drawers: newDrawers,
        isOpen: newIsOpen,
      };
    }),

  closeAllDrawers: () => set({ drawers: {}, isOpen: {} }),

  toggleDrawer: (key, component) => {
    const { isOpen } = get();
    if (isOpen[key]) {
      get().closeDrawer(key);
    } else {
      get().openDrawer(key, component);
    }
  },

  // Nhận mảng keys → true nếu có ít nhất 1 cái đang mở
  isDrawerOpen: (keys) => {
    const isOpen = get().isOpen;
    return keys.some((key) => isOpen[key]);
  },

  // True nếu có ít nhất 1 drawer đang mở toàn cục
  hasOpenDrawers: () => Object.values(get().isOpen).some((v) => v === true),

  closeAllExcept: (keysToKeep = []) =>
    set((state) => {
      const newDrawers = {};
      const newIsOpen = {};

      keysToKeep.forEach((key) => {
        if (state.drawers[key]) {
          newDrawers[key] = state.drawers[key];
          newIsOpen[key] = true;
        }
      });

      return {
        drawers: newDrawers,
        isOpen: newIsOpen,
      };
    }),
}));
