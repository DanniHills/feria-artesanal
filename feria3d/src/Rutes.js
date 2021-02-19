import { Row } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useAuthUser} from 'react-auth-kit'
import LoginComponent from './components/login/LoginComponent';
import HomeComponent from './pages/home';
import CrearArtesanoComponent from './components/administrador/CrearArtesanoComponent';
import SiderComponent from './components/sider/SiderComponent';
import SiderHomeComponent from "./components/sider/SiderHomeComponent";
import SiderArtesanoComponent from "./components/sider/SiderArtesanoComponent"
import InicioComponent from './components/inicio/InicioComponent';
import BuscarArtesanoComponent from './components/administrador/BuscarArtesanoComponent';
import BuscarProductoComponent from './components/artesano/BuscarProductoComponent';
import CrearProductoComponent from './components/artesano/CrearProductoComponent';
import CrearFeriaComponent from "./components/administrador/CrearFeriaComponent";
import BuscarFeriaComponent from "./components/administrador/BuscarFeriaComponent";
import CrearPuestoComponent from "./components/administrador/CrearPuestoComponent";
import BuscarPuestoComponent from "./components/administrador/BuscarPuestoComponent";
import CatalogoComponent from "./components/Catalogo/CatalogoComponent";

function Rutes() {
    const auth = useAuthUser();

    return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomeComponent} />
                    <Route path="/login" exact component={LoginComponent} />
                </Switch>


                <Layout style={{ minHeight: '100vh' }}>
                    <Header
                        style={{ height: '100px', zIndex: 999 }}><h1 style={{ color: 'white', fontSize: '3em' }}>Feria Artesanal</h1></Header>
                    <Layout>
                    { auth().tipo ==="Administrador" &&
                            <SiderComponent />
                       }
                         { auth().tipo ==="Artesano" &&
                            <SiderArtesanoComponent />
                       }
                         { auth().tipo !=="Artesano" && auth().tipo !==" Administrador" &&
                            <SiderHomeComponent/>
                       }
                        <Layout>
                            <Content className="site-layout-background"
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 280,
                                }}>
                                <Switch>
                                    <Route path="/inicio" exact component={InicioComponent} />
                                    <Route path="/administrador/crearArtesano" exact component={CrearArtesanoComponent} />
                                    <Route path="/administrador/buscarArtesano" exact component={BuscarArtesanoComponent} />
                                    <Route path="/artesano/crearProducto" exact component={CrearProductoComponent} />
                                    <Route path="/artesano/buscarProducto" exact component={BuscarProductoComponent} />
                                    <Route path="/administrador/CrearFeria" exact component={CrearFeriaComponent} />
                                    <Route path="/administrador/BuscarFeria" exact component={BuscarFeriaComponent} />
                                    <Route path="/administrador/CrearPuesto" exact component={CrearPuestoComponent} />
                                    <Route path="/administrador/BuscarPuesto" exact component={BuscarPuestoComponent} />
                                    <Route path="/Catalogo" exact component={CatalogoComponent} />
            
                                </Switch>
                            </Content>
                            <Footer>
                                <Row justify="center">
                                    CopyRight &copy; Feria Artesanal
                                </Row>
                                <Row justify="center">
                                    Valparaíso, Chile, 2020.
                                </Row>
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>

            </Router>
       
    );
}
export default Rutes;