import clsx from 'clsx';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  Children,
  cloneElement,
} from 'react';

// Tạo context
const TabsContext = createContext();

export function Tabs({ defaultIndex = 0, onChange, children }) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const changeIndex = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      onChange?.(index);
    }
  };

  return (
    <TabsContext.Provider value={{ currentIndex, setIndex: changeIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used inside <Tabs />');
  return ctx;
}

export function Tab({ isActive, onSelect, children, className, ...rest }) {
  return (
    <button
      onClick={onSelect}
      className={clsx(isActive ? 'tab-active' : 'tab-inactive', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TabList({ children, className }) {
  const { currentIndex, setIndex } = useTabs();

  return (
    <div className={clsx('flex gap-2', className)} style={{ display: 'flex' }}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isActive: currentIndex === index,
          onSelect: () => setIndex(index),
        })
      )}
    </div>
  );
}

export function TabPanels({ children, className }) {
  const { currentIndex } = useTabs();
  const panels = Children.toArray(children);
  return <div className={clsx('mt-4', className)}>{panels[currentIndex]}</div>;
}
