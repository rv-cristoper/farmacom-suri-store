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
      <PopoverTrigger className=" p-3 rounded-2xl" asChild>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-2 px-4 rounded-lg border text-sm">
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