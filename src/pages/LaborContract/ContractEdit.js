import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage } from 'umi/locale';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  // Tree,
  Tabs,
  Skeleton,
  Upload,
  // Progress,
  message,
  Radio,
  Avatar,
  Dropdown,
  Menu,
  List,
  // Timeline,
  Spin,
  // Result,
  Steps,
  Col,
  Row,
  notification,
} from 'antd';
import Result from '@/components/Result';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ContractEdit.less';
import { getJwtToken } from '@/utils/authority';
import { createContract } from '@/services/laborContract';

const { TabPane } = Tabs;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Search } = Input;
const { Step } = Steps;

message.config({
  top: 100,
});

notification.config({
  top: 100,
  duration: 3,
});

@connect(({ laborContract, loading }) => ({
  laborContract,
  initing: loading.effects['laborContract/fetchById'],
}))
@Form.create({})
class ContractEdit extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { contractId },
      },
      form: { setFieldsValue },
    } = this.props;

    // 1.查询劳务合同
    dispatch({
      type: 'laborContract/fetchById',
      payload: contractId,
      callback: contract => {
        if (contract) {
          setFieldsValue({
            'contract.conname': contract.conname,
            'contract.description': contract.description,
          });
        }
      },
    });

    // 2.查询劳务合同签约主体信息
    dispatch({
      type: 'laborContract/fetchPartyByContractId',
      payload: contractId,
      callback: contract => {
        const { partyMain, partyOther } = contract;
        if (partyMain) {
          setFieldsValue({
            'partyMain.name': partyMain.name,
            'partyMain.address': partyMain.address,
          });
        }

        if (partyOther) {
          setFieldsValue({
            'partyOther.name': partyOther.name,
            'partyOther.address': partyOther.address,
            'partyOther.idNumber': partyOther.idNumber,
            'partyOther.phone': partyOther.phone,
          });
        }
      },
    });

    // 3.查询劳务合同附件信息
    dispatch({
      type: 'laborContract/fetchFilesByContractId',
      payload: contractId,
    });

    // 4.查询合同流程相关信息
    dispatch({
      type: 'laborContract/fetchWorkflowByContractId',
      payload: contractId,
    });
  }

  // 保存合同签约主体信息
  saveContractParty = e => {
    e.preventDefault();

    const {
      dispatch,
      form: { getFieldsError, validateFields, getFieldsValue },
      laborContract: { contract },
    } = this.props;

    validateFields();

    if (this.hasPartyErrors(getFieldsError())) {
      return;
    }

    dispatch({
      type: 'laborContract/saveParty',
      payload: Object.assign(getFieldsValue(), { contractId: contract.contractId }),
      callback: errCode => {
        // success
        let msg = '';
        let details = '';

        if (errCode === 1) {
          msg = '保存成功';
          details = '保存签约主体成功';
        } else {
          msg = '保存失败';
          details = '保存签约主体失败';
        }

        notification.open({
          message: msg,
          description: details,
        });
      },
    });
  };

  // 更新上传组件状态
  handleChange = change => {
    const { dispatch } = this.props;
    const {
      file: { response },
    } = change;
    if (response) {
      dispatch({
        type: 'laborContract/addContractFile',
        payload: response.payload,
      });
    }
  };

  changeFileCat = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'laborContract/changeFileCat',
      payload: e.target.value,
    });
  };

  hasPartyErrors = fields => {
    const { partyMain, partyOther } = fields;
    return (
      Object.keys(partyMain).some(field => partyMain[field]) ||
      Object.keys(partyOther).some(field => partyOther[field])
    );
  };

  hasInfoErros = fields => {
    const { contract } = fields;
    return Object.keys(contract).some(field => contract[field]);
  };

  // 查看word文档
  viewPageOffice = e => {
    e.preventDefault();
    const {
      laborContract: {
        contract: { contractId },
      },
    } = this.props;

    window.open(`http://192.168.199.206:8080/pageoffice/demoContract?contractId=${contractId}`);
  };

  // 查看合同word附件文件
  viewWordFile = (e, file) => {
    e.preventDefault();
    console.log('文件信息', file);

    window.open(`http://192.168.199.206:8080/pageoffice/demoContractFile?fileId=${file.fileId}`);
  };

  render() {
    const {
      laborContract: {
        fileCatList,
        fileCatIndex,
        // currenDraftId,
        fileList,
        contract,
        // status,
        workflow,
        createContractTask,
      },
      // loading,
      form,
      initing,
    } = this.props;

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue={fileCatIndex} onChange={this.changeFileCat}>
          {fileCatList.map(item => {
            return (
              <RadioButton value={item.catCode} key={item.catCode}>
                {item.catName}
              </RadioButton>
            );
          })}
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );
    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu
            onClick={({ key }) => {
              console.log(key);
              console.log(props);
            }}
          >
            {/* <Menu.Item key="edit">编辑</Menu.Item> */}
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const desc1 = (
      <div
        style={{
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.45)',
          position: 'relative',
          left: 42,
          textAlign: 'left',
        }}
      >
        <div style={{ margin: '8px 0 4px' }}>
          {/* <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" /> */}
          {workflow.userId}
          <Icon style={{ marginLeft: 8 }} type="dingding-o" />
        </div>
        <div>{workflow.startTime}</div>
      </div>
    );

    const desc2 = (
      <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
        <div style={{ margin: '8px 0 4px' }}>
          {/* <FormattedMessage id="app.workflow.contract.partyMain" defaultMessage="Zhou Maomao" /> */}
          {/* {createContractTask.assignee} */}
          {workflow.contractCreate_editDetail ? workflow.contractCreate_editDetail.assignee : ''}
          <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </div>
        <div>
          <a href="">
            <FormattedMessage id="app.result.success.step2-extra" defaultMessage="Urge" />
          </a>
        </div>
      </div>
    );

    const extra = (
      <Fragment>
        <div
          style={{
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '500',
            marginBottom: 20,
          }}
        >
          {/* <FormattedMessage id="app.result.success.operate-title" defaultMessage="Project Name" /> */}
        </div>
        <Row style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            {/* <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage id="app.result.success.operate-id" defaultMessage="Project ID：" />
            </span>
            23421 */}
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage id="app.result.success.principal" defaultMessage="Principal：" />
            </span>
            <FormattedMessage id="app.workflow.start.user" defaultMessage="{workflow.userId}" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage
                id="app.result.success.operate-time"
                defaultMessage="Effective time："
              />
            </span>
            2016-12-12 ~ 2017-12-12
          </Col>
        </Row>
        <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
          <Step
            title={
              <span style={{ fontSize: 14 }}>
                <FormattedMessage
                  id="app.workflow.start.contract"
                  defaultMessage="Create project"
                />
              </span>
            }
            description={desc1}
          />
          <Step
            title={
              <span style={{ fontSize: 14 }}>
                <FormattedMessage
                  id="app.workflow.contract.partyMain"
                  defaultMessage="Departmental preliminary review"
                />
              </span>
            }
            description={desc2}
          />
          <Step
            title={
              <span style={{ fontSize: 14 }}>
                <FormattedMessage
                  id="app.workflow.start.contract.review"
                  defaultMessage="Financial review"
                />
              </span>
            }
          />
          <Step
            title={
              <span style={{ fontSize: 14 }}>
                <FormattedMessage id="app.result.success.step4-title" defaultMessage="Finish" />
              </span>
            }
          />
        </Steps>
      </Fragment>
    );

    const { getFieldDecorator } = form;

    return (
      <PageHeaderWrapper>
        <Spin spinning={initing}>
          <Tabs type="card" tabPosition="right">
            <TabPane tab="基本信息" key="1">
              <Card bordered={false} style={{ marginBottom: 24 }} title="基本信息">
                <Form>
                  <Form.Item style={{ marginBottom: 24 }} label="文件名称">
                    {getFieldDecorator('contract.conname', {
                      rules: [
                        {
                          required: true,
                          message: '请输入合同名称',
                        },
                      ],
                    })(<Input placeholder="请输入合同名称" />)}
                  </Form.Item>

                  <Form.Item style={{ marginBottom: 24 }} label="文档简介">
                    {getFieldDecorator('contract.description', {
                      rules: [
                        {
                          required: true,
                          message: '请输入文档简介',
                        },
                      ],
                    })(
                      <Input.TextArea
                        style={{ minHeight: 32 }}
                        placeholder="请输入劳务合同模版简介"
                        rows={6}
                      />
                    )}
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 23 }}>
                    <Button type="primary" onClick={this.saveContractInfo}>
                      保存
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </TabPane>
            <TabPane tab="签约主体" key="2">
              <Card bordered={false} style={{ marginBottom: 24 }} title="甲方信息">
                <Form name="party">
                  <Form.Item
                    label="主体"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyMain.name', {
                      rules: [{ required: true, message: '甲方不能为空!' }],
                    })(<Input placeholder="主体信息" />)}
                  </Form.Item>

                  <Form.Item
                    label="地址"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyMain.address', {
                      rules: [{ required: true, message: '通讯地址不能为空!' }],
                    })(<Input placeholder="通讯地址" />)}
                  </Form.Item>
                </Form>
              </Card>
              <Card bordered={false} style={{ marginBottom: 24 }} title="乙方信息">
                <Form>
                  <Form.Item
                    label="主体"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyOther.name', {
                      rules: [{ required: true, message: '乙方不能为空!' }],
                    })(<Input placeholder="姓名" />)}
                  </Form.Item>
                  <Form.Item
                    label="手机"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyOther.phone', {
                      rules: [{ required: true, message: '手机号码不能为空!' }],
                    })(<Input placeholder="手机号码" />)}
                  </Form.Item>
                  <Form.Item
                    label="身份"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyOther.idNumber', {
                      rules: [{ required: true, message: '身份证号不能为空!' }],
                    })(<Input placeholder="身份证号" />)}
                  </Form.Item>
                  <Form.Item
                    label="地址"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyOther.address', {
                      rules: [{ required: true, message: '通讯地址不能为空!' }],
                    })(<Input placeholder="通讯地址" />)}
                  </Form.Item>
                </Form>
              </Card>
              {/* <Card> */}
              <Form>
                <Form.Item wrapperCol={{ span: 23 }}>
                  <Button type="primary" onClick={this.saveContractParty}>
                    保存
                  </Button>
                </Form.Item>
              </Form>
              {/* </Card> */}
            </TabPane>
            <TabPane tab="合同附件" key="3">
              <Card extra={extraContent} title="附件">
                <Upload
                  name="file"
                  listType="picture-card"
                  showUploadList={false}
                  action="http://192.168.199.206:8080/labor/contract/file/add"
                  multiple={false}
                  className="uploadBar"
                  onChange={this.handleChange}
                  headers={{ Authorization: getJwtToken() }}
                  data={{ fileCat: fileCatIndex, contractId: contract.contractId }}
                >
                  <div>
                    <Icon type="plus" />
                  </div>
                </Upload>
                <List
                  size="large"
                  rowKey="fileId"
                  dataSource={fileList}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <a
                          onClick={e => {
                            this.viewWordFile(e, item);
                          }}
                        >
                          查看
                        </a>,
                        <MoreBtn current={item} />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar shape="square" size="large" />}
                        title={<a href={item.href}>{item.fileName || item.name}</a>}
                        description={item.subDescription}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </TabPane>
            <TabPane tab="合同流程" key="4">
              <Card>
                <Result
                  // type="success"
                  // title={formatMessage({ id: 'app.result.success.title' })}
                  // description={formatMessage({ id: 'app.result.success.description' })}
                  extra={extra}
                  // actions={actions}
                  style={{ marginTop: 16, marginBottom: 48 }}
                />
              </Card>
            </TabPane>
            {/* <TabPane tab="合同变更" key="5">
              <Card>
                <Timeline>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                  <Timeline.Item
                    dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
                    color="red"
                  >
                    Technical testing 2015-09-01
                  </Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
              </Card>
            </TabPane> */}

            <TabPane tab="其他" key="5">
              <Card>
                <Skeleton avatar paragraph={{ rows: 4 }} />
              </Card>
            </TabPane>
          </Tabs>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default ContractEdit;
