import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Tree,
  Tabs,
  Skeleton,
  Upload,
  Progress,
  message,
} from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import './StepForm.less';

// import { Route, Redirect, Switch } from 'dva/router';
// import { getRoutes } from '@/utils/utils';
const { DirectoryTree, TreeNode } = Tree;
// const { TreeNode } = Tree
const { TabPane } = Tabs;

message.config({
  top: 100,
});

export default class StepForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: {
        cat: '-1',
      },
      /* fileList: {
        '0-0': [{ name: 'test', uid: '1' }],
        '0-1': [],
        '1-0': [],
        '1-1': [],
        test: [],
      }, */
    };
  }

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

  mockSaveResult = contractId => {
    router.push(`/contract/status/${contractId}`);
  };

  uploadFile = () => {
    console.log('upload file');
  };

  handleChange = change => {
    if (change.file.status === 'done') {
      // console.log( change.file );
      // let list = this.state.fileList['0-0']
      // const list = this.state.fileList
      // list['0-0'].push( change.file )
      const { file } = change;
      this.setState(state => ({
        fileList: {
          '0-0': state.fileList['0-0'].concat([file]),
        },
      }));
      // console.log( this.state.fileList );
    }
  };

  beforeUpload = () => {
    // console.log( file );
    let next = false;
    const { file } = this.state;
    // console.log( this.state.file.cat );
    if (file.cat === '-1') {
      message.error('未知的附近类型');
      // console.log( this.state.file.cat );
      next = false;
    } else {
      message.loading('上传中');
      next = true;
    }

    return next;
  };

  onSelectTreeNode = (selectedKeys, e) => {
    if (!e.selected) {
      // this.setState((state, props) => ({ file: { cat: '-1' } }));
      // return;
    } else if (!e.isLeaf) {
      // this.setState((state, props) => ({ file: { cat: selectedKeys } }));
    }
  };

  // const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  render() {
    // const { location } = this.props;
    // const { fileList } = this.state;
    return (
      <PageHeaderWrapper>
        <Tabs type="card" tabPosition="right">
          <TabPane tab="基本信息" key="1">
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
                <Form.Item wrapperCol={{ span: 23, offset: 1 }}>
                  <Button type="primary" onClick={() => this.mockSaveResult('fake_contract_00')}>
                    保存
                  </Button>{' '}
                  <Button type="default">重置</Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
          <TabPane tab="附件文件" key="2">
            <Card>
              <Upload
                name="file"
                listType="picture-card"
                showUploadList={false}
                action="http://127.0.0.1:9090/file/upload"
                multiple={false}
                className="uploadBar"
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
                // data={this.state.file}
              >
                <div>
                  {/* { this.state.file.uploading ? <Spin indicator={antIcon} /> : <Icon type='plus' /> } */}
                  <Icon type="plus" />
                </div>
              </Upload>

              <DirectoryTree
                multiple
                defaultExpandedKeys={['0-0']}
                onSelect={this.onSelectTreeNode}
                // onExpand={this.onExpand}
              >
                <TreeNode title="合同文件" key="0-0">
                  {/* <TreeNode title="leaf 0-0" key="0-0-0" isLeaf /> */}
                  {/* <TreeNode icon={<Icon type="inbox" theme="outlined" />} title="文件" key="0" isLeaf isUploadBtn /> */}
                  {/* {this.state.fileList['0-0'].map(file => {
                    return <TreeNode title={file.name} key={file.uid} isLeaf />;
                  })} */}
                </TreeNode>
                <TreeNode title="身份文件" key="0-1" />
                <TreeNode title="学历文件" key="1-0">
                  {/* <TreeNode title="leaf 1-0" key="1-0-0" isLeaf /> */}
                  {/* <TreeNode icon={<Icon type="upload" theme="outlined" />} title="文件" key="2" isLeaf isUploadBtn /> */}
                </TreeNode>
                <TreeNode title="其他" key="1-1">
                  {/* <TreeNode title="leaf 1-0" key="1-1-0" isLeaf /> */}
                  {/* <TreeNode icon={<Icon type="upload" theme="outlined" />} title="文件" key="3" isLeaf isUploadBtn /> */}
                </TreeNode>
              </DirectoryTree>

              <Progress percent={0} />
            </Card>
          </TabPane>
          <TabPane tab="合同变更" key="3">
            <Card>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </TabPane>
          <TabPane tab="审批历史" key="4">
            <Card>
              <Skeleton avatar paragraph={{ rows: 4 }} />
              <Skeleton avatar paragraph={{ rows: 4 }} />
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </TabPane>
          <TabPane tab="其他" key="5">
            <Card>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}
