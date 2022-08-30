import { useState, useEffect } from "react";
import { RepoCard } from "../components/RepoCard";
import { useDebounce } from "../hooks/debounce";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";

export const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const debounced = useDebounce(search);
  const {
    data: users,
    isLoading,
    isError,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const handleClick = (username: string) => {
    fetchRepos(username);
    setIsActive(false);
  };

  useEffect(() => {
    setIsActive(debounced.length > 3 && users?.length! > 0);
  }, [debounced, users]);

  return (
    <div className="grid justify-center pt-10 mx-auto w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for GitHub username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isActive && (
          <ul className="list-none abosulte top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            {isLoading && (
              <p className="text-center text-black-600">Loading...</p>
            )}
            {users?.map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => handleClick(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="container">
        {areReposLoading && <p className="text-center">Repos are loading...</p>}
        {repos?.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};
