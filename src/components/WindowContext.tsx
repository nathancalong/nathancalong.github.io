import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface WindowContextValue {
  closedCount: number;
  registerClose: () => void;
  resetAll: () => void;
  resetKey: number;
}

const WindowContext = createContext<WindowContextValue>({
  closedCount: 0,
  registerClose: () => {},
  resetAll: () => {},
  resetKey: 0,
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const [closedCount, setClosedCount] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const registerClose = useCallback(() => {
    setClosedCount((c) => c + 1);
  }, []);

  const resetAll = useCallback(() => {
    setClosedCount(0);
    setResetKey((k) => k + 1);
  }, []);

  return (
    <WindowContext.Provider value={{ closedCount, registerClose, resetAll, resetKey }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowContext() {
  return useContext(WindowContext);
}
