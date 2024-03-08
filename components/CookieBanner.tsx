import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Button, Snackbar, Typography, Alert, useTheme } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const CookieBanner = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const getCookie = (key) => {
    return Cookies.get(key);
  };
  useEffect(() => {
    const hasUserAcceptedCookies = getCookie('AnalyticalConsent') || getCookie('TargetingConsent');
    if (!hasUserAcceptedCookies) {
      setOpen(true);
    }
    const handleRouteChange = () => {
      if (!hasUserAcceptedCookies) {
        setOpen(true);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup event listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handleRejectAll = () => {
    props.setAcceptAll('rejected')
    // Handle the rejection logic and save it in localStorage
    
    setOpen(false);
  };

  const handleOpenSettings = () => {
    props.setOpenSettingsModal(true);
  };

  const handleCloseSettings = () => {
    props.setOpenSettingsModal(false);
  };

  const handleAcceptAll = () => {
    props.setAcceptAll('accepted')
    // Handle the acceptance logic and save it in localStorage
    //localStorage.setItem('cookiesAccepted', 'accepted');
    setOpen(false);
  };

  const handleCreateCookies = () => {
    // Your logic to create cookies goes here
    // Example: document.cookie = "user_preference=my_custom_cookie; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";
    setOpen(false); // Close the banner or perform any other necessary actions
  };
  return (
    <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  /*  sx={{
      backgroundColor: '#8B4513', // Brown background color
      color: 'white', // White text color
      borderRadius: '8px', // Add rounded corners
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0)', // Add a subtle box shadow
    }}
    */
      sx={{ width: '100%',zIndex:"9999", left:"0px", right:"0px",[theme.breakpoints.up('md')]: {width:"60%", left:"unset"},[theme.breakpoints.up('lg')]: {width:"50%", left:"unset"},[theme.breakpoints.up('xl')]: {width:"40%", left:"unset"} }}
      autoHideDuration={null} 
      
      open={open}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        else
          setOpen(false)
      }}
    >

<Alert
  onClose={() => {
    setOpen(false);
  }}
  severity="" // Set the appropriate severity level
  style={{ backgroundColor: "#723722", width: "100%", color: "white"}}
  //color="white"
>
  {/* Your alert content goes here */}
{/* </Alert>
      <Alert onClose={() => {
        
          setOpen(false)
      }} severity="" style={{backgroundColor:"#723722", width:"100%"}}     > */}

      <Typography variant="h6" style={{ fontWeight: 'bold', fontStyle: 'italic', marginBottom: '10px', backgroundColor:"#723722", color: 'white' , textAlign: 'center' , fontFamily : 'argesta_hairlineRgIt'}}>
      {props.cookies_banner_title}
        </Typography>
        <Typography style={{ color: 'white', margin: '0 auto', textAlign: 'center' }}>
        {props.cookies_banner_text}
        {/*<Link href="/cookies-policy" style={{textDecoration:"underline", color:"rgb(5,99,193)" , textAlign: "center"}}>{props.banner_cookies_policy_link_text}</Link>*/}

        </Typography>
      {/*  <div style={{width:"100%", marginTop:"20px"}}>
        <Button onClick={handleOpenSettings} style={{border:"1px solid #723722", padding:"5px 10px",textTransform:"none", color:"#723722", borderRadius:"5px", float:"left"}} sx={{fontSize:"11px",[theme.breakpoints.up('md')]: {fontSize:"13px"}}}>
          {props.personalize_settings_btn}
        </Button>
        <div style={{float:"right"}}>
        <Button onClick={handleRejectAll} style={{border:"1px solid #723722", padding:"5px 10px", color:"#723722", borderRadius:"5px", textTransform:"none"}}  sx={{fontSize:"11px",[theme.breakpoints.up('md')]: {fontSize:"13px"}}}>
          {props.rejectall_btn}
        </Button>
    */} <div style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
        <Button onClick={handleOpenSettings} style={{ border: "1px solid #723722", padding: "5px 10px", textTransform: "none", color:"#723722", backgroundColor:"white", borderRadius: "0px", marginLeft: "10px", width: "180px" }} sx={{ fontSize: "11px", [theme.breakpoints.up('md')]: { fontSize: "13px" } }}>
        {props.personalize_settings_btn}
        </Button>
        <Button onClick={handleAcceptAll} style={{border:"1px solid #723722", padding:"5px 10px",textTransform:"none", color:"#723722", backgroundColor:"white", borderRadius:"0px", marginLeft:"10px" , width: "180px"}}  sx={{fontSize:"11px",[theme.breakpoints.up('md')]: {fontSize:"13px"}}}>
          {props.acceptall_btn}
        </Button>
        </div>
      {/*  </div>
        
  </div>*/}
      </Alert>
    </Snackbar>
  );
};

export default CookieBanner;