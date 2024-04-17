import InfoIcon from "@material-ui/icons/Info";
import Popover from "@material-ui/core/Popover";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useRef } from "react";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: 300,
  },
}));

interface Props {
  name: string;
  popoverText: string;
}

export function OptionItem({ name, popoverText }: Props) {
  const classes = useStyles();
  const popoverContainer = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <li>
      <div className="option-container" ref={popoverContainer}>
        {name}
        <NoSsr>
          <Popover
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            container={popoverContainer.current}
          >
            <p>{popoverText}</p>
          </Popover>
          <InfoIcon
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            style={{ position: "absolute", marginLeft:"5px" }}
            htmlColor="#FFF"
          />
        </NoSsr>
      </div>
    </li>
  );
}
