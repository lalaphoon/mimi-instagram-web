import React from 'react';
import {Link} from "react-router-dom"
import '../styles/Register.css';
import {API_ROOT} from '../constants';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button,
    AutoComplete,
    message
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        let lastResponse;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${API_ROOT}/signup`, {
                    method:'POST',
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                }).then((response) => {
                    lastResponse = response
                    return response.text(); //return another promise
                }, (error) => {
                    console.log('Error');
                }).then ((text) => {
                    if (lastResponse.ok) {
                        message.success(text);
                        this.props.history.push('/login');
                    } else {
                        message.error(text);
                    }
                });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });

    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
                <Form.Item
                    label={
                        <span className="text-style">
              Nickname&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    }
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label= {<span className="text-style">E-mail</span>}>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label={<span className="text-style">Password</span>} hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label={<span className="text-style">Comfirm Password</span>} hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button className="register-button" type="primary" htmlType="submit">
                        Register
                    </Button>
                    <div>
                        I already have an account, go back to <Link to="/login">Login</Link>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}

export const Register = Form.create({ name: 'register' })(RegistrationForm);
