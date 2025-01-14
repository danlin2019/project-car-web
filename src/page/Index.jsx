import { ShoeDetail } from "./index/ShoeDetail"
import { NewArrivalsSection } from "./index/NewArrivalsSection";
import { Helmet } from "react-helmet";
const IndexPage = () =>{
  return(
  <div className="animate-fadeIn">
  <Helmet>
    <title>產品首頁</title>
    <meta name="description" content="瀏覽產品首頁，發現您喜歡的商品！" />
    <meta name="keywords" content="產品, 商品, 網路購物" />
  </Helmet>
  <ShoeDetail/>
  <NewArrivalsSection/>
  </div>)
}

export default IndexPage