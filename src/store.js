const {
  createReducer,
  createAction,
  nanoid,
  configureStore,
} = require("@reduxjs/toolkit");

const initialState = {
  records: [],
  hash: "",
  createdAt: "",
  id: "",
};

const updateDNS = createAction("history/UPDATE_DNS", (records) => ({
  payload: {
    records,
    id: nanoid(),
    createdAt: new Date().toISOString(),
  },
}));

const updateHash = createAction("hsitory/UPDATE_HASH", (hash) => ({
  payload: {
    hash,
    id: nanoid(),
    createdAt: new Date().toISOString(),
  },
}));

const reducer = createReducer(initialState, {
  [updateDNS]: (state, { payload: { records, id, createdAt } }) => ({
    ...state,
    records,
    id,
    createdAt,
  }),
  [updateHash]: (state, { payload: { hash, id, createdAt } }) => ({
    ...state,
    hash,
    id,
    createdAt,
  }),
});

const store = configureStore({ reducer });

module.exports = {
  updateDNS,
  updateHash,
  store,
};
