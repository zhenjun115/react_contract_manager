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
  Timeline,
  Progress,
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
import styles from './ContractCreate.less';
import { getJwtToken } from '@/utils/authority';

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
  initing: loading.effects['laborContract/create'],
}))
@Form.create({})
class ContractCreate extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { templateId },
      },
    } = this.props;

    // 1.创建劳务合同
    dispatch({
      type: 'laborContract/create',
      payload: templateId,
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

    if (this.hasErrors(getFieldsError())) {
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

  hasErrors = fields => {
    const { partyA, partyB } = fields;
    return (
      Object.keys(partyA).some(field => partyA[field]) ||
      Object.keys(partyB).some(field => partyB[field])
    );
  };

  render() {
    const {
      laborContract: {
        fileCatList,
        fileCatIndex,
        // currenDraftId,
        fileList,
        // fileUploading,
        // uploadingMessageHook,
        contract,
        // status,
      },
      // dispatch,
      // loading,
      form,
      // match: { params },
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
            <Menu.Item key="edit">编辑</Menu.Item>
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
          <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" />
          <Icon style={{ marginLeft: 8 }} type="dingding-o" />
        </div>
        <div>2016-12-12 12:32</div>
      </div>
    );

    const desc2 = (
      <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
        <div style={{ margin: '8px 0 4px' }}>
          <FormattedMessage id="app.result.success.step2-operator" defaultMessage="Zhou Maomao" />
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
          <FormattedMessage id="app.result.success.operate-title" defaultMessage="Project Name" />
        </div>
        <Row style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage id="app.result.success.operate-id" defaultMessage="Project ID：" />
            </span>
            23421
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage id="app.result.success.principal" defaultMessage="Principal：" />
            </span>
            <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" />
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
                  id="app.result.success.step1-title"
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
                  id="app.result.success.step2-title"
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
                  id="app.result.success.step3-title"
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
              <Card bordered={false} style={{ marginBottom: 24 }}>
                <Form onSubmit={this.saveContractParty}>
                  <Form.Item
                    label="甲方"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyA.name', {
                      rules: [{ required: true, message: '甲方不能为空!' }],
                    })(<Input placeholder="主体信息" />)}
                  </Form.Item>

                  <Form.Item wrapperCol={{ lg: { span: 8, offset: 1 } }}>
                    {getFieldDecorator('partyA.address', {
                      rules: [{ required: true, message: '通讯地址不能为空!' }],
                    })(<Input placeholder="通讯地址" />)}
                  </Form.Item>

                  <Form.Item
                    label="乙方"
                    labelCol={{ lg: { span: 1 } }}
                    wrapperCol={{ lg: { span: 8 } }}
                  >
                    {getFieldDecorator('partyB.name', {
                      rules: [{ required: true, message: '乙方不能为空!' }],
                    })(<Input placeholder="姓名" />)}
                  </Form.Item>
                  <Form.Item wrapperCol={{ lg: { span: 8, offset: 1 } }}>
                    {getFieldDecorator('partyB.phone', {
                      rules: [{ required: true, message: '手机号码不能为空!' }],
                    })(<Input placeholder="手机号码" />)}
                  </Form.Item>
                  <Form.Item wrapperCol={{ lg: { span: 8, offset: 1 } }}>
                    {getFieldDecorator('partyB.idNumber', {
                      rules: [{ required: true, message: '身份证号不能为空!' }],
                    })(<Input placeholder="身份证号" />)}
                  </Form.Item>
                  <Form.Item wrapperCol={{ lg: { span: 8, offset: 1 } }}>
                    {getFieldDecorator('partyB.address', {
                      rules: [{ required: true, message: '通讯地址不能为空!' }],
                    })(<Input placeholder="通讯地址" />)}
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 23, offset: 1 }}>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>{' '}
                    <Button type="default">重置</Button>
                  </Form.Item>
                </Form>
              </Card>
            </TabPane>
            <TabPane tab="附件文件" key="2">
              <Card extra={extraContent} title="附件">
                <Upload
                  name="file"
                  listType="picture-card"
                  showUploadList={false}
                  action="http://10.80.10.151:8080/labor/contract/file/add"
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
                            e.preventDefault();
                            this.showViewModal(item);
                          }}
                        >
                          查看
                        </a>,
                        <MoreBtn current={item} />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.logo} shape="square" size="large" />}
                        title={<a href={item.href}>{item.fileName || item.name}</a>}
                        description={item.subDescription}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </TabPane>
            <TabPane tab="审批状态" key="3">
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
            <TabPane tab="合同变更" key="4">
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
            </TabPane>

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

export default ContractCreate;
