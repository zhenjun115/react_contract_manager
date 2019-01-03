import {
  createContractDraft,
  saveContract,
  saveContractParty,
  fetchContract,
  fetchContractFiles,
  fetchContractProcess,
} from '@/services/contract';

export default {
  namespace: 'contractForm',
  state: {
    // 附件相关
    fileCatList: [
      { catCode: '1', catName: '合同文件' },
      { catCode: '2', catName: '学历文件' },
      { catCode: '3', catName: '其他' },
    ],
    fileCatIndex: '1',
    fileList: [],
    fileUploading: false,
    uploadingMessageHook: -1,
    // 合同草稿相关
    currenDraftId: -1,

    // 合同信息
    contract: {},
    // 甲方信息
    partyA: {
      name: { value: '' },
      address: { value: '' },
    },

    // 乙方信息
    partyB: {
      name: { value: '' },
      address: { value: '' },
      idNumber: { value: '' },
      phone: { value: '' },
    },

    // 表单保存信息
    status: '',
  },

  effects: {
    *uploadUncompletedFile({ payload }, { put }) {
      yield put({
        type: 'addUncompletedFile',
        payload,
      });
    },

    *changeUploadProgress({ payload }, { put }) {
      yield put({
        type: 'updateUploadProgress',
        payload,
      });
    },
    // 保存合同基本信息
    *saveContract({ payload }, { put, call }) {
      const response = yield call(saveContract, payload);
      yield put({
        type: 'setContractUpdatedResult',
        payload: response,
      });
    },

    *saveContractParty({ payload }, { put, call }) {
      const response = yield call(saveContractParty, payload);
      console.log('更新state中的合同信息', response);
      yield put({
        type: 'setContract',
        payload: response.payload,
      });
    },

    // 创建劳务合同
    *createDraft({ payload }, { put, call }) {
      console.log('创建劳务合同', payload);
      const response = yield call(createContractDraft, payload);
      yield put({
        type: 'setCurrenDraft',
        payload: response.payload,
      });
    },

    // 根据contractId 加载劳务合同签约主体信息
    *fetch({ payload }, { put, call }) {
      // console.log( "获取合同信息", payload );
      const response = yield call(fetchContract, payload);
      // console.log('签约主体信息', response);
      yield put({
        type: 'setContract',
        payload: response.payload,
      });
    },

    // 获取合同附件列表
    *fetchFiles({ payload }, { put, call }) {
      const response = yield call(fetchContractFiles, payload);
      console.log('合同附件列表', response);
      yield put({
        type: 'setContractFiles',
        payload: response.payload,
      });
    },

    *fetchProcess({ payload }, { put, call }) {
      const response = yield call(fetchContractProcess, payload);
      console.log('合同流程', response);
    },
  },

  reducers: {
    addUncompletedFile(state, action) {
      return {
        ...state,
        fileUploading: true,
        fileList: state.fileList.concat([action.payload]),
      };
    },
    updateUploadProgress(state, action) {
      // TODO
      const { fileList } = state;

      const {
        payload: { event, file },
      } = action;
      fileList.map(item => {
        if (item.uid === file.uid && !!event) {
          item.progress = event.percent;
          if (!event.response) {
            item.result = 'active';
          } else if (event.response.code === 1) {
            item.result = 'exception';
          } else if (event.response.code !== 1) {
            item.result = 'success';
          }
        }
        return item;
      });

      return {
        ...state,
        fileUploading: file.status !== 'done',
      };
    },
    updateUploadMessageHook(state, action) {
      return {
        ...state,
        uploadingMessageHook: action.payload,
      };
    },
    changeFileCat(state, action) {
      return {
        ...state,
        fileCatIndex: action.payload,
      };
    },
    // 设置当前操作的合同草稿编号
    setCurrenDraft(state, action) {
      // console.log( "合同编号", action );
      const {
        payload: { contractId },
      } = action;
      return {
        ...state,
        currenDraftId: contractId,
      };
    },
    // 设置合同信息
    setContract(state, action) {
      // 1. 设置签约主体信息
      const {
        payload: { partyA, partyB },
      } = action;
      // const { partyAForm, partyAForm } = state;
      const partyAForm = state.partyA;
      const partyBForm = state.partyB;
      // console.log( "debug:", action );
      // console.log( "debug:", partyB );
      partyA &&
        Object.keys(partyA).map(field => {
          partyAForm[field] = { value: partyA[field] };
        });
      partyB &&
        Object.keys(partyB).map(field => {
          partyBForm[field] = { value: partyB[field] };
        });

      // 2. 设置合同附件信息

      // 3. 设置流程状态信息
      return {
        ...state,
        partyA: partyAForm,
        partyB: partyBForm,
      };
    },
    // 保存合同附件列表
    setContractFiles(state, action) {
      const { payload } = action;
      console.log('查询结果：合同附件列表', payload);
      return {
        ...state,
        fileList: payload,
      };
    },
    // 保存编辑结果
    setContractUpdatedResult(state, action) {
      const { payload } = action;
      // console.log( "result 111", payload );
      return {
        ...state,
        status: payload.code === 1 ? 'error' : 'success',
      };
    },
    // 初始化
    init(state, action) {
      const partyAForm = state.partyA;
      const partyBForm = state.partyB;

      Object.keys(partyAForm).map(field => {
        partyAForm[field] = { value: undefined };
      });
      Object.keys(partyAForm).map(field => {
        partyBForm[field] = { value: undefined };
      });

      return {
        ...state,
        partyA: partyAForm,
        partyB: partyBForm,
        fileList: [],
      };
    },
  },
};
