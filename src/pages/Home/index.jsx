import React, { Component } from 'react';
import {
  Tab,
  // Breadcrumb,
} from '@alifd/next';
import WasteTable from './components/WasteTable';
import AuditTable from './components/AuditTable';

import styles from './index.module.scss';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (key) => {
    console.log('change', key);
  };

  render() {
    return (
      <div className={styles.container}>
        {/* <Breadcrumb className={styles.Breadcrumb}>
          <Breadcrumb.Item>垃圾分类管理</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className={styles.content}>
          <Tab onChange={this.handleChange}>
            <Tab.Item key="1" title="数据管理">
              <WasteTable />
            </Tab.Item>
            <Tab.Item key="2" title="审核管理">
              <AuditTable />
            </Tab.Item>
          </Tab>
        </div>
      </div>
    );
  }
}

export default Home;
