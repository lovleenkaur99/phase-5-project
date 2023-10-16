import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'


// components
import App from "./components/App";
import Signup from "./components/Signup"
import QuizList from "./components/QuizList";
import QuizCard from "./components/QuizCard";

import Category from "./components/Category";
import Login from "./components/Login";

// loaders 
import {getQuiz, getPlayers} from "./loaders"

const router = createBrowserRouter([ 
    { 
        path: "/",
        element: <App/>,
        children: [ 
            { 
                index: true, 
                element: <Signup/>
            }, 
            { 
                path: "getQuiz",
                element: <QuizList/>,
                loader : getQuiz
                
            },
            { 
                path: "category",
                element: <Category />,
                loader: getQuiz
            },
            { 
                path: "login",
                element: <Login/>,
                loader: getPlayers
            } 
            // { 
            //     path: "/",
            //     element: <QuizList/>,
            //     loader: getTrivia
            // }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <RouterProvider router={router} /> );