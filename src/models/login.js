import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority, setJwtToken } from '@/utils/authority';
// import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        window.location.href = '/dashboard/workplace';
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
          token: '',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { roles, token } = payload;
      setAuthority(roles);
      setJwtToken(token);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
