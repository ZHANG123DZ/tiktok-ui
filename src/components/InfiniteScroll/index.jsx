import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInView } from 'react-intersection-observer';
import Loading from '../Loading';

const InfiniteScroller = ({
  fetchData,
  renderItem,
  onReachEnd,
  extractKey,
  className = '',
  initialCursor = null,
  loader = <Loading />,
  endMessage = <p>Nothing more to load.</p>,
  emptyMessage = <p>No items found.</p>,
}) => {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 0 });

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchData({ cursor });
      if (!result || !Array.isArray(result.data)) {
        setHasMore(false);
        return;
      }

      const { data, hasMore: more, nextCursor } = result;
      setItems((prevItems) => {
        const existingKeys = new Set(prevItems.map(extractKey));
        const newItems = data.filter(
          (item) => !existingKeys.has(extractKey(item))
        );
        return [...prevItems, ...newItems];
      });
      setHasMore(more);
      setCursor(nextCursor);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
      if (onReachEnd) onReachEnd();
    }
  }, [inView, hasMore, loading]);

  if (!items.length && !hasMore) {
    return emptyMessage;
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
      endMessage={endMessage}
      className={className}
      scrollThreshold={0.9}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={extractKey(item)}>
            {isLast ? (
              <div ref={ref}>{renderItem(item, index)}</div>
            ) : (
              renderItem(item, index)
            )}
          </React.Fragment>
        );
      })}
    </InfiniteScroll>
  );
};

export default InfiniteScroller;
