import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk";

interface GithubState {
  favourites: string[];
}

const initialState: GithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },

    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(
        (item) => item !== action.payload
      );
    },
  },
});

const githubActions = githubSlice.actions;

const githubReducers = githubSlice.reducer;

export { githubSlice, githubActions, githubReducers };
