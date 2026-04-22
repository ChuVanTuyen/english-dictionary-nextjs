import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="grid grid-cols-12 grid-rows-3 container mx-auto">
      <div className="row-span-3 col-span-3">
        <Card className="ring-0 p-4">
          <div className="text-xl font-extrabold">Spaced Repetition </div>
        </Card>
      </div>
      <div className="col-span-9">personal</div>
      <div className="col-span-9">free</div>
      <div className="col-span-9">fee</div>
    </div>
  );
}