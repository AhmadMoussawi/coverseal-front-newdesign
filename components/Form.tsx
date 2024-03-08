var wildcards  = require('../public/domains.json')
import {
  NoSsr,
  TextField,
  MenuItem,
  makeStyles,
  Checkbox,
  withStyles,
  FormControlLabel,
  InputLabel,
  Box,
  Tooltip,
} from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InputAdornment from "@material-ui/core/InputAdornment";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { Store as store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isEmpty } from "ramda";
import { Loader } from "./Loader";
import { MAIL_REGEXP } from "../utils/constants";
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import {PlacesAutocomplete} from "./PlacesAutocomplete";
import disposable from "@ip1sms/is-disposable-phone-number"
import http from "https";
import { styled } from '@mui/material/styles';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
export const MuiPhoneNumber = dynamic<any>(
  () => import("material-ui-phone-number"),
  {
    ssr: false,
  }
);

const terraCotta = "#7f351b";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: terraCotta,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: terraCotta,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: terraCotta,
      },
    },
  },
});

const CustomCheckbox = withStyles({
  root: {
    color: terraCotta,
    "&$checked": {
      color: terraCotta,
    },
  },
  checked: {},
})(Checkbox);

interface Props {
  color:string | undefined;
  id: "partnerships" | "price_request" | "catalog_request" | "after_sale";
  formsMessages: FormMessagesContent;
  submit_text: string;
  fields: any[];
  content: AfterSaleSectionContent | PriceRequestSectionContent;
  apiPath: string;
  next_btn_title:string;
  setStep:any | undefined;
  showsteps:boolean;
  step_one_title:string;
  step_two_title:string;
  mobile_step_one_title:string;
  mobile_step_two_title:string;
}

