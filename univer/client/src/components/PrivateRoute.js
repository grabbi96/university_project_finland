import React from 'react';

import { Redirect, Route } from 'react-router-dom';


export const UserPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        localStorage.getItem('auth_token') ? (
            <Component {...props} />
        ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )

    }
    />
)

export const UserRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        localStorage.getItem('doctor_jwt') ? (
            (
                <Redirect
                    to={{
                        pathname: "/profile",
                        state: { from: props.location }
                    }}
                />
            )
        ) :
            < Component {...props} />

    }
    />
)