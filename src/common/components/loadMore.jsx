import React from "react";

const LoadMore = ({ loading, pageCount, totalPages, loadMore }) => {
  const ref = useRef(null);

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && !loading && totalPages !== pageCount) {
      loadMore();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "30px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [handleObserver]);

  return <div ref={ref}></div>;
};

export default LoadMore;
