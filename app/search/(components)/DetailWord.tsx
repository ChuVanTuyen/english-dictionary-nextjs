import { BookmarkIcon, PlayFill, SpeakerIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { playAudio } from "@/lib/utils";
import { Word } from "../type";
import { Badge } from "@/components/ui/badge";

export function DetailWord({ detailWord }: { detailWord: Word }) {
  return (
    <div className="flex flex-col gap-3">
      <Card className="ring-0 p-4 gap-0">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">{detailWord.word}</div>
          <div className="flex items-center gap-2">
            <span onClick={() => playAudio(detailWord.word || "")}>
              <SpeakerIcon />
            </span>{" "}
            <span>
              <BookmarkIcon />
            </span>
          </div>
        </div>
        <div className="text-(--text-small-secondary) text-lg">
          {detailWord?.pronounce}
        </div>
      </Card>
      {detailWord.content?.map((content) => (
        <Card key={content.kind} className="p-4 ring-0 text-base gap-2">
          <div className="flex items-center gap-3">
            <PlayFill className="w-4 h-4 text-(--icon-red) inline rotate-90" />{" "}
            <span>{content.kind}</span>
          </div>
          <div className="pl-2">
            {content.kind_content?.map((kind, kindIdx) => (
              <div key={kind.means} className="mb-3">
                <div className="font-semibold text-(--text-small-primary) mb-2">
                  {kindIdx + 1}. {kind.means}
                </div>
                {kind.examples?.map((example) => (
                  <div key={example.example} className="mb-1">
                    <div>
                      <SpeakerIcon className="inline" /> {example.example}
                    </div>
                    <div className="pl-7">{example.mean}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      ))}
      {detailWord.synonyms && (
        <Card className="p-4 ring-0 text-base">
          <div className="flex items-center gap-3">
            <PlayFill className="w-4 h-4 text-(--icon-red) inline rotate-90" />{" "}
            <span>Từ đồng nghĩa</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {detailWord.synonyms.map((syn) => (
              <Badge variant="secondary">{syn}</Badge>
            ))}
          </div>
        </Card>
      )}

      {detailWord.antonyms && (
        <Card className="p-4 ring-0 text-base">
          <div className="flex items-center gap-3">
            <PlayFill className="w-4 h-4 text-(--icon-red) inline rotate-90" />{" "}
            <span>Từ trái nghĩa</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {detailWord.antonyms.map((ant) => (
              <Badge variant="secondary">{ant}</Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
