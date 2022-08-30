import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export const FavouritesPages = () => {
  const { favourites } = useAppSelector((state) => state.github);
  const { removeFavourite } = useActions();

  if (favourites.length === 0) return <p className="text-center">No items.</p>;

  const removeFromFavourite = (url: string) => {
    removeFavourite(url);
  };

  return (
    <div className="grid justify-center pt-10 mx-auto w-screen">
      <ul className="grid list-none gap-5">
        {favourites.map((fav) => (
          <li className="flex justify-between border">
            <a target="_blank" href={fav} rel="noreferrer">
              {fav}
            </a>
            <button
              className="py-2 px-4 bg-red-400 ml-10 rounded hover:shadow-md transition-all"
              onClick={() => removeFromFavourite(fav)}
              type="button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
