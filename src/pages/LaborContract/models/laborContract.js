import { fetchContract, fetchContractById } from '@/services/laborContract';

export default {
  namespace: 'laborContract',
  state: {
    // 模版列表
    contracts: [],
    // 单个模版
    contract: {},
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const response = yield call(fetchContract, payload);
      yield put({
        type: 'setContractList',
        payload: response.payload,
      });
    },

    // 根据模版编号获取模版
    *fetchById({ payload }, { put, call }) {
      const response = yield call(fetchContractById, payload);
      yield put({
        type: 'setContract',
        payload: response.payload,
      });
    },
  },

  reducers: {
    initContractState(state, action) {
      console.log(action);
      return {
        ...state,
        contract: {},
      };
    },
    setContractList(state, action) {
      const {
        payload: { contracts },
      } = action;
      return {
        ...state,
        contracts: contracts,
      };
    },
    setContract(state, action) {
      const { payload } = action;
      return {
        ...state,
        contract: payload,
      };
    },
  },
};
