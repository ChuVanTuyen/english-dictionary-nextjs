import { MicroIcon } from "@/components/icons/MicroIcon";
import { PencilIcon } from "@/components/icons/PencilIcon";
import { PieceIcon } from "@/components/icons/PieceIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";

export default function Home() {
  return (
    <div className="h-16 w-[95vw] max-w-237 flex items-center bg-(--surface-default-inverse) ">
      <SearchIcon />
      <input className="flex-1" type="text" />
      <MicroIcon />
      <PencilIcon />
      <PieceIcon />
    </div>
  );
}
