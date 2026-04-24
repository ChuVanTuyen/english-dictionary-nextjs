"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Word } from "./type";
import { SearchBar } from "@/components/SearchBar";
import { BookmarkIcon, SpeakerIcon } from "@/components/icons";
import { DetailWord } from "./(components)/DetailWord";

export default function Search() {
  const query = useSearchParams().get("query")?.trim() || "";
  const [listWord, setListWord] = useState<Word[]>([]);
  const [detailWord, setDetailWord] = useState<Word | undefined>();

  useEffect(() => {
    if (!query) {
      setListWord([]);
      setDetailWord(undefined);
      return;
    }
    fetch(`/api/dictionary/search?query=${query}`)
      .then((res) => res.json())
      .then((res) => {
        setListWord(res);
        setDetailWord(handleResult(res));
      })
      .catch((err) => console.log(err));
  }, [query]);

  const handleResult = (listWord: Word[]) => {
    const word = listWord.find((word) => word.word === query);
    return word;
  };

  return (
    <div className="grid grid-cols-12 container mx-auto gap-4 mt-10">
      <div className="col-span-12">
        <SearchBar />
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-3">
          {listWord.map((word) => (
            <Card key={word.word} className="ring-0 p-4 gap-1 text-base">
              <div className="font-semibold">{word.word}</div>
              <div className="text-(--text-small-secondary) text-sm">
                {word.pronounce}
              </div>
              <div>Hạnh kiểm, tư cách đạo đức</div>
            </Card>
          ))}
        </div>
      </div>
      <div className="col-span-9">
        {detailWord && <DetailWord detailWord={detailWord} />}
      </div>
    </div>
  );
}
