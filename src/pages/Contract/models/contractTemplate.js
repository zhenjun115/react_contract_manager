import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { fetchList } from '@/services/template';

export default {
  namespace: 'contractTemplate',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // console.log('合同模版加载', payload);
      // const response = yield call(queryFakeList, payload);
      const response = yield call(fetchList, payload);
      // const { payload } = response;
      // console.log( "模版列表", response.payload );
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.payload) ? response.payload : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
