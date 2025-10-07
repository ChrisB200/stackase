import { getStackWithPanels } from "@/services/stackService";
import type { Panel } from "@/types/panel";
import type { StackWithPanels } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface StackContextType {
  stack?: StackWithPanels | null;
  loading: boolean;
  error?: string | null;
  finished: boolean;
  panel?: Panel | null;
  panels: Panel[];
  setPanelURL: (panel: Panel) => void;
}

export const StackContext = createContext<StackContextType | null>(null);

interface StackProviderProps {
  children: ReactNode;
}

export const StackProvider = ({ children }: StackProviderProps) => {
  const { username, stackTitle } = useParams();
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [panels, setPanels] = useState<Panel[]>([]);

  const setPanelURL = (panel: Panel) => {
    setURLSearchParams({ panel: panel.id.toString() });
  };

  // stack has a chance to not exist
  if (!username || !stackTitle)
    return (
      <StackContext.Provider
        value={{
          stack: null,
          loading: false,
          error: "username and stack title not present",
          panels,
          finished: true,
          setPanelURL,
        }}
      >
        {children}
      </StackContext.Provider>
    );

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

  useEffect(() => {
    if (!stack) {
      setPanel(null);
      return;
    }

    const id = searchParams.get("panel");
    // get panel from search params
    if (id) {
      setPanel(stack.panels.filter((panel) => panel.id === parseInt(id))[0]);
    } else {
      setPanel(null);
      return;
    }
  }, [searchParams, stack]);

  return (
    <StackContext.Provider
      value={{
        stack,
        loading: isLoading,
        error: error?.message,
        finished: true,
        panel,
        panels,
        setPanelURL,
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
