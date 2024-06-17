import { Link } from "@remix-run/react";
import { ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import type { Chapter } from ".contentlayer/generated";
import type { ChapterLike } from "@/lib/utils";

export interface ChapterNavigationProps {
  currentChapter: ChapterLike | undefined;
  chapters: Chapter[];
}

export function MobileChapterDrawer({
  currentChapter,
  chapters,
}: ChapterNavigationProps) {
  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) {
          document.querySelector("body")?.removeAttribute("data-scroll-locked");
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="text-md flex gap-2 py-6 px-4"
          title="Chapters"
        >
          <ListIcon size="16" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4">
          <ul>
            {chapters.map((chapter) => (
              <li key={`mobile_chapters_${chapter.slug}_mobile`}>
                <Link
                  to={`/${chapter.slug}`}
                  prefetch="render"
                  className="block"
                >
                  <Button
                    variant={
                      currentChapter?.slug === chapter.slug
                        ? "default"
                        : "ghost"
                    }
                    className="h-auto w-full justify-start gap-2 text-left text-wrap"
                    aria-label={`Read Chapter Named ${chapter.title}`}
                  >
                    {chapter.title}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
