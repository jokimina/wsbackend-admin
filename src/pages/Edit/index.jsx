/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Select, DatePicker, Radio, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

const { Option } = Select;
const { Group: RadioGroup } = Radio;

export default class DonationForm extends Component {
  static displayName = 'DonationForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        status: 'pending',
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log({ errors });
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <IceContainer>
        <div className={styles.title}>垃圾编辑</div>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>垃圾型号-名称</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="垃圾名称不能为空"
                name="modelName"
              >
                <Input
                  placeholder="请输入垃圾名称"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div className={styles.formError}>
                <IceFormError name="modelName" />
              </div>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>垃圾型号-ID</div>
              <IceFormBinder
                required
                triggerType="onBlur"
                message="垃圾型号-ID不能为空"
                name="modelId"
              >
                <Input
                  placeholder="请输入垃圾型号-ID"
                  style={{ width: '400px' }}
                />
              </IceFormBinder>
              <div className={styles.formError}>
                <IceFormError name="modelId" />
              </div>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>垃圾类别</div>
              <IceFormBinder name="cate">
                <Select
                  placeholder="请选择"
                  mode="multiple"
                  style={{ width: '400px' }}
                >
                  <Option value="1">传统领域</Option>
                  <Option value="2">互联网领域</Option>
                  <Option value="3">其他</Option>
                </Select>
              </IceFormBinder>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>垃圾责任人</div>
              <IceFormBinder
                required
                name="responsible"
                triggerType="onBlur"
                message="责任人不能为空"
              >
                <Input placeholder="请输入" style={{ width: '400px' }} />
              </IceFormBinder>
              <div className={styles.formError}>
                <IceFormError name="responsible" />
              </div>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>垃圾生产时间</div>
              <IceFormBinder name="time">
                <DatePicker style={{ width: '400px' }} />
              </IceFormBinder>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formLabel}>绑定状态</div>
              <IceFormBinder name="status">
                <RadioGroup
                  dataSource={[
                    {
                      value: 'pending',
                      label: '绑定中',
                    },
                    {
                      value: 'no',
                      label: '未绑定',
                    },
                    {
                      value: 'yes',
                      label: '已绑定',
                    },
                  ]}
                />
              </IceFormBinder>
            </div>
            <Button
              type="primary"
              className={styles.submitButton}
              onClick={this.validateAllFormField}
            >
              提 交
            </Button>
          </div>
        </IceFormBinderWrapper>
      </IceContainer>
    );
  }
}