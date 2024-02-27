import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getZipCode,
    getDetails
  } from "use-places-autocomplete";
  import type { NextPage } from "next";
  import useOnclickOutside from "react-cool-onclickoutside";
import { MenuItem, NoSsr, TextField, makeStyles } from "@material-ui/core";
  
  export const PlacesAutocomplete: NextPage<{ onChange: (postalcode,country, address, city) => void, label:string, name:string }> = ({onChange, label, name}) => {
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
    const classes = useStyles();
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      //callbackName: "YOUR_CALLBACK_NAME",
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
  
    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  
    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
  
        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
            
          const { lat, lng } = getLatLng(results[0]);
          const postalcode = getZipCode(results[0],false);
          var addresses = results[0].address_components;
          var country = "";
          var city = "";
          var address = description;
          for(let i=0;i<addresses.length;i++)
          {
            if(addresses[i].types.filter(x=>x=="country").length>0)
            {
                country = addresses[i].short_name + "/" + addresses[i].long_name;
            }
            if(addresses[i].types.filter(x=>x=="locality").length>0)
            {
                city = addresses[i].long_name;
            }
          }
          onChange(postalcode, country, address, city);
          console.log("📍 Coordinates: ", { lat, lng,postalcode });
          console.log("📍 ALL: ", results[0]);
        });
      };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)} style={{padding:"5px", border:"1px solid lightgray", cursor:"pointer"}}>
            <span style={{fontWeight:"700"}}>{main_text}</span> <small>{secondary_text}</small>
          </li>
        );
      });
  
    return (
      <div ref={ref}>
        
                  <TextField
                  id={name}
                  name={name}
                    className={classes.root}
                    label={label}
                    fullWidth
                    type={"text"}
                    onChange={handleInput}
                    value={value}
                  >
                    {status === "OK" &&
                      data.map((suggestion) => (
                        <MenuItem key={suggestion.place_id} onClick={handleSelect(suggestion)}>
                          <strong>{suggestion.structured_formatting.main_text}</strong> <small>{suggestion.structured_formatting.secondary_text}</small>
                        </MenuItem>
                      ))}
                    
                    
                  </TextField>
        
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
  };