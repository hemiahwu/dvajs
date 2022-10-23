import React, { Component } from "react";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;

class NewPizza extends Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      },
      colon: false
    };

    const { getFieldDecorator } = this.props.form;
    const required = true;

    return (
      <div>
        <h3>添加新的pizza</h3>
        <Form>
          <Form.Item {...formItemLayout} label="品种">
            {getFieldDecorator("name", {
              rules: [
                {
                  required,
                  message: "请输入品种"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            {getFieldDecorator("description")(<TextArea />)}
          </Form.Item>
          <p>
            <strong>选项1</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator("size1", {
              rules: [
                {
                  required,
                  message: "请输入尺寸"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="价格">
            {getFieldDecorator("price1", {
              rules: [
                {
                  required,
                  message: "请输入价格"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <p>
            <strong>选项2</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator("size2", {
              rules: [
                {
                  required,
                  message: "请输入尺寸"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="价格">
            {getFieldDecorator("price2", {
              rules: [
                {
                  required,
                  message: "请输入价格"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="btn-w-p100">
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NewPizza);
