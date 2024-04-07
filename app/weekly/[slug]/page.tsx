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

export async function generateStaticParams() {
  const posts: WeeklyPost[] = await getWeeklyPosts();

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

export default async function WeeklyDetailsPage({ params }: Props) {
  const { slug } = params;

  const posts: WeeklyPost[] = await getWeeklyPosts();

  const post = posts.find((post) => post.metadata.slug === slug);

  if (!post) {
    // TODO: 404页面
    return <div>Post not found</div>;
  }

  const { source, metadata } = await getPostDetails(post.fullPath);

  return (
    <article>
      <h1>{metadata.title}</h1>
      <MDXRemote source={source} />
    </article>
  );
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
