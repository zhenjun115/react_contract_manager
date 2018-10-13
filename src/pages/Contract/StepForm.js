import React, { PureComponent, Fragment } from 'react';
import { Card, Steps, Row, Col, Form, Input, Upload, Collapse, Icon, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import styles from './StepForm.less';

// import { Route, Redirect, Switch } from 'dva/router';
// import { getRoutes } from '@/utils/utils';

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { location } = this.props;
    return (
      <PageHeaderWrapper tabActiveKey={location.pathname}>
        <Row gutter={24}>
          <Col xl={3} lg={3} md={3} sm={16} xs={4}>
            <Fragment>
              <Steps current={this.getCurrentStep()} direction="vertical">
                <Steps.Step title="基础信息" />
                <Steps.Step title="附件信息" />
                <Steps.Step title="操作完成" />
              </Steps>
            </Fragment>
          </Col>

          <Col xl={21} lg={21} md={21} sm={16} xs={20}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <Form>
                <Form.Item
                  label="甲方"
                  labelCol={{ lg: { span: 1 } }}
                  wrapperCol={{ lg: { span: 8 } }}
                >
                  <Input placeholder="主体信息" />
                  <br />
                  <Input placeholder="通讯地址" />
                </Form.Item>

                <Form.Item
                  label="乙方"
                  labelCol={{ lg: { span: 1 } }}
                  wrapperCol={{ lg: { span: 8 } }}
                >
                  <Input placeholder="姓名" />
                  <br />
                  <Input placeholder="手机号码" />
                  <br />
                  <Input placeholder="身份证号" />
                  <br />
                  <Input placeholder="通讯地址" />
                </Form.Item>
              </Form>
            </Card>

            {/* <Card bordered={false} style={{marginBottom: 24}}> */}
            <Form layout="vertical" style={{ marginBottom: 24 }}>
              <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="合同复印件" key="1">
                  <Form.Item labelCol={{ lg: { span: 24 } }} wrapperCol={{ lg: { span: 24 } }}>
                    <Upload.Dragger name="" action="upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Collapse.Panel>

                <Collapse.Panel header="身份证复印件" key="2">
                  <Form.Item wrapperCol={{ lg: { span: 24 } }}>
                    <Upload.Dragger name="" action="upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Collapse.Panel>

                <Collapse.Panel header="学生证复印件" key="3">
                  <Form.Item wrapperCol={{ lg: { span: 24 } }}>
                    <Upload.Dragger name="" action="upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Collapse.Panel>

                <Collapse.Panel header="学历证书复印件" key="4">
                  <Form.Item wrapperCol={{ lg: { span: 24 } }}>
                    <Upload.Dragger name="" action="upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Collapse.Panel>

                <Collapse.Panel header="学位证书复印件" key="5">
                  <Form.Item wrapperCol={{ lg: { span: 24 } }}>
                    <Upload.Dragger name="" action="upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Collapse.Panel>

                <Collapse.Panel header="其他" key="6">
                  <Form.Item wrapperCol={{ lg: { span: 24 } }}>
                    <Upload.Dragger name="" action="upload.do">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            </Form>
            {/* </Card> */}

            <Card bordered={false}>
              <Button type="primary">保存</Button> <Button type="default">重置</Button>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
