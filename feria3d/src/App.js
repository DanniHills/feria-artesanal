import { Row } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import SessionService from './services/SessionService';
import DetalleProd from './components/Catalogo/Detalleprod';
import UbicacionPuestosComponent from './components/administrador/UbicacionPuestosComponent';
import UbicacionProductosComponent from './components/artesano/UbicacionProductosComponent';
import VerProductoComponent from './components/artesano/VerProductoComponent';
const sessionService = new SessionService();

function App() {

    const [user , setUser] = useState(sessionService.getUserData());
    const header = <Header style={{ zIndex: 999}} >
        <img alt=""  src="../img/log.svg"
        style={{width:"200px"}}
        />
    </Header>;
    const login = (props) => {
        return (<LoginComponent {...props} setUser={setUser}/>);
    }

    const logout = (props) => {
        sessionService.logout();
        setUser(null);
        props.history.push("/login");
    }

    const protectedRoutes = [
            <Route path="/inicio" exact component={InicioComponent} />,
            <Route path="/administrador/crearArtesano" exact component={CrearArtesanoComponent} />,
            <Route path="/administrador/buscarArtesano" exact component={BuscarArtesanoComponent} />,
            <Route path="/administrador/ubicacion" component={UbicacionPuestosComponent} />,
            <Route path="/artesano/crearProducto" exact component={CrearProductoComponent} />,
            <Route path="/artesano/buscarProducto" exact component={BuscarProductoComponent} />,
            <Route path="/artesano/ubicacion" component={UbicacionProductosComponent} />,
            <Route path="/administrador/CrearFeria" exact component={CrearFeriaComponent} />,
            <Route path="/administrador/BuscarFeria" exact component={BuscarFeriaComponent}/>,
            <Route path="/administrador/CrearPuesto" exact component={CrearPuestoComponent}/>,
            <Route path="/administrador/BuscarPuesto" exact component={BuscarPuestoComponent}/>,
            <Route path="/catalogo" exact component={CatalogoComponent} />, 
            <Route path="/detalle/:prod_id" component={DetalleProd} />,
            <Route path="/artesano/verProducto/:prod_id" component={VerProductoComponent}/>,

    ];
    
    let sider = null;

    if(!user)
        sider = <SiderHomeComponent/>
    
    if(user && user.tipo === 'Administrador')
        sider = <SiderComponent/>

    if(user && user.tipo === 'Artesano')
        sider = <SiderArtesanoComponent/>

    const loggedLayout = (
        <Layout style={{ minHeight: '100vh' }}>    
           {header}
            <Layout>
            {sider}
                <Layout>
                    
                    <Content>
                        <Switch>
                            {protectedRoutes}  
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
    );

   

    if(user !== null){
        return ( 
            <Router>
                <Switch>
                    <Route path="/" exact component={HomeComponent} />
                    <Route path="/logout" exact render={logout} />
                    
                </Switch>
                {loggedLayout}
            </Router>
        );
    }else{
        return ( 
            <Router>
            <Layout style={{ minHeight: '100vh' }}>    
         {   header}
                <Layout>
                {sider}
                    <Layout>
                        
                        <Content>
                        
                <Switch>
                    <Route path="/" exact component={HomeComponent} />
                    <Route path="/login" exact render={login} />
                </Switch>
                <Switch>
                    <Route path="/catalogo" exact component={CatalogoComponent} />
                    <Route path="/detalle/:prod_id" component={DetalleProd} />
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

}
export default App;








