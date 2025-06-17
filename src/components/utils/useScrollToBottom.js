import { useEffect } from "react";
import { useRef } from "react";

export default function useScrollToBottom(container, callback, offset = 0) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container?.addEventListener("scroll", handleScroll, { passive: true });
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [container, offset]);
}
