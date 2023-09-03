import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { clearUserEmail } from "../../../store/slices/authSlice";
import { RootState } from "../../../store/store";
import axios from "axios";

const LinkUrl = [
  "Home",
  "Floating Transfer",
  "Carrier",
  "Cargo",
  "Cargo Crane",
  "Order",
  "Contact",
];

const pages = [
  "หน้าแรก",
  "ทุ่น",
  "เรือสินค้า",
  "สินค้า",
  "ข้อมูลระหว่างสินค้าเเละเครน",
  "รายการถ่ายโอนสินค้า",
  "ติดต่อเรา",
];

// const pages = [
//   "หน้าแรก",
//   "สถานีโอนสินค้าบนเรือลอย",
//   "ขนส่งสินค้า",
//   "สินค้า",
//   "เครนสินค้า",
//   "คำสั่งซื้อ",
//   "ติดต่อเรา",
// ];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://crane.otpzlab.com:7070/api/logout");
      if (response.data.Message === "Logged out successfully") {
        // Handle successful logout
        dispatch(clearUserEmail())
        navigate("/login");
      } else {
        // Handle failed logout
        console.log("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontSize: 22,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            crane.otpzlab
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  component={Link}
                  to={LinkUrl[index] === "Home" ? "/" : `/${LinkUrl[index].toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link} // Use Link instead of anchor tag
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <MenuItem
                key={page}
                component={Link}
                to={LinkUrl[index] === "Home" ? "/" : `/${LinkUrl[index].toLowerCase()}`}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Toolbar>
              {userEmail ? (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                >
                  Logut
                </Button>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                  <Button
                    color="inherit"
                    sx={{ backgroundColor: "#1565C0", marginLeft: "auto" }}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                </>
              )}
            </Toolbar>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
