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
      if (!internalChange.current) {
        api.scrollTo(selectedPanel ? selectedPanel.position : 0, true);
      }
      internalChange.current = false;
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
    <div className="relative flex w-full max-w-[80vw] flex-col items-center justify-center">
      <Carousel
        className="relative w-full max-w-full"
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
      >
        <CarouselContent className="-ml-0">
          {panels && panels.length > 0 ? (
            panels.map((panel) => (
              <CarouselItem
                className="flex min-h-[min(60vh,600px)] basis-full items-center justify-center pl-0"
                key={panel.id}
              >
                <PanelCard panel={panel} />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="flex min-h-[min(60vh,600px)] basis-full items-center justify-center pl-0">
              <Skeleton className="h-[50vh] w-full max-w-[75vw] rounded-md md:max-w-[800px]" />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-0 z-20 -translate-x-8 -translate-y-1/2" />
        <CarouselNext className="absolute top-1/2 right-0 z-20 translate-x-8 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}

export default PanelCarousel;
