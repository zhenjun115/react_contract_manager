import React, { PureComponent } from 'react';
import Link from 'umi/link';
// import { Icon } from 'antd';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import styles from './index.less';
import logo from '../../assets/logo.svg';

export default class TopNavHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4,
    };
  }

  render() {
    const { theme, contentWidth } = this.props;
    const { maxWidth } = this.state;
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                {/* <Icon type="home" /> */}
                {/* <span>主页</span> */}
                <img src={logo} alt="logo" />
                <h1>首页</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu {...this.props} style={{ border: 'none', height: 64 }} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
