import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Icon, Button, Dropdown, Menu, Modal, message, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Dict.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

// 新建字典弹出框
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, parentDictCodeName } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      console.log('新建数据字典', fieldsValue);
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    // 新建数据字典弹出框
    <Modal
      destroyOnClose
      title="新建字典"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级字典">
        {/* {form.getFieldDecorator('parentDictId', {
          rules: [{ required: true, message: '不能为空' }],
        })(<Input placeholder="请输入" />)} */}
        <Input value={parentDictCodeName === '' ? '根节点' : parentDictCodeName} disabled />
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典代号">
        {form.getFieldDecorator('dictCode', {
          rules: [{ required: true, message: '请输入字典代号！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称">
        {form.getFieldDecorator('dictName', {
          rules: [{ required: true, message: '请输入字典名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典描述">
        {form.getFieldDecorator('dictDesc', {
          rules: [{ required: true, message: '请输入描述！' }],
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>
    </Modal>
  );
});

// 更新字典弹出框
@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        dictId: props.values.dictId,
        dictCode: props.values.dictCode,
        dictName: props.values.dictName,
        dictDesc: props.values.dictDesc,
        key: props.values.key,
      },
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  render() {
    const { updateModalVisible, handleUpdateModalVisible, form, handleUpdate } = this.props;
    const { formVals } = this.state;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        console.log('编辑数据字典', fieldsValue);
        if (err) return;
        form.resetFields();
        handleUpdate(fieldsValue);
      });
    };

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="字典信息"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible()}
      >
        <FormItem key="dictId" {...this.formLayout} label="字典编号">
          {form.getFieldDecorator('dictId', {
            rules: [{ required: true, message: '请输入字典代号！' }],
            initialValue: formVals.dictId,
          })(<Input placeholder="请输入字典代号" disabled />)}
        </FormItem>
        <FormItem key="dictCode" {...this.formLayout} label="字典代号">
          {form.getFieldDecorator('dictCode', {
            rules: [{ required: true, message: '请输入字典代号！' }],
            initialValue: formVals.dictCode,
          })(<Input placeholder="请输入字典代号" />)}
        </FormItem>
        <FormItem key="dictName" {...this.formLayout} label="字典名称">
          {form.getFieldDecorator('dictName', {
            rules: [{ required: true, message: '请输入字典名称！' }],
            initialValue: formVals.dictName,
          })(<Input placeholder="请输入名称" />)}
        </FormItem>
        <FormItem key="dictDesc" {...this.formLayout} label="字典描述">
          {form.getFieldDecorator('dictDesc', {
            rules: [{ required: true, message: '请输入字典描述！', min: 1 }],
            initialValue: formVals.dictDesc,
          })(<TextArea rows={4} placeholder="请输入字典描述" />)}
        </FormItem>
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class Dict extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [], // 选中的rows
    formValues: {},
    stepFormValues: {},
  };

  // table 列
  columns = [
    {
      title: '名称',
      dataIndex: 'dictCode',
    },
    {
      title: '字典值',
      dataIndex: 'dictName',
    },
    {
      title: '描述',
      dataIndex: 'dictDesc',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a href="">操作</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;

    // 页面初始化: 加载数据字典数据
    dispatch({
      type: 'dict/fetch',
      payload: {},
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'dict/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'dict/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'dict/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          // TODO: 删除失败处理
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // 搜索字典
  handleSearch = value => {
    const { dispatch } = this.props;

    // 发起搜索请求
    dispatch({
      type: 'dict/fetch',
      payload: {
        keyword: value,
      },
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  // TODO: 新增成功之后进行一次更新操作
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/add',
      payload: fields,
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/update',
      payload: fields,
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  render() {
    const {
      dict: { dicts },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    // 内容搜索
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="字典值或者名称"
          enterButton="搜索"
          size="large"
          onSearch={value => this.handleSearch(value)}
          style={{ width: 522 }}
        />
      </div>
    );
    return (
      <PageHeaderWrapper content={mainSearch}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={dicts}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>

        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          parentDictCode={0}
          parentDictCodeName="根节点"
        />

        {/* TODO: stepFormValues 名称应该修改 */}
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Dict;
