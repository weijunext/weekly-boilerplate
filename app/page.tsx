import DeveloperCard from "@/components/DeveloperCard";
import WeeklyList from "@/components/WeeklyList";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full pb-16 pt-24">
      <div className="hidden md:block md:w-1/5"></div>
      <div className="w-full md:w-3/5">
        <WeeklyList />
        <DeveloperCard />
      </div>
      <div className="hidden md:block md:w-1/5 text-right pr-6">
        按年/月展示的时间线
      </div>
    </div>
  );
}
