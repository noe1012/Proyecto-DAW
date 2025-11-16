import { useEffect, useState } from "react";

const LS_KEY = "glownite:favs";

export default function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) ?? []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(favs));
  }, [favs]);

  const toggle = (id) =>
    setFavs((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const isFav = (id) => favs.includes(id);

  return { favs, toggle, isFav, setFavs };
}
