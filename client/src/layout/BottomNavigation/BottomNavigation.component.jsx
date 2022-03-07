import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BarChartIcon from "@mui/icons-material/BarChart";
import Ballot from "@mui/icons-material/Ballot";
import BugReportIcon from "@mui/icons-material/BugReport";

import OptionsMenu from "./SettingsMenu.component";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(null);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Risultati" icon={<BarChartIcon />} />
        <BottomNavigationAction label="Nuovo quiz" icon={<Ballot />} />
        <BottomNavigationAction
          label="Riporta un bug"
          icon={<BugReportIcon />}
        />
        <OptionsMenu />
      </BottomNavigation>
    </Box>
  );
}
