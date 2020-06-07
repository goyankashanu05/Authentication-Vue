import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import apiCall from "utils/api";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", users: [] };

const getters = {
  getUsers: state => state.users,
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    apiCall({ url: "users", method: 'GET' })
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "users", resp);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.users = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
