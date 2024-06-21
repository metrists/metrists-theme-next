import { Header } from "@/components/patterns/header";
import { Sidebar } from "@/components/patterns/sidebar";
import { allMeta, allChapters } from "contentlayer/generated";
import { getChapterNavigation } from "@/lib/utils";

export function getStaticProps() {
  const navigation = getChapterNavigation(undefined, allChapters);
  return {
    props: {
      meta: allMeta[0],
      chapters: allChapters,
      navigation,
    },
  };
}

export default function Home({
  meta,
  chapters,
  navigation,
}: ReturnType<typeof getStaticProps>["props"]) {
  return (
    <Header meta={meta}>
      <Sidebar meta={meta} chapters={chapters} navigation={navigation}>
        content
      </Sidebar>
    </Header>
  );
}
