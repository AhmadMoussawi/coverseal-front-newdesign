import { useCallback } from "react";
import { NoSsr, TextField, MenuItem, makeStyles } from "@material-ui/core";

const terraCotta = "#7b331b";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      fontFamily: "Poppins",
      fontWeight: 300,
      color: terraCotta,
      padding: "12px 10px",
    },
    "& label.Mui-focused": {
      color: terraCotta,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: terraCotta,
    },
    "& .MuiInput-underline:hover::before": {
      borderBottomColor: terraCotta,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: terraCotta,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: terraCotta,
      },
    },
    "& .MuiSelect-icon": {
      color: terraCotta,
    },
  },
});

export default function LanguageSwitcher({
  list,
  currentValue,
  onChange,
}: LanguageSwitcherProps) {
  const classes = useStyles();

  const onOptionClick = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div className="language-switcher">
      <NoSsr>
        <TextField
          className={classes.root}
          select
          fullWidth
          value={currentValue}
          onChange={onOptionClick}
        >
          {list.map(({ code, name }) => (
            <MenuItem key={code} value={code}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </NoSsr>
    </div>
  );
}
