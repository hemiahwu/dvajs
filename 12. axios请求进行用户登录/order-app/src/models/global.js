export default {
  namespace: "global",

  state: {
    userInfo: {
      email: null,
      pwd: null,
      key: null
    }
  },

  subscriptions: {},

  effects: {
    // dispatch 设置用户信息
    *setUserInfo({ payload }, { put }) {
      yield put({
        type: "set_userinfo",
        payload
      });
    }
  },

  reducers: {
    // 设置用户信息userInfo的state
    set_userinfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    }
  }
};
