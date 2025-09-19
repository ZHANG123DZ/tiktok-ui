import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import clsx from 'clsx';

const TabsContext = createContext();

export function Tabs({ defaultValue, children, className, ...props }) {
  const [activeValue, setActiveValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={clsx('tabs-container', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used inside <Tabs>');
  return ctx;
}

export function TabList({ children, ...props }) {
  return <>{children}</>;
}

export function Tab({ value, children }) {
  const { activeValue, setActiveValue } = useTabs();
  const isActive = activeValue === value || activeValue.startsWith(value);

  return cloneElement(children, {
    onClick: () => setActiveValue(value),
    'data-active': isActive,
  });
}

export function TabPanels({ children }) {
  const { activeValue } = useTabs();

  // chỉ render đúng panel có value trùng
  return React.Children.toArray(children).find(
    (child) => child.props.value === activeValue
  );
}

export function TabPanel({ value, children }) {
  const { activeValue } = useTabs();

  if (activeValue !== value) return null;

  return <>{children}</>;
}
