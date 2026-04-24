"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { RepetitionChart } from "./(components)/RepetitionChart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/components/icons";

export default function Page() {
  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-x-6 gap-y-3 container mx-auto mt-10">
      <div className="row-span-2 col-span-3">
        <RepetitionChart />
      </div>
      <div className="col-span-9">
        <Card className="ring-0 p-4 gap-0">
          <CardTitle>Cá nhân</CardTitle>
          <div className="flex flex-col items-center">
            <Image
              src="/images/status.png"
              alt="Empty"
              width={100}
              height={100}
            />
            <div>Bạn hãy đăng nhập để tạo sổ tay</div>
            <Button className="mt-4 bg-(--surface-brand-primary) rounded-full">
              <AddIcon /> Đăng nhập
            </Button>
          </div>
        </Card>
      </div>
      <div className="col-span-9">
        <Card className="ring-0 p-4">
          <CardTitle>Miễn phí</CardTitle>
          <div>
            <NotebookCard />
            <NotebookCard />
          </div>
        </Card>
      </div>
    </div>
  );
}

function NotebookCard() {
  return <div className="bg-(--surface-neutral-primary) border border-(--border-primary) w-60 p-3 rounded-2xl">
    <div className="text-base font-medium">Toeic 1</div>
    <div className="mt-3 text-(--text-small-tertiary)">500 từ</div>
  </div>;
}