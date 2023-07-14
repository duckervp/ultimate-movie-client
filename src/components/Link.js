import MUILink from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";

const Link = ({ to, noWrap, variant, color, children, sx }) => {
  return (
    <MUILink
      component={RouterLink}
      to={to}
      color={color}
      noWrap={noWrap}
      variant={variant}
      sx={sx}>
      {children}
    </MUILink>
  );
}

export default Link;