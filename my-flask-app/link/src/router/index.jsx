import { createBrowserRouter} from "react-router-dom";
import Home from '../page/Home'
import Work from '../page/Work'
import Main from '../page/Main'
import Mylayout from '../page/Mylayout'
import NotFound from "../page/NotFound";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Mylayout/>,
        children:[
            {
                path:'work',
                element:<Work/>
            },
            {
                index:true,
                element:<Home/>
            }
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    }
])

export default router
