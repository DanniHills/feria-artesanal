import React from "react";
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import {
  HomeOutlined,
  DesktopOutlined,
  PushpinOutlined,
  SearchOutlined,
  UserAddOutlined,
  IdcardOutlined,
  GoldOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  PictureOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
function SiderComponent() {
  return (
    <Sider trigger={null}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/inicio">home</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<IdcardOutlined />} title="Artesanos">
          <Menu.Item key="2" icon={<UserAddOutlined />}>
            <Link to="/administrador/crearArtesano">Crear artesano</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/administrador/buscarArtesano">Buscar artesanos</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<GoldOutlined />} title="Feria Artesanal">
          <Menu.Item key="5" icon={<FormOutlined />}>
            <Link to="/administrador/crearFeria">Crear Feria </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SearchOutlined />}>
            <Link to="/administrador/BuscarFeria">Buscar Feria</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<GoldOutlined />} title="puestoArtesanal">
        <Menu.Item key="7" icon={<FileAddOutlined />}>
            <Link to="/administrador/CrearPuesto">
              Crear Puesto Artesanal
            </Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<SearchOutlined />}>
            <Link to="/administrador/BuscarPuesto">
              Buscar Puesto Artesanal
            </Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<PushpinOutlined />}>
            <Link to="/administrador/ubicacion">Ubicación Puesto</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="10" icon={<PictureOutlined />}>
           <Link to="/">Feria3D</Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<ShoppingCartOutlined />} >
                     <Link to="/Catalogo">Catálogo</Link>
          </Menu.Item>
        <Menu.Item key="12" icon={<DesktopOutlined />}>
          <Link to="/logout">Cerrar sesión</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderComponent;
