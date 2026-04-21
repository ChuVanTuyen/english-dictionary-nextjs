import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";

type ListWordSideType = {
  data: string[];
  title: string;
  className?: string;
};

export function ListWordSidebar({ title, data, className }: ListWordSideType) {
  return (
    <Card className={cn("ring-0 p-4", className)}>
      <CardTitle>{title}</CardTitle>
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <Badge 
            key={item}
            variant="secondary"
            className="cursor-pointer text-base font-normal h-8 px-2 inline-block"
          >
            {item}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
