import { useEffect, useCallback, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import PanelCard from "./PanelCard";
import usePanelSelection from "@/hooks/usePanelSelection";
import { Skeleton } from "@/components/ui/skeleton";

export function PanelCarousel() {
  const { panels, setPanelByPosition, selectedPanel } = usePanelSelection();
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const internalChange = useRef(false);

  const handleSelect = useCallback(() => {
    if (!api) return;
    internalChange.current = true;
    const idx = api.selectedScrollSnap();
    setPanelByPosition(idx);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const scrollToSelected = () => {
      // 👇 only scroll if change came from outside (e.g., Back button)
      if (!internalChange.current) {
      }
      internalChange.current = false; // reset after handling
      api.scrollTo(selectedPanel ? selectedPanel.position : 0, true);
    };

    scrollToSelected();

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, handleSelect, selectedPanel]);

  return (
    <div className="relative flex justify-center w-[80vw] min-h-[60vh]">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
      >
        <CarouselContent>
          {panels && panels.length > 0 ? (
            panels.map((panel) => (
              <CarouselItem
                className="flex justify-center items-center"
                key={panel.id}
              >
                <PanelCard panel={panel} />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="relative max-w-[75vw] max-h-[60vh]">
              <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="z-20 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8" />
      </Carousel>
    </div>
  );
}

export default PanelCarousel;
