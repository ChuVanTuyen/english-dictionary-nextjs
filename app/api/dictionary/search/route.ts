import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;

  const wordsInQuery = query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  if (wordsInQuery.length === 0) {
    return NextResponse.json([]);
  }

  const whereCondition = {
    OR: wordsInQuery.map((w) => ({
      word: {
        contains: w,
      },
    })),
  };

  const words = await prisma.word.findMany({
    where: whereCondition,
    take: limit,
    include: {
      synonyms: true,
      antonyms: true,
      contents: {
        include: {
          kindContents: {
            include: {
              examples: true,
            },
          },
          idioms: true,
        },
      },
    },
  });

  const result = words.map((word) => ({
    word: word.word,
    pronounce: word.pronounce,
    synonyms: word.synonyms.map((s) => s.synonym),
    antonyms: word.antonyms.map((a) => a.antonym),
    content: word.contents.map((content) => ({
      kind: content.kind,
      kind_content: content.kindContents.map((kc) => ({
        means: kc.means,
        examples: kc.examples.map((ex) => ({
          example: ex.example,
          mean: ex.mean,
        })),
      })),
      idioms: content.idioms.map((id) => ({
        idiom: id.idiom,
        mean: id.mean,
      })),
    })),
  }));

  return NextResponse.json(result);
}