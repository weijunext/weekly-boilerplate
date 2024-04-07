import { getWeeklyPosts, WeeklyPost } from "@/lib/getWeeklyPosts";
import dayjs from "dayjs";
import Link from "next/link";

export default async function WeeklyList() {
  const posts: WeeklyPost[] = await getWeeklyPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.metadata.slug}>
          <Link href={`/weekly/${post.metadata.slug}`}>
            {post.metadata.title}(
            {dayjs(post.metadata.date).format("YYYY-MM-DD")})
          </Link>
        </li>
      ))}
    </ul>
  );
}
