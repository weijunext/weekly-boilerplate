"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { HighlightMatches } from "./HighlightMatches";

interface SearchResult {
  id: string;
  doc: {
    title: string;
    content: string;
  };
}
export interface SearchResultParent {
  field: string;
  result: SearchResult[];
}

export interface SearchBarProps {
  doSearch: (value: string) => Promise<SearchResultParent[] | undefined>;
}

const SearchBar = ({ doSearch }: SearchBarProps) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  /**
   * 处理搜索输入的变化
   * Handle the change of search input
   * @param value 搜索输入的值 The value of the search input
   */
  const handleChange = useCallback(
    async (value: string) => {
      setQuery(value);
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        console.log("value", value);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
      handleSearch(value);
    },
    [loading]
  );

  /**
   * 处理搜索输入框的变化事件
   * Handle the change event of the search input
   * @param e 变化事件 The change event
   */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(value);
    setShow(Boolean(value));
  };

  /**
   * 执行搜索
   * Perform the search
   * @param value 搜索关键词 The search keyword
   */
  const handleSearch = async (value: string) => {
    const searchResults = await doSearch(value);
    const sortResult = (searchResults && transformResults(searchResults)) || [];
    setResults(sortResult);
  };

  /**
   * 完成搜索
   * Finish the search
   */
  const finishSearch = useCallback(() => {
    handleChange("");
    setShow(false);
  }, [handleChange]);

  return (
    <>
      <Input
        value={query}
        onChange={onChangeSearch}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setShow(false);
          setFocused(false);
        }}
        placeholder="Search……"
        className="border-gray-600 focus:border-0"
      />

      <Transition
        show={show}
        // Transition.Child is required here, otherwise popup will be still present in DOM after focus out
        as={Transition.Child}
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <ul
            className={cn(
              "scrollbar",
              "p-4 border border-gray-600 bg-gray-900",
              "absolute top-full right-0 z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl",
              "max-h-[min(calc(50vh-11rem-env(safe-area-inset-bottom)),400px)]",
              "md:max-h-[min(calc(100vh-5rem-env(safe-area-inset-bottom)),400px)]",
              "min-h-[100px] w-[90vw] md:w-[50vw]"
            )}
            style={{
              transition: "max-height .2s ease", // don't work with tailwindcss
            }}
          >
            {results && results.length > 0 ? (
              results.map((result, index) => (
                <Link
                  key={`${result.id}_${index}`}
                  // get the right url
                  href={`/weekly/${result.id.split("_")[0]}`}
                  onClick={finishSearch}
                >
                  <li
                    className={cn(
                      "break-words rounded-md cursor-default select-none",
                      "contrast-more:border",
                      "text-gray-800 contrast-more:border-transparent dark:text-gray-300",
                      "hover:bg-primary-500/10 hover:text-primary-600 contrast-more:hover:border-primary-500",
                      "block scroll-m-12 px-2.5 py-2"
                    )}
                  >
                    <div className="text-base font-semibold leading-5">
                      <HighlightMatches
                        match={query}
                        value={result.doc.title}
                      />
                    </div>
                    <div className="excerpt mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50">
                      <HighlightMatches
                        match={query}
                        value={result.doc.content}
                      />
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <span className="block select-none p-8 text-center text-sm text-gray-400">
                No results found.
              </span>
            )}
          </ul>
        </div>
      </Transition>
    </>
  );
};

export default SearchBar;

/**
 * 转换搜索结果
 * Transform the search results
 * @param data 搜索结果数据 The search result data
 * @returns 转换后的搜索结果 The transformed search results
 */
const transformResults = (data: SearchResultParent[]) => {
  if (!data) {
    return;
  }
  // 提取所有子元素的 result 数组
  // Extract the result arrays from all child elements
  const results: SearchResult[][] = data.map((item) => item.result);

  // 将所有 result 数组合并成一个数组
  // Merge all result arrays into a single array
  const mergedResults: SearchResult[] = data.flatMap((item) => item.result);

  return mergedResults;
};
