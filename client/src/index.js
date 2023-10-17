import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'


// components
import App from "./components/App";
import Signup from "./components/Signup"
import QuizList from "./components/QuizList";
import ScoreList from "./components/ScoreCard";
import Category from "./components/Category";
import Login from "./components/Login";

// loaders 
import {getQuiz, getPlayers, getScores} from "./loaders"
import ScoreCard from "./components/ScoreCard";

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
            },
            { 
                path: "/score",
                element: <ScoreList/>,
                loader: getScores
            }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <RouterProvider router={router} /> );