import ArticleIndex from "@/components/ArticleIndex";
import MDXComponents from "@/components/MDXComponents";
import WeeklyList from "@/components/WeeklyList";
import { WeeklyPost, getWeeklyPosts } from "@/lib/getWeeklyPosts";
import "@/styles/mdx.css";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  params: {
    slug: string;
  };
};

export default async function WeeklyDetailsPage({ params }: Props) {
  const { slug } = params;
  const { posts }: { posts: WeeklyPost[] } = await getWeeklyPosts();
  const post = posts.find((post) => post.metadata.slug === slug);

  if (!post) {
    // TODO: 404页面
    return <div>TODO: not found</div>;
  }

  const { source, metadata } = await getPostDetails(post.fullPath);

  return (
    <div className="flex flex-row w-full pt-12">
      <aside className="hidden md:block md:w-1/5 pl-6 max-h-[100vh] h-full overflow-auto">
        <WeeklyList isSide />
      </aside>
      <article className="w-full md:w-3/5 px-6" id={`article`}>
        <h1>{metadata.title}</h1>
        <MDXRemote source={source} components={MDXComponents} />
      </article>
      <div className="hidden md:flex flex-col justify-start md:w-1/5 pr-6">
        <ArticleIndex />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { posts }: { posts: WeeklyPost[] } = await getWeeklyPosts();

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

async function getPostDetails(fullPath: string): Promise<{
  source: string;
  metadata: { [key: string]: any };
}> {
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { content, data } = matter(fileContents);

  return {
    source: content,
    metadata: data,
  };
}
