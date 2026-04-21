import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const wordsInQuery = query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const wordsRaw = await prisma.$queryRaw<any[]>`
    SELECT id, word, pronounce
    FROM words
    WHERE word LIKE ${`%${wordsInQuery}%`}
    ORDER BY 
      CASE 
        WHEN word LIKE ${`${wordsInQuery}%`} THEN 0
        ELSE 1
      END,
      word ASC
    LIMIT ${limit}
  `;

  const ids = wordsRaw.map((w) => w.id);
  const words = await prisma.word.findMany({
    where: { id: { in: ids } },
    include: {
      contents: {
        include: {
          kindContents: true,
        },
      },
    },
  });

  let result = words.map((word) => ({
    word: word.word,
    pronounce: word.pronounce,
    content: word.contents.map((content) => ({
      kind: content.kind,
      kind_content: content.kindContents.map((kc) => ({
        means: kc.means,
      })),
    })),
  }));

  return NextResponse.json(result);
}
