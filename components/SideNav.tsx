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
}: SideNavContent ){
 useUpdateColorOnScroll(".side-nav li");

  useEffect(() => {
    // Add any side effects or logic you need on component mount
  }, []);


  return (
    <div className="side-nav">
      <ul>
      <li>
          <Link href="/" passHref> 
          <a className="logo">         
                <LogoSymbol color={Color.WHITE} />              
       </a>
          </Link>
        </li>

        {/* <li>
          <Link href="/catalog-request" passHref>
          <a style={{ color: 'white', fontSize: '20px' }}>{price_request_side_nav_link_text}</a>
       { <a>
              
              <Catalog color={Color.TERRA_COTTA} />
              <div className="text">{catalog_side_nav_link_text}</div>
            </a> }
          </Link>
        </li> */}
        <li>
          {/* <Link href="/price-request" passHref> */}
          <Link href="/catalog-request" passHref> 
          <a className="price-request"><div className="text">{catalog_side_nav_link_text}</div></a>

            {/* <a className="price-request">
              
              <PriceRequest color={Color.TERRA_COTTA} />
              <div className="text">{price_request_side_nav_link_text}</div>
            </a> */}
          </Link>
        </li>
        {hasConfigurator && (
          <li>
            <Link href="/before-configurator" passHref>
            <a style={{ fontSize: '16px' }}><div className="text">{configurator_side_nav_link_text}</div></a>
              {/* <a>
                
                <Configurator color={Color.TERRA_COTTA} />
                <div className="text">{configurator_side_nav_link_text}</div>
              </a> */}
            </Link>
          </li>
        )}
        {hasSAV && (
          <li>
            <Link href="/after-sale" passHref>
            <a className="after-sale" ><div className="text">{after_sale_side_nav_link_text}</div></a>
              {/* <a className="after-sale">
                
                <AfterSale color={Color.TERRA_COTTA} />
                <div className="text">{after_sale_side_nav_link_text}</div>
              </a> */}
            </Link>
          </li>
        )}
        <li>
          <Link href="/partnerships" passHref>
          <a className="partnerships"><div className="text">{partnerships_side_nav_link_text}</div></a>
            {/* <a className="partnerships">
              
              <Partnerships color={Color.TERRA_COTTA} />
              <div className="text">{partnerships_side_nav_link_text}</div>
            </a> */}
          </Link>
        </li>
      </ul>
    </div>
  );
}
