import { App } from "../App";
import IndexPage from "../page/Index";
import ProductPage from "../page/Product";
import ProductDetail from "../page/ProductDetail";
import CartDetail from "../page/CartDetail";
import { createBrowserRouter } from "react-router-dom";
const routers = [
  {
    path:'/',
    element:<App/>,
    children:[
      {
        index: true,
        element:<IndexPage/>,
      },
      {
        path:"products",
        element:<ProductPage/>,
      },
      {
        path: 'products/:id', // 動態產品詳細頁路徑
        element: <ProductDetail/>,
      },
      {
        path:'cartdetail',
        element:<CartDetail/>
      },
    ]
  }
]

const router = createBrowserRouter(routers)
export default router