export interface Idiom {
  idiom: string;
  mean: string;
}

export interface Example {
  example: string;
  mean: string;
}

export interface KindContentWord {
  means: string;
  examples: Example[];
}

export interface ContentWord {
  kind: string;
  kind_content: KindContentWord[];
  idioms: Idiom[];
}

export interface Word {
  word: string;
  pronounce: string;
  synonyms: string[];
  antonyms: string[];
  content: ContentWord[];
}

export interface KindContentSuggestWord {
  means: string;
}

export interface ContentSuggestWord {
  kind: string;
  kind_content: KindContentSuggestWord[];
}

export interface SuggestWord {
  word: string;
  pronounce: string;
  content: ContentSuggestWord[];
}