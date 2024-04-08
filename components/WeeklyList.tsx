import { getWeeklyPosts, WeeklyPost } from "@/lib/getWeeklyPosts";
import dayjs from "dayjs";
import Link from "next/link";

export default async function WeeklyList() {
  const posts: WeeklyPost[] = await getWeeklyPosts();

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <li
          key={post.metadata.slug}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <span className="text-[#8585a8] min-w-28">
            {dayjs(post.metadata.date).format("YYYY-MM-DD")}
          </span>
          <Link
            href={`/weekly/${post.metadata.slug}`}
            className="text-[#9bdbee] hover:text-[#ffce55] truncate transition-colors duration-500 ease-in-out"
          >
            {post.metadata.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
