import InteractionButton from "@/components/InteractionButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import supabase from "@/config/supabase";
import usePanelSelection from "@/hooks/usePanelSelection";
import { Download, Ellipsis, Flag } from "lucide-react";
import { toast } from "sonner";

function MoreDropdown() {
  const { selectedPanel } = usePanelSelection();

  const handleClick = async () => {
    if (!selectedPanel) return toast.error("Error downloading panel");
    const { data, error } = await supabase.storage
      .from("panels")
      .download(`${selectedPanel.id}.png`);

    if (error || !data) return toast.error("Error downloading panel");

    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedPanel.caption || selectedPanel.id}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);

    toast.success("Download started!");
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <InteractionButton Icon={Ellipsis} />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>More</TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="top">
        <DropdownMenuItem>
          <Flag />
          Report
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick}>
          <Download />
          Download
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown;
