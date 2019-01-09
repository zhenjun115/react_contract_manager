import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  //   DatePicker,
  //   Select,
  Button,
  Card,
  Upload,
  //   InputNumber,
  //   Radio,
  Icon,
  message,
  //   Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
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
          file: { status, name },
        } = values.file;
        values.file = name;
        dispatch({
          type: 'purchaseTemplate/save',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    // 上传表单属性
    const props = {
      name: 'file',
      multiple: false,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        //   const status = info.file.status;
        const {
          file: { status, name },
        } = info;
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }

        if (status === 'done') {
          message.success(`${name} 文件上传成功.`);
        } else if (status === 'error') {
          message.error(`${name} 文件上传失败.`);
        }
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="文件名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入模版名称',
                  },
                ],
              })(<Input placeholder="请输入文件名称" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="文件模版">
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
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Upload.Dragger>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="文档简介">
              {getFieldDecorator('desc', {
                rules: [
                  {
                    required: true,
                    message: '请输入文档简介',
                  },
                ],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入采购合同模版简介" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TemplateCreate;