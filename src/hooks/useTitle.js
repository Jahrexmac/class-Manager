import { useEffect } from "react";

export const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} - ClassManager`;
    }, [title]);

  return null;
}