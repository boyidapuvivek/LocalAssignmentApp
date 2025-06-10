import React, { createContext, useContext, useState } from "react";
import { Job } from "@/types"; // Define your Job type

type BookmarkContextType = {
  bookmarkedJobs: Job[];
  toggleBookmark: (job: Job) => void;
  isBookmarked: (id: number) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarkedJobs: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export const BookmarkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  const toggleBookmark = (job: Job) => {
    setBookmarkedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) {
        return prev.filter((j) => j.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  const isBookmarked = (id: number) => {
    return bookmarkedJobs.some((job) => job.id === id);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedJobs, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
