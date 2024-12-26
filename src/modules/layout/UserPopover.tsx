import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../../components/ui/popover";
import { useState } from "react";
import { ChevronDownIcon } from "../../lib/icons";

export default function UserPopover() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  return (
    <Popover
      open={showProfileOptions}
      onOpenChange={setShowProfileOptions}
    >
      <PopoverTrigger asChild>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-1 px-4 rounded-lg border border-border text-xs">
          <span>
            Cristoper
          </span>
          <ChevronDownIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="">
        <p>asdasd</p>
      </PopoverContent>
    </Popover>
  );
};