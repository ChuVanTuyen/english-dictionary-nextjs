"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Word } from "./type";
import SpeakerIcon from "@/components/icons/SpeakerIcon.svg";
import BookmarkIcon from "@/components/icons/BookmarkIcon.svg";

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
    <div className="grid grid-cols-12 container mx-auto gap-4 mt-10">ok
      <div className="col-span-12">
        <Search />
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-3">
          {listWord.map((word) => (
            <Card key={word.word} className="ring-0 p-4 gap-1">
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
        {detailWord && (
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
              <Card key={content.kind} className="p-4 ring-0">
                <div>{content.kind}</div>
                <div>
                  {content.kind_content.map((kind) => (
                    <div key={kind.means}>
                      <div>{kind.means}</div>
                      <div>Ví dụ</div>
                      {kind.examples.map((example) => (
                        <div key={example.example}>
                          <div>{example.example}</div>
                          <div>{example.mean}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function playAudio(value: string, voice: string = "US") {
  return new Promise((resolve) => {
    audioBrowser(value, `en-${voice}`)!.onend = resolve;
  });
}

function audioBrowser(value: string, lang: string) {
  const newvalue = value.replace(/(<([^>]+)>)/gi, "");
  if (!newvalue) return;

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  const msg = new SpeechSynthesisUtterance();

  msg.volume = 1;
  msg.rate = 0.68;
  msg.pitch = 1;
  msg.text = newvalue;
  msg.lang = lang;

  setTimeout(() => {
    const voiceList = speechSynthesis.getVoices();
    const voiceMatch = voiceList.find((item) => item.lang === lang);
    msg.voice = voiceMatch!;
    speechSynthesis.speak(msg);
  }, 10);

  return msg;
}
