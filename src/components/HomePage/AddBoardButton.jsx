import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Stack, Typography } from "@mui/material";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            style={{ height: "30px", alignItems: 'center' }}
            variant="outlined"
            {...bindTrigger(popupState)}
          >
            Tạo mới
          </Button>
          <Menu {...bindMenu(popupState)} style={{ marginTop: "20px" }}>
            <MenuItem onClick={popupState.close}>
              <Stack flexWrap={"wrap"} style={{ maxWidth: "300px" }}>
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  gap={"6px"}
                  mb={"5px"}
                >
                  <DashboardCustomizeOutlinedIcon
                    style={{ fontSize: "18px" }}
                  />
                  Create Board
                </Stack>
                <p style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
                  A board is made up of cards ordered on lists. Use it to manage
                  projects, track information, or organize anything.
                </p>
              </Stack>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Stack flexWrap={"wrap"} style={{ maxWidth: "300px" }}>
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  gap={"6px"}
                  mb={"5px"}
                >
                  <BackupTableOutlinedIcon style={{ fontSize: "18px" }} />
                  Start with a template
                </Stack>
                <p style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
                  Get started faster with a board template.
                </p>
              </Stack>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Stack flexWrap={"wrap"} style={{ maxWidth: "300px" }}>
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  gap={"6px"}
                  mb={"5px"}
                >
                  <PeopleAltOutlinedIcon style={{ fontSize: "18px" }} />
                  Create Workspace
                </Stack>
                <p style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
                  A Workspace is a group of boards and people. Use it to
                  organize your company, side hustle, family, or friends.
                </p>
              </Stack>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
