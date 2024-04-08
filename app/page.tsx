import DeveloperCard from "@/components/DeveloperCard";
import TimeLine from "@/components/TimeLine";
import WeeklyList from "@/components/WeeklyList";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full pt-24">
      <div className="hidden md:block md:w-1/5"></div>
      <div className="w-full md:w-3/5 px-6">
        <WeeklyList />
        <DeveloperCard />
      </div>
      <div className="absolute right-0 hidden md:flex justify-end md:w-1/5 pr-6 text-right">
        <TimeLine></TimeLine>
      </div>
    </div>
  );
}
