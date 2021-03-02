import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Col, Row, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import LoginService from "../../services/LoginService";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import SessionService from "../../services/SessionService";
import { useHistory } from "react-router-dom";


const loginService = new LoginService();
const sessionService = new SessionService();
function LoginComponent(props) {
  const history = new useHistory();
  console.log(props);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    loginService.login(values.email, values.password)
      .then((response) => {
        if (response.status === 'OK') {
          message.success("Sesión iniciada correctamente.");
          sessionService.setToken(response.token);
          props.setUser(sessionService.getUserData());
          history.push("/inicio");
          history.go(0);
          //window.location.reload();
        } else {
          message.warning("Correo o contraseña no válido.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        message.error("Error de conexión con el servidor.");
        setLoading(false);
      });
  };

  return (
    <Layout>
         <Row style={{ minHeight: "50vh" }} justify="center" align="middle">
        <Col span={5}>
          <h1 style={{color: '#AC3336', fontSize: '3em'}}>Login</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Debe indicar el correo electrónico.",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Correo electrónico"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Debe ingresar su contraseña." },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Mantener sesión iniciada</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="index.html">
                Recuperar contraseña
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );

}

export default LoginComponent;