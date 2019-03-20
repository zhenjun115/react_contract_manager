import { fetchContract, fetchContractById } from '@/services/purchaseContract';

export default {
  namespace: 'purchaseContract',
  state: {
    // 模版列表
    contracts: [],
    // 单个模版
    contract: {},

    // 状态
    status: [],
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
      console.log( "根据合同编号获取合同信息", response );
      yield put({
        type: 'setContract',
        payload: response.payload,
      });
    },
  },

  reducers: {
    initContractState(state, action) {
      return {
        ...state,
        contract: {},
      };
    },
    setContractList(state, action) {
      const {
        payload: { contracts, page },
      } = action;
      return {
        ...state,
        contracts: state.contracts.concat(contracts),
        page: page,
      };
    },
    // 设置合同状态参数
    setParamStatus(state, action) {
      // console.log( "设置合同状态参数", action );
      const { payload } = action;
      return {
        ...state,
        status: Array.isArray(payload.status) ? payload.status : [],
      };
    },
    // 清空数据列表
    clearContractList(state, action) {
      console.log('action', action);
      return {
        ...state,
        contracts: [],
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
