import { updateUserSettings } from '@/services/userSettings';

export default {
  namespace: 'userSettings',
  state: {},
  effects: {
    *update({ payload }, { put }) {
      yield updateUserSettings(payload);
    },
  },
  reducers: {
    updateInfo(state, action) {
      return {
        ...state,
      };
    },
  },
};
