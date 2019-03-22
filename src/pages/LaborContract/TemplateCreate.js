import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Upload, Icon, message, notification, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getJwtToken } from '@/utils/authority';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading, laborTemplate }) => ({
  laborTemplate,
  submitting: loading.effects['laborTemplate/save'],
}))
@Form.create()
class TemplateCreate extends PureComponent {
  // 保存采购合同模版
  // TODO: 修复重复保存、数据库存在多条数据的错误;
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      // console.log( values );
      if (!err) {
        const {
          file: { name },
        } = values.file;

        dispatch({
          type: 'laborTemplate/save',
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

  handleUpload = info => {
    const {
      file: { status, name, response },
    } = info;

    const { form: {setFieldsValue} } = this.props;

    if (status === 'done') {
      message.success(`${name} 文件上传成功.`);
      // this.setState( {file_upload_response: response.payload } );
      setFieldsValue( { filePath: response.payload.filePath } );
    } else if (status === 'error') {
      message.error(`${name} 文件上传失败.`);
      // this.setState( {file_upload_response: response.payload } );
      setFieldsValue( { filePath: '' } );
    }
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    // 上传表单属性
    const props = {
      name: 'file',
      multiple: false,
      action: 'http://10.80.10.151:8080/labor/template/upload',
      headers: { Authorization: getJwtToken() },
      onChange: this.handleUpload,
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
                      placeholder="请输入劳务合同模版简介"
                      rows={4}
                    />
                  )}
                </FormItem>

                <FormItem label="文件模版">
                  {getFieldDecorator('file', {
                    rules: [
                      {
                        required: true,
                        message: '请劳务合同模版文件',
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
          </Tabs.TabPane>
        </Tabs>

        {/* <Card bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              {
                templateParams.length > 0 ? templateParams.map( item => (
                  <Col span={12} key={item.paramId}>
                    <Form.Item label={item.description}>
                      <Input placeholder={item.name} disabled />
                    </Form.Item>
                  </Col>
                ) ) : <Col span={12}>
                        <Form.Item label="名称">
                          <Input placeholder="" disabled />
                        </Form.Item>
                      </Col>
              }
            </Row>
          </Form>
        </Card> */}
      </PageHeaderWrapper>
    );
  }
}

export default TemplateCreate;