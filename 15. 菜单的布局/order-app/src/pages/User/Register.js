import React, { Component } from "react";
import { Form, Input, Button, Message } from "antd";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import Logo from "Assets/icon.png";
import style from "./account.scss";
import { email_reg, pwd_reg } from "Utils/Regexp";
import Request from "Utils/Request";

// connect的装饰器/语法糖，相当于connect()(Register)，redux内容
@connect()
export class Register extends Component {
  state = {
    email: "27732357@qq.com"
  };

  // 自定义表单校验规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
      return;
    }
    callback();
  };

  // 自定义校验两次密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue("pwd")) {
      callback(rule.message);
      return;
    }
    callback();
  };

  // 点击注册，提交存储用户数据
  handleSubmit = () => {
    /**
     * 因为表单使用了this.props.form.getFieldDecorator双向数据绑定
     * 所以提交表单使用 this.props.form.validateFields 校验并且获取校验成功后绑定的数据
     */

    this.props.form.validateFields((err, value) => {
      // 首先打印看看err和value
      /**
       * 当校验存在不正确的字段时，err则返回一个对象，value也是返回一个对象
       * 当校验成功，不存在不正确的字段时，err则返回null，value返回一个对象性
       * 所以判断err是否为false，null为false，对象为true，如果err为false则校验成功
       */
      // console.log("err:", err);
      // console.log("value:", value);
      if (!err) {
        // console.log(value);
        // 校验成功，从value解构出变量email，pwd(aPwd 不需要存储到数据库，只需要在ui层面用于用户确认密码)
        const { email, pwd } = value;
        // console.log(email, pwd);
        Request("/users.json", {
          method: "post",
          data: { email, pwd }
        }).then(res => {
          // console.log(res);
          // status为200，且data不为空或者undefined则表示注册成功
          if (res.status == 200 && res.data) {
            // 注册成功则提示注册成功并且跳转至登录页面
            // 这里提示使用全局提示Message, antd 需要按需加载Message
            Message.success("注册成功！");
            // 两种方式跳转至登录页面
            // 第一种使用路由跳转，该方法相对麻烦，需要用connect包裹组件（第11行）,再引入routerRedux
            this.props.dispatch(routerRedux.push("/login"));
            // 第二种方式直接使用window的location跳转页面
            // window.location.href = "/#/login";
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={style.account}>
        <img src={Logo} className={style.logo} />
        <Form className="account-form">
          <Form.Item label="邮箱">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "邮箱不能为空，请输入邮箱！"
                },
                // {
                //   type: "email",
                //   message: "请输入正确的邮箱格式，如 27732357@qq.com"
                // }
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: "请输入正确的邮箱格式，如 27732357@qq.com"
                }
              ],
              initialValue: this.state.email
            })(<Input placeholder="请输入邮箱，如27732357@qq.com" />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator("pwd", {
              rules: [
                {
                  required: true,
                  message: "密码不能为空，请输入密码！"
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    "请输入正确的密码格式：6-16位字母、数字或特殊字符 _-."
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="请输入6-16位字母、数字或特殊字符的密码"
              />
            )}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator("aPwd", {
              rules: [
                {
                  required: true,
                  message: "密码不能为空，请输入密码！"
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    "请输入正确的密码格式：6-16位字母、数字或特殊字符 _-."
                },
                {
                  validator: this.validatorPwd,
                  message: "两次输入的密码不一致！"
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="请输入确认密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button className="btn" type="primary" onClick={this.handleSubmit}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);
