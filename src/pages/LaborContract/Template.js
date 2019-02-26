import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tag, Icon, Button, List, Input } from 'antd';

import router from 'umi/router';
import styles from './Template.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ loading, laborTemplate }) => ({
  // loading,
  fetching: loading.effects['laborTemplate/fetch'],
  laborTemplate,
}))
class Template extends Component {
  componentDidMount() {
    // console.info( this.props.match );
    const { dispatch, form, match, laborTemplate } = this.props;

    const payload = {};
    if (match.params.type) {
      payload.catCodes = [match.params.type];
      form.setFieldsValue({ category: [match.params.type] });
    }

    // 初始化
    dispatch({
      type: 'laborTemplate/init',
      payload: {},
    });

    // 发起请求
    dispatch({
      type: 'laborTemplate/fetch',
      payload: {
        page: laborTemplate.page,
      },
    });
  }

  // 根据关键字进行搜索
  handleSearch = value => {
    const { dispatch } = this.props;

    // 清空模版列表
    dispatch({
      type: 'laborTemplate/clearTemplateList',
      payload: {},
    });

    // 搜
    dispatch({
      type: 'laborTemplate/fetch',
      payload: {
        keyword: value,
      },
    });
  };

  // 加载更多
  fetchMore = () => {
    const {
      dispatch,
      fetching,
      laborTemplate: { page, keyword },
    } = this.props;
    if (fetching) return;
    // console.log( "keyword", keyword );

    // 发起请求
    dispatch({
      type: 'laborTemplate/fetch',
      payload: {
        keyword: keyword,
        page: { pageIndex: page.pageIndex + 1, pageSize: page.pageSize },
      },
    });
  };

  // 创建劳务合同
  createContract = templateId => {
    router.push(`/labor_contract/create/${templateId}`);
  };

  // 创建劳务模版
  createTemplate = () => {
    router.push('/labor_contract/template/create');
  };

  // 查看劳务模版
  viewTemplate = templateId => {
    router.push(`/labor_contract/template/info/${templateId}`);
  };

  render() {
    const {
      laborTemplate: { templates },
      fetching,
    } = this.props;

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
      templates.length > 0 ? (
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
          placeholder="模版名称/描述"
          enterButton="搜索"
          size="large"
          onSearch={value => this.handleSearch(value)}
          style={{ width: 522 }}
        />
        <Button
          type="primary"
          size="large"
          icon="plus"
          style={{ marginLeft: 8 }}
          onClick={this.createTemplate}
        >
          新模版
        </Button>
      </div>
    );

    return (
      <PageHeaderWrapper content={mainSearch}>
        <Fragment>
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
              dataSource={templates}
              renderItem={item => (
                <List.Item
                  key={item.templateId}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => this.createContract(item.templateId)}
                      size="small"
                    >
                      使用模版
                    </Button>,
                    <Button
                      type="primary"
                      onClick={() => this.viewTemplate(item.templateId)}
                      size="small"
                    >
                      查看模版
                    </Button>,
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <a className={styles.listItemMetaTitle} href={item.href}>
                          {item.title}
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

export default Template;
