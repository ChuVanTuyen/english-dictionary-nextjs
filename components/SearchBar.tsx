"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MicroIcon, PencilIcon, PieceIcon, SearchIcon } from "./icons";

interface SuggestWord {
  word: string;
  pronounce: string;
  content: {
    kind: string;
    kind_content: {
      means: string;
    }[];
  }[];
}

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isShowSuggest, setIsShowSuggest] = useState(false);
  const [debounced, setDebounced] = useState(query);
  const [suggestions, setSuggestions] = useState<SuggestWord[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debounced.trim()) {
      setSuggestions([]);
      return;
    }
    setIsShowSuggest(true);
    fetch(`/api/dictionary/suggest?q=${debounced}&limit=10`)
      .then((res) => res.json())
      .then(setSuggestions);
  }, [debounced]);

  const confirmSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setIsShowSuggest(false);
    }
  };

  return (
    <div className="relative w-[95vw] max-w-237 mx-auto">
      <label className="relative z-2 h-16 flex items-center bg-(--surface-default-inverse) rounded-full mt-9 px-5 outline outline-(--primary-60-color)">
        <SearchIcon />
        <input
          className="flex-1 h-full pl-2 outline-none text-lg"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => confirmSearch(e)}
          onBlur={() => setTimeout(() => setIsShowSuggest(false), 100)}
          onFocus={() => suggestions.length && setIsShowSuggest(true)}
        />
        <MicroIcon className="mr-4" />
        <PencilIcon className="mr-4" />
        <PieceIcon />
      </label>
      {suggestions?.length > 0 && isShowSuggest && (
        <div className="shadow-[0_8px_8px_4px_#00000014] bg-(--surface-default-inverse) top-8 z-1 absolute w-full rounded-b-[24px]">
          <div className="mt-12 mx-4 mb-4 overflow-auto max-h-125">
            {suggestions.map((suggestion) => (
              <Link
                onClick={() => setIsShowSuggest(false)}
                key={suggestion.word}
                href={`/search?query=${encodeURIComponent(suggestion.word)}`}
                className="block p-4 hover:bg-(--surface-neutral-primary)"
              >
                <div className="line-clamp-1">
                  <span className="font-medium">{suggestion.word}</span>{" "}
                  {suggestion.pronounce}{" "}
                  {suggestion.content.map((cont) =>
                    cont.kind_content.map((item) => (
                      <span key={item.means}>{item.means + "; "}</span>
                    )),
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