export function Form({
  color,
  id,
  formsMessages,
  submit_text,
  fields,
  content,
  apiPath,
  next_btn_title,
  showsteps,
  step_one_title,
  step_two_title,
  mobile_step_one_title,
  mobile_step_two_title
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formstep, setFormStep] = useState(1);
  const generateInitialState = () => {
    return {
      ...fields.reduce((acc, item) => {
        switch (true) {
          case item.type === "file":
            break;

          case item.id === "demand":
            acc.catalog = router.asPath.includes("catalog-request");
            acc.price_request = router.asPath.includes("price-request");
            break;
          default:
            acc[item.id] = router.query[item.id] || item.defaultValue || "";
            break;
        }
        if (item.type === "file") {
          return acc;
        }
        return acc;
      }, {}),
      errors: {},
    };
  };

  const isPriceRequest = fields.find((item) => item.id === "pool_width");

  const [state, setState] = useState(generateInitialState);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [numberOfFilesUploaded, setNumberOfFilesUploaded] = useState(0);
  useEffect(() => {
    setState(generateInitialState);
  }, [fields]);

  const {
    wrong_email,
    wrong_email_confirmation,
    confidentiality_checkbox_label,
    gdpr_checkbox_label,
    wrong_zip
  } = content;
  const pricerequestRF = [
    "first_name",
    "last_name",
    "mail",
    "phone",
    "country",
    "zip_code",
    "language",
  ];
  const aftersaleRF = [
    "first_name",
    "last_name",
    "mail",
    "phone",
    "problem_description",
    "message",
    "language",
    "address",
    "zip_code",
    "city",
    "country",
  ];
  const catalogrequestRF = ["mail", "language","zip_code"];
  const partnershipsRF = ["mail", "language", "country", "type", "zip_code"];
  const classes = useStyles();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      
      e.preventDefault();
      console.log("STATE",state);
      
        
          Object.entries(state).forEach(([fieldName, value]) => {
            setState((prevState) => {
              const { errors } = prevState;
              let match;
          switch (fieldName) {
            case "mail":
              match = value.toString().match(MAIL_REGEXP);
              if (!match) {
                errors[fieldName] = wrong_email;
              } else {
                const address = value.toString().split('@').pop()
                var found = wildcards.indexOf(address)>-1;//.filter(x=>address.includes(x));
  if(found == true)
  {
    errors[fieldName] = wrong_email;
  }
  else{
    delete errors[fieldName];
  }
               
              }
  
              break;
            case "mail_confirmation":
              if (value !== prevState.mail) {
                errors[fieldName] = wrong_email_confirmation;
              } else {
                delete errors[fieldName];
              }
              
              break;
              case "phone":
                if(disposable(value))
                {
                  errors[fieldName] = "Invalid phone number";
                }
                else{
                  delete errors[fieldName];
                }
              
              break;
            default:
              if(id == "price_request")
              {
                for(let i=0;i<pricerequestRF.length;i++)
                {
                  if(fieldName == pricerequestRF[i])
                  {
                    if(value.toString()=="")
                      errors[fieldName] = "This field is required";
                  
                  else{
                    delete errors[fieldName];
                  }
                }
                }
            }
              else if(id == "after_sale")
              {
                for(let i=0;i<aftersaleRF.length;i++)
                {
                  if(fieldName == aftersaleRF[i])
                  {
                    if(value.toString()=="")
                      errors[fieldName] = "This field is required";
                  
                  else{
                    delete errors[fieldName];
                  }
                }
                }
            }
            else if(id == "catalog_request")
              {
                for(let i=0;i<catalogrequestRF.length;i++)
                {
                  if(fieldName == catalogrequestRF[i])
                  {
                    if(value.toString()=="")
                      errors[fieldName] = "This field is required";
                  
                  else{
                    delete errors[fieldName];
                  }
                }
                }
            }
            else if(id == "partnerships")
              {
                for(let i=0;i<partnershipsRF.length;i++)
                {
                  if(fieldName == partnershipsRF[i])
                  {
                    if(value.toString()=="")
                      errors[fieldName] = "This field is required";
                  
                  else{
                    delete errors[fieldName];
                  }
                }
                }
            }
              break;
          }
          return {
            ...prevState,
            errors,
            [fieldName]: value,
          };
        });
        });
        
        
      if (!isEmpty(state.errors)) {
        document
          .querySelector<HTMLInputElement>(`#${Object.keys(state.errors)[0]}`)
          .focus();
          document.getElementById(`${Object.keys(state.errors)[0]}`).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        return;
      }

      const files =
        document.querySelector<HTMLInputElement>("#add_photos") ||
        document.querySelector<HTMLInputElement>("#add_documents");
console.log("FILES",files);
      if (files?.files.length > 3) {
        store.addNotification({
          title: formsMessages.error_title,
          message: "Maximum 3 files allowed",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        return;
      }
      var sizes = 0;
      var filetypes = "image/png|image/jpg|image/jpeg|application/msword|application/vnd.openxmlformats|officedocument.wordprocessingml.document|application/fdf|application/xfdf|application/pdf|model/prc|model/u3d|model/step|application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      var eligiblefiles = true;
      for(var i=0;i<files?.files.length;i++)
      {
        var file = files?.files[i];
        console.log("File Type",file.type);
        sizes += file.size;
        if(!filetypes.includes(file.type))
        {
          eligiblefiles = false;
        }
      }
      if(sizes>31457280)
      {
        store.addNotification({
          title: formsMessages.error_title,
          message: "Maximum 30 MB of files allowed",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        return;
      }
      if(!eligiblefiles)
      {
        store.addNotification({
          title: formsMessages.error_title,
          message: "File formats allowed: PDF / WORD / JPEG / PNG",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        return;
      }
      const postalcode = document.querySelector<HTMLInputElement>("#zip_code").value;
      //const countryval = document.querySelector<HTMLInputElement>("#country").value;
      //console.log("COUNTRY",Object.entries(state));
      var validpostalcode = true;
      const data = (() => {
        const formData = new FormData(e.currentTarget);
        Object.entries(state).forEach(([key, value]) => {
          if (key === "errors") {
            return;
          }
          var regex = new RegExp("\"", 'g');
          value = value.toString().replace(regex,"")
          if(key === "country")
          {
            var cval = value.toString().split('/');
            if(cval.length>1 && (cval[0]=='FR' || cval[0]=='BE'))
            {
            if(postcodeValidatorExistsForCountry(cval[0]))
            {
                if(!postcodeValidator(postalcode, cval[0]))
                validpostalcode = false;
            }
            }
          }
          formData.append(key, value as string);
        });
        formData.append("language", router.locale);
        if (isPriceRequest) {
          formData.append(
            "catalog",
            document.querySelector<HTMLInputElement>("#catalog")!.checked
              ? "true"
              : "false"
          );
        }
        console.log("RENDERED FORMDATA", formData);
        return formData;
      })();

      setIsLoading(true);
      if(validpostalcode && isEmpty(state.errors))
      {
        document.querySelector<HTMLSpanElement>("#zip_code_validation").innerText = '';
        console.log("Time to fetch", data);
        
      fetch(apiPath, {
        method: "POST",
        body: data,
      })
        .then(async(res) => {
          
          console.log("RESPONSE",res);
          window.dataLayer.push({
            'data':state,
            'event': id
          });
          if (!res.ok) {
            if (!isEmpty(state.errors)) {
              document
                .querySelector<HTMLInputElement>(`#${Object.keys(state.errors)[0]}`)
                .focus();
                document.getElementById(`${Object.keys(state.errors)[0]}`).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }
            var data = await res.json();
            let err: any;
            if (res.status === 413) {
              err = { status: "failed", code: 413 };
            } else if (res.status === 500) {
              err = { status: "failed", code: 500, data:data };
            } else if (res.status === 400) {
              err = { status: "failed", code: 400 };
            }
            throw err;
          }
          
          
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          setIsFormSuccess(true);
        })
        .catch((res) => {
          console.log("REAL ERROR", res);
          setIsLoading(false);

          const notification = (() => {
            switch (res?.code) {
              case 413:
                return {
                  title: formsMessages.error_title,
                  message: "Request exceed the 20MB limit.",
                };
              default:
                return {
                  title: formsMessages.error_title,
                  message: formsMessages.error_content,
                };
            }
          })();
          store.addNotification({
            ...notification,
            type: "danger",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        });
      }
      else{
        try{
        document.querySelector<HTMLSpanElement>("#zip_code_validation").innerText = wrong_zip;
        document.getElementById("zip_code").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
        catch{

        }
        setIsLoading(false);
      }
    },
    [state, fields, router]
  );

  const handleChange = useCallback(
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value =
        fieldName === "phone"
          ? (e as string)
          : (e as React.ChangeEvent<HTMLInputElement>).target.value;
      if (fieldName !== "phone") {
        (e as React.ChangeEvent<HTMLInputElement>).persist();
      }

      setState((prevState) => {
        const { errors } = prevState;
        let match;

        switch (fieldName) {
          case "mail":
            match = value.match(MAIL_REGEXP);
            if (!match) {
              errors[fieldName] = wrong_email;
            } else {
              const address = value.split('@').pop()
              var found = wildcards.indexOf(address)>-1;//.filter(x=>address.includes(x));
if(found == true)
{
  errors[fieldName] = wrong_email;
}
else{
  delete errors[fieldName];
}
              /*const options = {
                method: 'GET',
                hostname: 'mailcheck.p.rapidapi.com',
                port: null,
                path: '/?domain=' + value,
                headers: {
                  'X-RapidAPI-Key': '49e87743c0msh3d9cd9882d9ec6bp1051cfjsn917f74361e6b',
                  'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
                }
              };
const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
    var data = JSON.parse(body.toString());
    if(data.block || data.disposable)
    {
      errors[fieldName] = wrong_email;
    }
    else{
      delete errors[fieldName];
    }
		console.log(body.toString());
	});
});

req.end();*/

                
            }

            break;
          // case "phone":
          //   match = value.match(PHONE_REGEXP);
          //   console.log(match);
          //   if (!match) {
          //     errors[fieldName] = wrong_phone;
          //   } else {
          //     delete errors[fieldName];
          //   }
          //   break;
          case "mail_confirmation":
            if (value !== prevState.mail) {
              errors[fieldName] = wrong_email_confirmation;
            } else {
              delete errors[fieldName];
            }
            
            break;
            case "phone":
              if(disposable(value))
              {
                errors[fieldName] = "Invalid phone number";
              }
              else{
                delete errors[fieldName];
              }
            
            break;
          default:
            break;
        }
        return {
          ...prevState,
          errors,
          [fieldName]: value,
        };
      });
    },
    [wrong_email, wrong_email_confirmation]
  );

  const handleChangeCheckbox = useCallback(
    (event: any) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    },
    [state]
  );
const handlePlaceChange = (postalcode)=>{
  
}
  const handleFilesUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNumberOfFilesUploaded(event.target.files.length);
    },
    [state]
  );
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    border:"1px solid var(--color-terra-cotta)",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "transparent",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 0,
      backgroundColor: "var(--color-terra-cotta)",
    },
  }));
  const inputs = useMemo(
    () =>
      fields.map(
        ({ id, type, textarea, required, options, select, rows, maxRows, help, additionalstyle, step, hastooltip }) => {
          let field;
          const label = content[`${id}_label`];
          var tooltip = "";
          if(hastooltip)
          {
            tooltip = content[`${id}_tooltip`];
          }
          var showfield = (!step || !formstep) || (step == formstep);
          switch (true) {
            case type === "places":
              field = (
                <NoSsr>
                  {hastooltip && <Tooltip title={tooltip}>
        <InputLabel htmlFor="my-textfield">{label} <InfoOutlinedIcon /></InputLabel>
      </Tooltip>}
                  <PlacesAutocomplete
                  onChange={(postalcode,country, address, city)=>{
                    setState({ ...state, ["zip_code"]: postalcode, ["country"]: country, ["address"]:address, ["city"]:city });
                    
                    //
                  }}
                  name={id}
                  label={!hastooltip && label}
                    /*className={classes.root}
                    label={label}
                    fullWidth
                    multiline={textarea}
                    required={required}
                    id={id}
                    type={type}
                    select={select}
                    minRows={rows}
                    maxRows={maxRows}
                    value={state[id]}
                    onChange={handleChange(id) as any}
                    error={Boolean(state.errors[id])}
                    helperText={help || state.errors[id]}*/
                  />
                    
                </NoSsr>
              );
              break;
            case type === "tel":
              field = (
                <NoSsr>
                  {hastooltip && <Tooltip title={tooltip}>
        <InputLabel htmlFor="my-textfield">{label} <InfoOutlinedIcon /></InputLabel>
      </Tooltip>}
                  <MuiPhoneNumber
                    defaultCountry={(() => {
                      const parts = router.locale.split("-");
                      if (parts[1]) {
                        if(parts[1]!="WORLD" && parts[1]!="SOUTHAMERICA")
                          return parts[1].toLowerCase();
                        else
                        return "us";
                      }
                      return router.locale.toLowerCase();
                    })()}
                    className={classes.root}
                    label={!hastooltip && label}
                    fullWidth
                    /*required={required}*/
                    id={id}
                    type={type}
                    value={state[id]}
                    onChange={handleChange(id)}
                    /*onFocus={(e)=>{e.target.scrollIntoView()}}*/
                    autoFormat={false}
                    // error={Boolean(state.errors[id])}
                    // helperText={state.errors[id]}
                  />
                  {state.errors[id] && <span style={{color:"red"}}>{state.errors[id]}</span>}
                </NoSsr>
              );
              break;
            case type === "file":
              field = (
                <div >
                  
                  <InputLabel htmlFor={id}>
                    <input
                      name={id}
                      id={id}
                      /*required={required}*/
                      className={color?("input input--" + color):"input input--anthracite"}
                      type="file"
                      multiple
                      hidden
                      onChange={handleFilesUpload}
                      onFocus={(e)=>{e.target.scrollIntoView()}}
                      style={{ display: "none" }}
                    />
                    <p className={color?("link-before-translate link-before-translate--" + color):"link-before-translate link-before-translate--anthracite"}>
                      {label}
                    </p>
                    {numberOfFilesUploaded}
                    <InsertDriveFileIcon />
                  </InputLabel>
                  <div className="border-bottom" />
                </div>
              );
              break;
            default:
              const extraProps = (() => {
                if (id === "pool_width" || id === "pool_length") {
                  return {
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    },
                  };
                }
                return {};
              })();
              field = (
                <NoSsr>
                  {hastooltip && 
        <InputLabel htmlFor="my-textfield">{required ? <>{label}<sup>*</sup></>:<>{label}</>} <Tooltip title={tooltip}><InfoOutlinedIcon /></Tooltip></InputLabel>
      }
                  <TextField
                    className={classes.root}
                    label={!hastooltip && (required ? <>{ label}<sup>*</sup></>:<>{label}</>)}
                    fullWidth
                    
                    multiline={textarea}
                    /*required={required}*/
                    id={id}
                    type={type}
                    InputLabelProps={{shrink:true}}
                    select={select}
                    minRows={rows}
                    maxRows={maxRows}
                    value={state[id] || ''}
                    onChange={handleChange(id) as any}
                    error={Boolean(state.errors[id])}
                    helperText={help || state.errors[id]}
                    {...extraProps}
                  >
                    {options &&
                      options.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                          {label} 
                        </MenuItem>
                      ))}
                  </TextField>
                </NoSsr>
              );
              break;
            }
          return (
            showfield && <div
              key={id}
              className={classNames({
                "field-group": true,
                "demand-field": id === "demand",
              })}
              data-field={id} style={additionalstyle?additionalstyle:{}}
            >
              {field}
            </div>
          );
        }
      ),
    [state, fields, numberOfFilesUploaded, router.locale, formstep]
  );

  if (isFormSuccess) {
    const href = (() => {
      switch (id) {
        case "catalog_request":
          return {
            pathname: "/price-request",
            query: state,
          };
        case "price_request":
        case "after_sale":
          return "https://www.facebook.com/CoversealOfficial";
        case "partnerships":
          return "https://www.linkedin.com/company/coverseal/";
      }
    })();

    return (
      <div className="success-form">
        <h3 className={color?("subtitle-argesta subtitle-argesta--" + color):"subtitle-argesta subtitle-argesta--anthracite"}>
          {formsMessages[`${id}_success_title`]}
        </h3>
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{
            __html: formsMessages[`${id}_success_paragraph`],
          }}
        />
        <Link href={href} passHref>
          <a
            className={color?("link-before-translate link-before-translate--" + color):"link-before-translate link-before-translate--anthracite"}
            target={id === "catalog_request" ? undefined : "_blank"}
          >
            {formsMessages[`${id}_success_cta`]}
          </a>
        </Link>
      </div>
    );
  }
  
  return (
    <>
    {showsteps && <Box style={{ width: '100%' }}>
    <br />
    <table style={{width:"100%", color:"var(--color-terra-cotta)"}}><tr><td style={{textAlign:"center", cursor:"pointer"}} onClick={()=>{setFormStep(1)}}><span className="desktopsteptitle">{step_one_title}</span><span className="mobilesteptitle">{mobile_step_one_title}</span></td><td onClick={()=>{setFormStep(2)}} style={{textAlign:"center", cursor:"pointer"}}><span className="desktopsteptitle">{step_two_title}</span><span className="mobilesteptitle">{mobile_step_two_title}</span></td></tr></table>
    <BorderLinearProgress variant="determinate" value={formstep==1?50:100} />
  </Box>}
    <form onSubmit={handleSubmit}>
      {isPriceRequest && (
        <NoSsr>
          <div className="catalog-container">
            <FormControlLabel
              className="legal-checkbox"
              control={<CustomCheckbox id="catalog" defaultChecked />}
              label={
                (content as PriceRequestSectionContent).catalog_checkbox_label
              }
            />
          </div>
        </NoSsr>
      )}
      <div className="fields">{inputs}</div>
      <div className="legal-container">
        <NoSsr>
          <FormControlLabel
            className="legal-checkbox"
            control={<CustomCheckbox required />}
            label={confidentiality_checkbox_label}
          />
          <FormControlLabel
            className="legal-checkbox"
            control={<CustomCheckbox required />}
            label={gdpr_checkbox_label}
          />
        </NoSsr>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        (!showsteps || (!formstep || formstep == 2)?  <button
          className={color?("link-before-translate link-before-translate--"+color+" submit"):"link-before-translate link-before-translate--anthracite submit"}
          type="submit"
        >
          {submit_text}
        </button>:<a style={{cursor:"pointer"}}
          className={color?("link-before-translate link-before-translate--"+color+" submit"):"link-before-translate link-before-translate--anthracite submit"}
          onClick={()=>{setFormStep(2);}}
        >
          {next_btn_title}
        </a>)
      )}
    </form>
    </>
  );
}
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}