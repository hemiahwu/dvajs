import React, { Component } from "react";
import { Form, Input, Button, Message } from "antd";
import { connect } from "dva";
import Logo from "Assets/icon.png";
import style from "./account.scss";
import { pwd_reg } from "Utils/Regexp";
import Request from "Utils/Request";

@connect()
export class Login extends Component {
  // 自定义表单校验规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
      return;
    }
    callback();
  };

  // 登录
  handleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const { email, pwd } = value;
        Request("users.json").then(res => {
          // console.log(res);
          const { data, status } = res;
          if (res && status == 200 && data) {
            let users = [];
            for (let key in data) {
              users.push({
                ...data[key],
                key
              });
            }
            users = users.filter(user => {
              return user.pwd === pwd && user.email === email;
            });
            // 如果过滤至少一个用户则登录成功，否则登录失败
            if (users && users.length) {
              // 登录成功保存用户信息，如果过滤出多个则取第一个
              localStorage.setItem("email", users[0].email);
              localStorage.setItem("key", users[0].key);
              this.props
                .dispatch({
                  type: "global/setUserInfo",
                  payload: users[0]
                })
                .then(() => {
                  // 用户数据存储完之后再进行跳转
                  window.location.href = "/#/";
                });
            } else {
              Message.error("邮箱或密码错误，请重新输入！");
            }
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
                {
                  type: "email",
                  message: "请输入正确的邮箱格式，如 27732357@qq.com"
                }
              ]
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
          <Form.Item>
            <Button className="btn" type="primary" onClick={this.handleSubmit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
