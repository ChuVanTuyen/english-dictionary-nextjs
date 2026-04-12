import { cn } from "@/lib/utils";
import { DislikeIcon } from "../icons/DislikeIcon";
import { LikeIcon } from "../icons/LikeIcon";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function RankingFeedback() {
  return (
    <Card className="ring-0">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Bảng xếp hạng</CardTitle>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="divide-y divide-(--border-primary)">
        <Feedback data={""} className="py-4" />
        <Feedback data={""} className="py-4" />
        <Feedback data={""} className="py-4" />
        <Feedback data={""} className="py-4" />
        <Feedback data={""} className="py-4" />
      </CardContent>
    </Card>
  );
}

export function Feedback({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  return (
    <div className={cn( 'flex items-start gap-2', className)}>
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale"
        />
      </Avatar>
      <div>
        <span className="font-semibold">Duster</span>: khăn lau bụi, cây lau bụi
        <div className="flex items-center mt-1">
          <LikeIcon className="w-5 h-5" /> 1{" "}
          <span className="inline-block mx-2">|</span>{" "}
          <DislikeIcon className="w-5 h-5" /> 0
        </div>
      </div>
    </div>
  );
}
