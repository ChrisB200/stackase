import { getStackWithPanels } from "@/services/stackService";
import type { Panel } from "@/types/panel";
import type { StackWithPanels } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface StackContextType {
  stack?: StackWithPanels | null;
  loading: boolean;
  error?: string | null;
  finished: boolean;
  panels: Panel[];
  panel?: Panel | null;
  hasSelectedPanel: boolean;
  setPanelURL: (panel: Panel) => void;
  setPanelChange: (index: number) => void;
  setCanChange: Dispatch<SetStateAction<boolean>>;
}

export const StackContext = createContext<StackContextType | null>(null);

interface StackProviderProps {
  children: ReactNode;
}

export const StackProvider = ({ children }: StackProviderProps) => {
  const { username, stackTitle } = useParams();
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [panels, setPanels] = useState<Panel[]>([]);
  const [panel, setPanel] = useState<Panel | null | undefined>(null);
  const [hasSelectedPanel, setHasSelectedPanel] = useState<boolean>(false);
  const [canChange, setCanChange] = useState<boolean>(true);

  const setPanelURL = (panel: Panel) => {
    setURLSearchParams({ panel: panel.id.toString() });
  };

  const setPanelChange = (index: number) => {
    const p = panels[index];
    if (!p) return;
    if (!canChange) return;

    setPanel(p);
    setPanelURL(p);
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
          hasSelectedPanel,
          panel,
          setCanChange,
          setPanelChange,
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
      setHasSelectedPanel(false);
      return;
    }

    const id = searchParams.get("panel");
    // get panel from search params
    if (id) {
      const parsedId = parseInt(id);
      if (parsedId) {
        setHasSelectedPanel(true);
        const newPanel = panels.find((p) => p.id === parsedId);
        setPanel(newPanel);
      } else {
        setHasSelectedPanel(false);
      }
    } else {
      setHasSelectedPanel(false);
      return;
    }
  }, [panels]);

  return (
    <StackContext.Provider
      value={{
        stack,
        loading: isLoading,
        error: error?.message,
        finished: true,
        panels,
        setPanelURL,
        panel,
        hasSelectedPanel,
        setPanelChange,
        setCanChange,
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
