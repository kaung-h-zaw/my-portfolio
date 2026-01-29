import React, { useEffect, useState } from "react";
import {
  RefreshCw,
  ExternalLink,
  ArrowUp,
  MessageSquare,
  Loader,
} from "lucide-react";

export default function NewsApp() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // 1. Get Top 50 Story IDs
      const topStoriesRes = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
      );
      const topStoryIds = await topStoriesRes.json();

      // 2. Fetch details for first 15 stories (to keep it fast)
      const storyPromises = topStoryIds
        .slice(0, 15)
        .map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json(),
          ),
        );

      const results = await Promise.all(storyPromises);
      setStories(results);
    } catch (error) {
      console.error("Failed to load news", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="h-full flex flex-col bg-white font-mono text-black selection:bg-black selection:text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b-2 border-black bg-gray-50 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-xl font-black uppercase tracking-widest">
            HACKER_NEWS
          </h2>
          <span className="text-[10px] text-gray-500 font-bold uppercase">
            LIVE FEED • YCOMBINATOR
          </span>
        </div>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* CONTENT LIST */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-100">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-400">
            <Loader size={32} className="animate-spin text-black" />
            <div className="text-xs font-bold uppercase tracking-widest text-black">
              Fetching Data...
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {stories.map((story) => (
              <a
                key={story?.id}
                href={
                  story?.url ||
                  `https://news.ycombinator.com/item?id=${story?.id}`
                }
                target="_blank"
                rel="noreferrer"
                className="block bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_black] hover:shadow-[2px_2px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold uppercase leading-tight group-hover:underline">
                    {story?.title}
                  </h3>
                  <ExternalLink
                    size={14}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase">
                  <div className="flex items-center gap-1">
                    <ArrowUp size={12} className="text-black" />
                    <span>{story?.score} Pts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={12} className="text-black" />
                    <span>{story?.descendants || 0} Comments</span>
                  </div>
                  <div className="ml-auto text-gray-400">
                    {story?.time &&
                      new Date(story.time * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-2 border-t-2 border-black bg-white text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          POWERED BY HACKER NEWS API
        </div>
      </div>
    </div>
  );
}
