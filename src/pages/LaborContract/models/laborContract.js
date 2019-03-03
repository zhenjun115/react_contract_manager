import {
  fetchContract,
  fetchContractById,
  fetchPartyByContractId,
  fetchFilesByContractId,
  fetchWorkflowByContract,
  createContract,
  saveInfo,
  saveParty,
} from '@/services/laborContract';

export default {
  namespace: 'laborContract',
  state: {
    // 合同列表
    contracts: [],

    // 单个合同
    contract: {},
    // TODO: 通过查询数据字典的方式进行查询
    fileCatList: [
      { catCode: '1', catName: '合同文件' },
      { catCode: '2', catName: '学历文件' },
      { catCode: '3', catName: '其他' },
    ],
    fileCatIndex: '1',

    // 附件列表
    fileList: [],

    // 分页信息
    page: { pageIndex: 1, pageSize: 5 },

    // 搜索关键字
    searchOpFlag: false,
    keyword: '',
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

    // 根据合同编号获取合同
    *fetchById({ payload, callback }, { put, call }) {
      const response = yield call(fetchContractById, payload);
      yield put({
        type: 'setContract',
        payload: response.payload,
      });

      if (callback) {
        callback(response.payload);
      }
    },

    // 根据合同编号获取签约主体信息
    *fetchPartyByContractId({ payload, callback }, { put, call }) {
      const response = yield call(fetchPartyByContractId, { contractId: payload });
      console.log('获取签约主体信息', response.payload);
      yield put({
        type: 'setContractParty',
        payload: response.payload,
      });

      if (callback) {
        callback(response.payload);
      }
    },

    // 根据合同编号获取合同附件信息
    *fetchFilesByContractId({ payload }, { put, call }) {
      const response = yield call(fetchFilesByContractId, { contractId: payload });
      yield put({
        type: 'setContractFiles',
        payload: response.payload,
      });
    },

    *fetchWorkflowByContractId( {payload}, {put,call}) {
      const response = yield call( fetchWorkflowByContract, { contractId: payload } );
      console.log( "获取流程信息:", response );
    },

    // 保存合同签订方信息
    *saveParty({ payload, callback }, { put, call }) {
      const response = yield call(saveParty, payload);
      yield put({
        type: 'setContractParty',
        payload: response.payload,
      });

      // 回调函数
      if (callback) {
        callback(response.code);
      }
    },

    // 保存合同签订方信息
    *saveInfo({ payload, callback }, { put, call }) {
      const response = yield call(saveInfo, payload);
      yield put({
        type: 'setInfo',
        payload: response.payload,
      });

      // 回调函数
      if (callback) {
        callback(response.code);
      }
    },

    // 根据模版创建劳务合同
    *create({ payload }, { put, call }) {
      console.log('根据模版创建劳务合同', payload);
      // yield console.log( "根据模版创建劳务合同", payload );
      const response = yield call(createContract, { templateId: payload });
      console.log('劳务合同创建结果', response);

      yield put({
        type: 'setContract',
        payload: response.payload,
      });
    },
  },

  reducers: {
    initContractState(state) {
      return {
        ...state,
        contract: {},
      };
    },

    // 设置合同列表
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

    // 清空数据列表
    clearContractList(state, action) {
      console.log('action', action);
      return {
        ...state,
        contracts: [],
      };
    },

    // 设置合同状态参数
    setParamStatus(state, action) {
      console.log('设置合同状态参数', action);
      const { payload } = action;
      return {
        ...state,
        status: Array.isArray(payload.status) ? payload.status : [],
      };
    },

    // 保存合同信息
    setContract(state, action) {
      const { payload } = action;
      return {
        ...state,
        contract: payload,
      };
    },

    // 保存合同基本信息
    setContractInfo(state, action) {
      const { payload } = action;
      console.log('保存合同基本信息返回值', payload);
      return {
        ...state,
        contract: { ...state.contract, ...payload },
      };
    },

    // 保存合同签约信息
    setContractParty(state, action) {
      const { payload } = action;
      return {
        ...state,
        contract: {
          ...state.contract,
          partyMain: payload.partyMain,
          partyOther: payload.partyOther,
        },
      };
    },

    // 保存文件附件信息
    setContractFiles(state, action) {
      const { payload } = action;
      return {
        ...state,
        fileList: payload,
      };
    },

    // 新增文件附件信息
    addContractFile(state, action) {
      const { payload } = action;
      return {
        ...state,
        fileList: state.fileList.concat(payload),
      };
    },
  },
};
