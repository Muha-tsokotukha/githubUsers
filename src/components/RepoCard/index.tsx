import { useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { IRepo } from "../../models/models";

type Props = {
  repo: IRepo;
};

export const RepoCard = ({ repo }: Props) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFacourite = () => {
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourite = () => {
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>

      {!isFav ? (
        <button
          className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all z-10"
          onClick={addToFacourite}
          type="button"
        >
          Add
        </button>
      ) : (
        <button
          className="py-2 px-4 bg-red-400  rounded hover:shadow-md transition-all"
          onClick={removeFromFavourite}
          type="button"
        >
          Remove
        </button>
      )}
    </div>
  );
};
