import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  Card,
  Upload,
  Icon,
  message,
  Row,
  Col,
  notification,
  Tabs,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import './style.less';
import { getJwtToken } from '@/utils/authority';
import ContractInfo from './ContractInfo';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading, purchaseTemplate }) => ({
  purchaseTemplate,
  submitting: loading.effects['purchaseTemplate/save'],
}))
@Form.create()
class TemplateCreate extends PureComponent {
  // 保存采购合同模版
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          file: { name },
        } = values.file;

        dispatch({
          type: 'purchaseTemplate/save',
          payload: { ...values, file: name },
          callback: errCode => {
            let msg = '';
            let details = '';

            if (errCode === 1) {
              msg = '保存成功';
              details = '新建劳务合同模版成功';
            } else {
              msg = '保存失败';
              details = '新建劳务合同模版失败';
            }

            notification.open({
              message: msg,
              description: details,
            });
          },
        });
      }
    });
  };

  handleChange = info => {
    const {
      file: { status, name, response },
    } = info;

    const { form: {setFieldsValue} } = this.props;

    if (status === 'done') {
      message.success(`${name} 文件上传成功.`);
      setFieldsValue( { filePath: response.payload.filePath } );
    } else if (status === 'error') {
      message.error(`${name} 文件上传失败.`);
      setFieldsValue( { filePath: '' } );
    }

    // if( response ) {
    //   const { payload: { officePlaceholders } } = response;
    //   // console.log( "更新word文件参数", officePlaceholders );

    //   dispatch({
    //     type: 'purchaseTemplate/changeTemplateParams',
    //     payload: officePlaceholders
    //   });
    // }
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator }
    } = this.props;

    // 上传表单属性
    const props = {
      name: 'file',
      multiple: false,
      action: 'http://10.80.10.151:8080/purchase/template/upload',
      headers: { Authorization: getJwtToken() },
      onChange: this.handleChange
    };

    return (
      <PageHeaderWrapper>
        <Tabs type="card" tabPosition="right">
          <Tabs.TabPane tab="基本信息" key="1">
            <Card bordered={false} title="信息">
              <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem label="文件名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入模版名称',
                      },
                    ],
                  })(<Input placeholder="请输入模版名称" />)}
                </FormItem>

                <FormItem label="文档简介">
                  {getFieldDecorator('desc', {
                    rules: [
                      {
                        required: true,
                        message: '请输入文档简介',
                      },
                    ],
                  })(
                    <TextArea
                      style={{ minHeight: 32 }}
                      placeholder="请输入采购合同模版简介"
                      rows={4}
                    />
                  )}
                </FormItem>

                <FormItem label="文件模版">
                  {getFieldDecorator('file', {
                    rules: [
                      {
                        required: true,
                        message: '请上传模版文件',
                      },
                    ],
                  })(
                    <Upload.Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading
                        company data or other band files
                      </p>
                    </Upload.Dragger>
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator( 'filePath' )(
                    <Input type="hidden" />
                  )}
                </FormItem>

                <FormItem style={{ marginTop: 16 }}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    保存
                  </Button>
                </FormItem>
              </Form>
            </Card>

            {/* <Card bordered={false} >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  {
                    templateParams.map( item => (
                      <Col span={12} key={item.paramId}>
                        <Form.Item label={item.description}>
                          <Input placeholder={item.name} disabled />
                        </Form.Item>
                      </Col>
                    ) )
                  }
                </Row>
              </Form>
            </Card> */}
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default TemplateCreate;
