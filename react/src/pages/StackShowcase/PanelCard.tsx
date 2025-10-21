import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { STORAGE_URL } from "@/config/constants";
import type { Panel } from "@/types/panel";
import { motion } from "motion/react";

interface Props {
  panel: Panel;
}

function PanelCard({ panel }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      layoutId={`panel-${panel.id}`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "w-full h-full max-w-[75vw] max-h-[60vh] md:max-w-[800px] md:max-h-[600px]",
      )}
    >
      {/* Skeleton placeholder */}
      {!loaded && !error && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
      )}

      {/* Actual image */}
      <img
        src={`${STORAGE_URL}/panels/${panel.id}.png`}
        alt={panel.caption}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={cn(
          "object-contain w-full h-full transition-opacity duration-500",
          loaded && !error ? "opacity-100" : "opacity-0",
        )}
        loading="eager"
        draggable={false}
      />

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
    </motion.div>
  );
}

export default PanelCard;
