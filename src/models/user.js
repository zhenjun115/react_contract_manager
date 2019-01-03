import { query as queryUsers, queryCurrent } from '@/services/user';
import { setAuthority, setJwtToken } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      // console.log( "加载用户信息", response );
      // 如果加载用户失败，返回给出提示
      yield put({
        type: 'saveCurrentUser',
        payload: response.payload || {},
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      // TODO: 登录异常，此时获取用户信息，并不包括用户在线信息（token）
      if (!action.payload) {
        setAuthority({});
        setJwtToken(undefined);
        reloadAuthorized();
      }

      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
