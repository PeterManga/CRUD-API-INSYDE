// src/components/PrivateRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Componente PrivateRoute que protege las rutas que solo pueden ser accedidas por usuarios autenticados.
 * Si el usuario no está autenticado, redirige a la página de login.
 *
 * @param {React.Component} component - El componente que se renderizará si el usuario está autenticado.
 * @param {Object} rest - Cualquier otra prop que se pase al componente Route.
 * @returns {JSX.Element} - El componente Route con la lógica de protección.
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    // Obtiene el estado de autenticación del store de Redux
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    // Si el usuario está autenticado, renderiza el componente solicitado
                    <Component {...props} />
                ) : (
                    // Si el usuario no está autenticado, redirige a la página de login
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
