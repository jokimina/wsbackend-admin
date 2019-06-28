import React, { Component } from 'react';
import { Message, Dialog, Select, Button, Form, Input, Field } from '@alifd/next';
import { updateProject } from '../../../api/project';

const FormItem = Form.Item;

export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataIndex: null,
    };
    this.field = new Field(this);
  }

  handleSubmit = async () => {
    await this.field.validate((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }

      const { dataIndex } = this.state;
      this.props.getFormValues(dataIndex, values);
      updateProject(values).then(() => {
        Message.success('更新成功');
      });
      this.setState({
        visible: false,
      });
    });
  };

  onOpen = (index, data) => {
    this.field.setValues({ ...data });
    this.setState({
      visible: true,
      dataIndex: index,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const init = this.field.init;
    const { index, record, columns = [] } = this.props;
    const data = _.mapValues(_.omit(record, 'action'), (v) => (_.isNull(v) ? '' : v));

    const renderColumns = _.cloneDeep(columns);
    _.remove(renderColumns, (n) => n.dataIndex === 'action');
    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    return (
      <div style={styles.editDialog}>
        <Button type="primary" onClick={() => this.onOpen(index, data)}>
          编辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          {this.state.visible &&
          <Form field={this.field}>
            {
            renderColumns.map((item) => {
              return item.dataIndex !== 'action' && (
                <FormItem label={item.title} key={item.dataIndex} {...formItemLayout}>
                  {
                    _.has(this.props.projectSelect, item.dataIndex) ? (
                      <Select
                        name={item.dataIndex}
                        aria-label="tag mode"
                        mode="tag"
                        dataSource={this.props.projectSelect[item.dataIndex]}
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <Input
                        {...init(item.dataIndex,
                        { initValue: '' },
                    )}
                      />
                    )
                  }
                </FormItem>
              );
            })
          }
          </Form>
        }
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
