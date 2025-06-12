import { getPost } from "@/lib/markdown";
import ReaderShell from "./ReaderShell";

type Props = {
  params: { book: string; slug: string };
};

export default async function Page({ params }: Props) {
  const { book, slug } = await params;
  const { meta, html } = await getPost(book, slug);

  return (
    <ReaderShell
      title={meta?.title ?? `第 ${slug} 段`}
      content={html}
      book={book}
      slug={Number(slug)}
    />
  );
}
