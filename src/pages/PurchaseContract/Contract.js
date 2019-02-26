import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tag, Icon, Button, List, Input, Form } from 'antd';

import StandardFormRow from '@/components/StandardFormRow';
import TagSelect from '@/components/TagSelect';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import router from 'umi/router';
import styles from './Contract.less';

const FormItem = Form.Item;

@connect(({ loading, purchaseContract }) => ({
  fetching: loading.effects['purchaseContract/fetch'],
  purchaseContract,
}))
@Form.create({
  onValuesChange(
    {
      dispatch,
      purchaseContract: { keyword },
    },
    changedValues,
    allValues
  ) {
    const { status } = allValues;
    // console.log( "请求数据--所属类目:", status );
    // 设置status状态值
    dispatch({
      type: 'purchaseContract/setParamStatus',
      payload: { status: status },
    });

    // 清空合同列表
    dispatch({
      type: 'purchaseContract/clearContractList',
      payload: {},
    });

    // 表单项变化时请求数据
    dispatch({
      type: 'purchaseContract/fetch',
      payload: {
        // 分页
        // count: 5,
        keyword: keyword,
        status: status,
      },
    });
  },
})
class Contract extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // 发起请求
    dispatch({
      type: 'purchaseContract/fetch',
      payload: {},
    });
  }

  handleSearch = keyword => {
    const {
      dispatch,
      purchaseContract: { status },
    } = this.props;

    // 清空数据
    dispatch({
      type: 'purchaseContract/clearContractList',
      payload: {},
    });

    dispatch({
      type: 'purchaseContract/fetch',
      payload: { keyword: keyword, status: status },
    });
  };

  // 加载更多
  fetchMore = () => {
    const {
      dispatch,
      fetching,
      purchaseContract: { keyword, status, page },
    } = this.props;
    if (fetching) return;
    dispatch({
      type: 'purchaseContract/fetch',
      payload: {
        keyword: keyword,
        status: status,
        page: { pageIndex: page.pageIndex + 1 },
      },
    });
  };

  // 创建采购模版
  createTemplate = () => {
    router.push('/purchase_contract/template/create');
  };

  render() {
    const {
      form,
      purchaseContract: { contracts },
      fetching,
      // match
    } = this.props;
    const { getFieldDecorator } = form;

    // 模版列表
    const ListContent = ({ data: { content /* , updatedAt, avatar, owner, href */ } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        {/* <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在
          <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div> */}
      </div>
    );

    // 下拉加载
    const loadMore =
      contracts.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {fetching ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    // 内容搜索
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="合同名称"
          enterButton="搜索"
          size="large"
          onSearch={value => this.handleSearch(value)}
          style={{ width: 522 }}
        />
      </div>
    );

    return (
      <PageHeaderWrapper content={mainSearch}>
        <Fragment>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('status')(
                    <TagSelect>
                      <TagSelect.Option value="cat1">订立中</TagSelect.Option>
                      <TagSelect.Option value="cat2">履行中</TagSelect.Option>
                      <TagSelect.Option value="cat3">变更中</TagSelect.Option>
                      <TagSelect.Option value="cat4">已作废</TagSelect.Option>
                    </TagSelect>
                  )}
                  {/* <Input type="text" /> */}
                </FormItem>
              </StandardFormRow>
            </Form>
          </Card>

          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
          >
            <List
              size="large"
              loading={fetching}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={contracts}
              renderItem={item => (
                <List.Item
                  key={item.contractId}
                  actions={[<Button type="primary">查看合同</Button>]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <a className={styles.listItemMetaTitle} href={item.href}>
                          {item.conname}
                        </a>
                      </div>
                    }
                    // TODO: 添加标签功能
                    description={
                      <span>
                        <Tag>人事合同</Tag>
                        <Tag>劳务合作</Tag>
                        <Tag>2018</Tag>
                      </span>
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </Fragment>
      </PageHeaderWrapper>
    );
  }
}

export default Contract;
