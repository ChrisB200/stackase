import { getStackWithPanels } from "@/services/stackService";
import type { Panel } from "@/types/panel";
import type { StackWithPanels } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface StackContextType {
  stack?: StackWithPanels | null;
  loading: boolean;
  error?: string | null;
  finished: boolean;
  panels: Panel[];
}

export const StackContext = createContext<StackContextType | null>(null);

interface StackProviderProps {
  children: ReactNode;
  username: string;
  stackTitle: string;
}

export const StackProvider = ({
  username,
  stackTitle,
  children,
}: StackProviderProps) => {
  const [panels, setPanels] = useState<Panel[]>([]);

  // request stack and panels
  const {
    data: stack,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getStackWithPanels(username, stackTitle),
    queryKey: ["get", "stack", username, stackTitle],
  });

  useEffect(() => {
    if (!stack) return;

    // sort the panels within the stack
    setPanels(stack.panels.sort((a, b) => a.position - b.position));
  }, [stack]);

  return (
    <StackContext.Provider
      value={{
        stack,
        loading: isLoading,
        error: error?.message,
        finished: true,
        panels,
      }}
    >
      {children}
    </StackContext.Provider>
  );
};

export const useStack = (): StackContextType => {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error("useStack must be used within a StackProvider");
  }
  return context;
};
