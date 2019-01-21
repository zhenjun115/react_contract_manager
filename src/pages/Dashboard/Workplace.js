import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Row, Col, Card, List, Avatar } from 'antd';

import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Workplace.less';

@connect(({ user, activity, contract, loading, setting }) => ({
  currentUser: user.currentUser,
  activity,
  carryout: contract.carryout,
  carryoutLoading: loading.effects['contract/carryout'],
  progress: contract.progress,
  progressLoading: loading.effects['contract/progress'],
  shortcutAction: setting.shortcutAction,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  tasksLoading: loading.effects['activity/tasks/fetch'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    // TODO: 获取用户在线信息
    // 获取用户
    dispatch({
      type: 'user/fetchCurrent',
    });

    // TODO: 获取通知
    dispatch({
      type: 'activity/fetchNotice',
    });

    // 获取当前待办任务列表
    dispatch({
      type: 'activity/tasks/fetch',
      payload: {},
    });

    // 获取订立中的合同
    dispatch({
      type: 'contract/fetchCarryout',
    });

    // 获取履行中的合同
    dispatch({
      type: 'contract/fetchProgress',
    });
  }

  // 加载活动列表
  renderActivities() {
    const {
      activity: { tasks },
    } = this.props;
    // console.log( "render:", tasks );
    return tasks.map(item => {
      // TODO: 通知模版完善
      // const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      //   if (item[key]) {
      //     return (
      //       <a href={item[key].link} key={item[key].title}>
      //         {item[key].title}
      //       </a>
      //     );
      //   }
      //   return key;
      // });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.title}</a>
                &nbsp;
                <span className={styles.event}>
                  <a href={item.link} key={item.title}>
                    {item.content}
                  </a>
                </span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      carryout,
      carryoutLoading,
      progress,
      progressLoading,
      shortcutAction,
      tasksLoading,
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="订立中"
              bordered={false}
              extra={<Link to="/dashboard/workplace/contract/progress">全部</Link>}
              loading={progressLoading}
              bodyStyle={{ padding: 0 }}
            >
              {progress.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.contractId}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" icon="file-text" />
                          <Link to={`/contract/fetch/${item.contractId}`}>{item.conname}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="履行中"
              bordered={false}
              extra={<Link to="/dashboard/workplace/contract/carryout">全部</Link>}
              loading={carryoutLoading}
              bodyStyle={{ padding: 0 }}
            >
              {carryout.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.contractId}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" icon="file-text" />
                          {/* <Link to={item.href}>{item.title}</Link> */}
                          <Link to={`/contract/fetch/${item.contractId}`}>{item.conname}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      {/* <Link to={item.memberLink}>{item.member || ''}</Link> */}
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {
                  router.push('/contract/template');
                }}
                links={shortcutAction}
                linkElement={Link}
              />
            </Card>
            <Card
              bodyStyle={{ marginBottom: 24 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={tasksLoading}
            >
              <List loading={tasksLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
