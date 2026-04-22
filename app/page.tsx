import { RankingFeedback } from "@/components/home/RankingFeedback";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ListWordSidebar } from "@/components/home/ListWordSidebar";
import { SearchBar } from "@/components/SearchBar";
import { ArrowLeftIcon, ArrowRightIcon, TipIcon } from "@/components/icons";

export default function Home() {
  const hots = [
    "guarantee",
    "perspective",
    "distribute",
    "miserable",
    "weird",
    "feature",
    "appreciate",
    "appropriate",
  ];

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-7 container mx-auto gap-3 mt-6">
        <div className="col-span-2">
          <ListWordSidebar data={hots} title="Từ khóa hót" />
          <ListWordSidebar data={hots} title="Lịch sử" className="mt-4" />
        </div>
        <div className="col-span-3">
          <Card className="ring-0 p-4 relative h-87.5">
            <CardTitle>
              <TipIcon className="inline-block mr-2" />
              Mẹo
            </CardTitle>
            <CardContent>
              <span>Chủ đề: Văn hóa</span>
              <p>
                Gà nướng đất sét là một món ăn mang tên gọi độc đáo, có nguồn
                gốc từ một câu chuyện dân gian truyền thống, và đến ngày nay vẫn
                được truyền bá. Gà được ướp gia vị kỹ càng, nhồi bên trong với
                gừng thơm ...
              </p>
            </CardContent>
            <ButtonGroup className="absolute bottom-4 left-4">
              <Button variant="outline" className="cursor-pointer">
                <ArrowLeftIcon className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="cursor-pointer">
                <ArrowRightIcon />
              </Button>
            </ButtonGroup>

            <div className="absolute text-center bg-(--surface-info-primary) text-(--text-white) font-medium px-4 py-2 rounded-[24px_0] right-0 bottom-0">
              Sơ cấp
            </div>
          </Card>
        </div>
        <div className="col-span-2">
          <RankingFeedback />
        </div>
      </div>
    </div>
  );
}
