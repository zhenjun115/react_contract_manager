import { queryCarryout, queryProgress } from '@/services/contract';

export default {
  namespace: 'contract',

  state: {
    // 订立中
    progress: [],
    // 履行中
    carryout: [],
  },

  effects: {
    *fetchCarryout(_, { call, put }) {
      // console.log( "hello" );
      const response = yield call(queryCarryout);
      // console.log( response );
      yield put({
        type: 'saveCarryout',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchProgress(_, { call, put }) {
      const response = yield call(queryProgress);
      console.log(response);
      yield put({
        type: 'saveProgress',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveCarryout(state, action) {
      return {
        ...state,
        carryout: action.payload,
      };
    },
    saveProgress(state, action) {
      return {
        ...state,
        progress: action.payload,
      };
    },
  },
};
