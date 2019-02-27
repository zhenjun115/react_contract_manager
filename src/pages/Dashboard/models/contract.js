import { fetchContractList, fetchContracts } from '@/services/contract';

export default {
  namespace: 'contract',

  state: {
    // 订立中
    progress: [],
    // 履行中
    carryout: [],
    // 所有列表
    contracts: [],
    
    status: [],

    page: { pageIndex: 1, pageSize: 5 },
  },

  effects: {
    *fetch( {payload}, {call,put} ) {
      const response = yield call( fetchContracts, payload );
      yield put( {
        type: 'saveContracts',
        payload: response.payload
      });
    },
    // 查询合同列表
    *fetchContracts({ payload }, { call, put }) {
      const response = yield call(fetchContractList, payload);
      // console.log( "返回的数据", response );
      yield put({
        type: 'saveContracts',
        payload: response.payload,
      });
    },

    // 查询正在履行的合同列表
    *fetchCarryout(_, { call, put }) {
      const response = yield call(fetchContractList, { contract: { status: 'carryout' } });
      // console.log( "正在履行中的", response );
      // const { payload: { page, contracts } } = response;
      yield put({
        type: 'saveCarryout',
        payload: response.payload,
      });
    },

    // 查询正在订立的合同列表
    *fetchProgress(_, { call, put }) {
      const response = yield call(fetchContractList, { contract: { status: 'progress' } });
      // const { payload } = response;
      yield put({
        type: 'saveProgress',
        payload: response.payload,
      });
    },
  },

  reducers: {
    init(state, action) {
      return {
        ...state,
        contracts: [],
        progress: [],
        carryout: [],
        status: [],
        catCode: [],
        page: { pageIndex: 1, pageSize: 5 },
      };
    },
    savePage(state, action) {
      const {
        payload: { pageIndex, pageSize },
      } = action;

      return {
        ...state,
        page: { index: pageIndex, size: pageSize },
      };
    },
    setParams( state, action ) {
      const { payload: { status, catCode } } = action;

      return {
        ...state,
        status: Array.isArray( status ) ? status : [],
        catCode: Array.isArray( catCode ) ? catCode : []
      }
    },
    saveContracts(state, action) {
      const {
        payload: {
          contracts,
          page: { pageIndex, pageSize },
        },
      } = action;
      return {
        ...state,
        contracts: state.contracts.concat(contracts),
        page: { pageIndex: pageIndex, pageSize: pageSize },
      };
    },
    clearContracts( state, action ) {
      return {
        ...state,
        contracts: [],
        page: { pageIndex: 1, pageSize: 5 }
      }
    },
    saveCarryout(state, action) {
      const {
        payload: {
          contracts,
          page: { pageIndex, pageSize },
        },
      } = action;
      return {
        ...state,
        carryout: contracts,
        page: { index: pageIndex, size: pageSize },
      };
    },
    saveProgress(state, action) {
      const {
        payload: {
          contracts,
          page: { pageIndex, pageSize },
        },
      } = action;
      return {
        ...state,
        progress: contracts,
        page: { index: pageIndex, size: pageSize },
      };
    },
  },
};
