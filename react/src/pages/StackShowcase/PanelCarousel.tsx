import { useEffect, useCallback, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useStack } from "@/contexts/StackContext";
import { STORAGE_URL } from "@/config/constants";

export function PanelCarousel() {
  const { panels, setPanelChange, panel } = useStack();
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  const handleSelect = useCallback(() => {
    if (!api) return;
    const idx = api.selectedScrollSnap();
    setPanelChange(idx);
    // ← Your “slide changed” logic goes here.
    console.log("Slide changed to:", idx);
    // e.g. set some internal state, trigger effects, etc.
  }, [api]);

  useEffect(() => {
    if (!api) return;

    // Call it initially so you get the starting slide
    // handleSelect();
    api.scrollTo(panel ? panel.position - 1 : 0, true);

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, handleSelect]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {panels.map((panel, idx) => (
          <CarouselItem key={panel.id}>
            <img
              src={`${STORAGE_URL}/panels/${panel.id}.png`}
              alt={`Panel ${idx}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default PanelCarousel;
