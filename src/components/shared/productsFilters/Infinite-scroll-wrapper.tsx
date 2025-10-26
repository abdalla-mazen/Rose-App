"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { ReactNode } from "react";

// types
interface Props {
  children: ReactNode;
  className?: string;
  dataLength: number;
  hasMore: boolean;
  next: () => void;
  height?: string | number;
  loader?: ReactNode;
}

export function InfiniteScrollWrapper({
  children,
  dataLength,
  hasMore,
  next,
  height = 250,
  loader = "Loading...",
  className,
}: Props) {
  return (
    <div
      id="scrollableDiv"
      style={{ height, overflow: "auto" }}
      className={className}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={loader}
        scrollableTarget="scrollableDiv"
      >
        {children}
      </InfiniteScroll>
    </div>
  );
}
