import React, { useState } from "react";
import { Menu, Layout } from "antd";
import {
  HomeOutlined,
  DesktopOutlined,
  PushpinOutlined,
  SearchOutlined,
  UserAddOutlined,
  IdcardOutlined,
  PictureOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;
function SiderComponent() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  return (
    <Sider breakpoint="lg" collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/inicio">home</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<IdcardOutlined />} title="Productos">
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/artesano/crearProducto">Crear Producto</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/artesano/buscarProducto">Buscar Producto</Link>
          </Menu.Item>
          <SubMenu key="4" icon={<PushpinOutlined />} title="Definir Ubicación">
            <Menu.Item key="5" icon={<SearchOutlined />}>
              <Link to="/artesano/ubicacion/Laterales">Mesa Laterales</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<SearchOutlined />}>
              <Link to="/artesano/ubicacion/Central">Mesa Central</Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="7" icon={<PictureOutlined />}>
          <Link to="/">Feria3D</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<ShoppingCartOutlined />} >
          <Link to="/Catalogo">Catálogo</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<DesktopOutlined />}>
          <Link to="/logout">Cerrar sesión</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderComponent;
