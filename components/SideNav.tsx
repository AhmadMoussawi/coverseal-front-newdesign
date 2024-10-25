import Link from "next/link";
// import {
//   Configurator,
//   Catalog,
//   AfterSale,
//   PriceRequest,
//   Partnerships,
// } from "../components/icons";
// import { Color } from "../utils/constants";
import { useUpdateColorOnScroll } from "./useUpdateColorOnScroll";

import { useEffect } from "react"; // Add useEffect if not already imported
import { LogoSymbol } from "./icons/LogoSymbol";
import { Color } from "../utils/constants";

// TODO: add missing link
export function SideNav({
  catalog_side_nav_link_text,
  configurator_side_nav_link_text,
  after_sale_side_nav_link_text,
  price_request_side_nav_link_text,
  partnerships_side_nav_link_text,
  hasConfigurator,
  hasSAV,
  handleMenuOpen, mainMenuProps
} ){
 useUpdateColorOnScroll(".side-nav li");
 useUpdateColorOnScroll(".side-nav .logo");
  useEffect(() => {
    // Add any side effects or logic you need on component mount
  }, []);


  return (
    <div className="side-nav">
<Link href="/" passHref> 
          <a className="logo" aria-label="logo">         
                <LogoSymbol color={Color.WHITE} />              
       </a>
          </Link>
      <ul>

      
        <li>
          <Link href="/catalog-request" passHref> 
          <a className="price-request">
            <div className="text">{catalog_side_nav_link_text}</div>
            </a>

           
          </Link>
        </li>
        {hasConfigurator && (
          <li>
            <Link href="/before-configurator" passHref>
            <a><div className="text">{configurator_side_nav_link_text}</div></a>
              
            </Link>
          </li>
        )}
         <li>
          <Link href="/partnerships" passHref>
          <a className="partnerships"><div className="text">{partnerships_side_nav_link_text}</div></a>
            
          </Link>
        </li>
      <li>
          <Link href="/price-request" passHref>
          <a><div className="text"> {price_request_side_nav_link_text}</div></a>
          </Link>
        </li>
        
      </ul>
      <button className="open-menu-button" title="open menu" onClick={handleMenuOpen}>
        <div className="icon">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <span>{mainMenuProps.menu_hamburger_text}</span>
      </button>
    </div>
  );
}
