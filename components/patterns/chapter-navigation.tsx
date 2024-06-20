import { Link } from "@remix-run/react";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { ConditionallyWrap } from "./conditionally-wrap";
import type { ChapterNavigation } from "@/lib/utils";
export interface ChapterNavigationProps {
  navigation: ChapterNavigation;
  buttonProps?: Partial<ButtonProps>;
  children?: React.ReactNode;
}

export function ChapterNavigation({
  navigation,
  children,
  buttonProps = {},
}: ChapterNavigationProps) {
  const [previousChapter, nextChapter] = navigation;
  return (
    <div className="align-center flex w-full items-center justify-between">
      <div className="flex gap-2">{children ? children : <></>}</div>
      <div className="flex gap-2">
        <ConditionallyWrap
          condition={Boolean(previousChapter)}
          wrapper={Link}
          wrapperProps={{
            to: `/${previousChapter?.slug}`,
            title: "Go to Previous Chapter",
            prefetch: "render",
          }}
        >
          <Button
            title="Go to Previous Chapter"
            variant="default"
            size="lg"
            className="py-6 px-4"
            disabled={!previousChapter}
            {...buttonProps}
          >
            <ChevronLeftIcon size="16" />
          </Button>
        </ConditionallyWrap>
        <ConditionallyWrap
          condition={Boolean(nextChapter)}
          wrapper={Link}
          wrapperProps={{
            to: `/${nextChapter?.slug}`,
            title: "Go to Next Chapter",
            prefetch: "render",
          }}
        >
          <Button
            title="Go to Next Chapter"
            variant="default"
            size="lg"
            className="py-6 px-4"
            disabled={!nextChapter}
            {...buttonProps}
          >
            <ChevronRightIcon size="16" />
          </Button>
        </ConditionallyWrap>
      </div>
    </div>
  );
}
