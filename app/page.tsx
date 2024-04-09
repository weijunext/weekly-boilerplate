import DeveloperCard from "@/components/DeveloperCard";
import TimeLine from "@/components/TimeLine";
import WeeklyList from "@/components/WeeklyList";

export default function Home() {
  return (
    <div className="flex flex-row w-full pt-12">
      <div className="hidden md:block md:w-1/5 pl-6"></div>
      <div className="w-full md:w-3/5 px-6">
        <WeeklyList />
        <DeveloperCard />
      </div>
      <div className="hidden md:flex justify-end md:w-1/5 pr-6 text-right">
        <TimeLine></TimeLine>
      </div>
    </div>
  );
}
