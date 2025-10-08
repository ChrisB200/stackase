import { useEffect, useCallback, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useStack } from "@/contexts/StackContext";
import { STORAGE_URL } from "@/config/constants";
import PanelCard from "./PanelCard";

export function PanelCarousel() {
  const { panels, setPanelChange, panel } = useStack();
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  const handleSelect = useCallback(() => {
    if (!api) return;
    const idx = api.selectedScrollSnap();
    setPanelChange(idx);
    console.log("Slide changed to:", idx);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.scrollTo(panel ? panel.position - 1 : 0, true);

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, handleSelect]);

  return (
    <div className="relative flex justify-center w-[80vw]">
      <Carousel
        className="w-fit"
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
      >
        <CarouselContent>
          {panels.map((panel) => (
            <CarouselItem className="flex justify-center items-center">
              <PanelCard panel={panel} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-20 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8" />
      </Carousel>
    </div>
  );
}

export default PanelCarousel;
