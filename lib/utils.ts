import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChapterNavigationProps } from "@/components/patterns/chapter-navigation";
import type { useToast } from "./hooks/use-toast";
import type { Chapter, Meta } from ".contentlayer/generated";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type ChapterLike = Pick<Chapter, "slug" | "title" | "index">;

export type ChapterNavigation = [ChapterLike | undefined, ChapterLike | undefined];

export function getChapterNavigation(
  currentChapter: ChapterLike | undefined,
  chapters: ChapterLike[]
): ChapterNavigationProps["navigation"] {
  const slug = currentChapter?.slug;
  const index = slug ? getSlugChapterIndex(slug, chapters) : -1;
  return [chapters[index - 1], chapters[index + 1]];
}

export function getSlugChapterIndex(slug: string, chapters: ChapterLike[]): number {
  return chapters.findIndex((chapter: ChapterLike) => chapter.slug === slug);
}

/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Error} if condition is falsey
 */
export function invariant(condition: any, message: string | (() => string)): asserts condition {
  if (!condition) {
    throw new Error(typeof message === "function" ? message() : message);
  }
}

/**
 * Provide a condition and if that condition is falsey, this throws a 400
 * Response with the given message.
 *
 * inspired by invariant from 'tiny-invariant'
 *
 * @example
 * invariantResponse(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw (or a callback to generate the message)
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Response} if condition is falsey
 */
export function invariantResponse(
  condition: any,
  message: string | (() => string),
  responseInit?: ResponseInit
): asserts condition {
  if (!condition) {
    throw new Response(typeof message === "function" ? message() : message, {
      status: 400,
      ...responseInit,
    });
  }
}

export interface ShareData {
  title: string;
  url: string;
  text: string;
}

export async function shareOrCopy(
  { title, url, text }: ShareData,
  onSuccess: (shareData: ShareData, method: "share" | "clipboard") => void,
  onFail?: (shareData?: ShareData) => void
) {
  if (navigator.share) {
    await navigator.share({
      title: title,
      url: url,
      text: text,
    });
    onSuccess({ title, url, text }, "share");
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
    onSuccess({ title, url, text }, "clipboard");
  } else if (onFail) {
    onFail({ title, url, text });
  }
}

export function shareMetaCurry(
  toast: ReturnType<typeof useToast>["toast"],
  meta: Meta
) {
  return async () => {
    await shareOrCopy(
      {
        title: meta.title,
        url: window.location.href,
        text: meta.body.raw,
      },
      (_, method: "clipboard" | "share") => {
        if (method === "clipboard") {
          toast({
            title: "Link Copied",
          });
        }
      },
      (_) => {
        toast({
          title: `Could not share`,
          description: `It seems like your browser does not support sharing or copying links.`,
        });
      }
    );
  };
}


export function getRequestUrl(host: string | URL, route?: string) {
  const hostString = typeof host === 'string' ? host : host.toString();
  const hostStringWithSchema = addSchemaToHost(hostString);

  const url = new URL(route ?? '', hostStringWithSchema);

  return url.toString();
}

function addSchemaToHost(host: string) {
  if (host.startsWith('http://') || host.startsWith('https://')) {
    return host;
  }
  return `https://${host}`;
}
