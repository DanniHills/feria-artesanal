import React,{useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import {
  HomeOutlined,
  PushpinOutlined,
    MenuUnfoldOutlined,
    PictureOutlined,
    MenuFoldOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function SiderHomeComponent() {
    const [visible, setVisible] = useState(false);
    
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ marginBottom: 6, zIndex: 1, width:50, height:50 }}>
          {React.createElement(visible ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      <Drawer
        title="Menú"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Sider trigger={null}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme=""
        >
           <Menu.Item key="1" icon={<HomeOutlined />}>
           <Link to="/login">Iniciar sesión</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PictureOutlined />}>
           <Link to="/">Feria3D</Link>
          </Menu.Item>
          <Menu.Item key="sub1" icon={<ShoppingCartOutlined />} >
                     <Link to="/Catalogo">Catálogo</Link>
          </Menu.Item>
          <Menu.Item key="sub2"  icon={<PushpinOutlined />}      
          > <Link to="/mapa">Mapa</Link></Menu.Item>
    
        </Menu>
        </Sider>
      </Drawer>
    </>
  );
};

export default SiderHomeComponent;