import SideBarHome from "./SideBarHome";
import NavBarHome from "./HeaderPage";
import NavBar from "./Navbar/NavBar";
import { Layout } from "antd";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";

export default function Home() {
  return (
    <div>
      <Layout
        style={{ height: "100vh", width: "100vw", backgroundColor: "#1d2125" }}
      >
        <Stack direction={"column"}>
          <NavBar />
          <Stack
            direction={"row"}
            style={{ maxWidth: "1200px", margin: "20px auto" }}
          >
            <SideBar />
            <Stack>
              <h1 style={{ width: "100vw" }}>Ok ok ok</h1>
            </Stack>
          </Stack>
        </Stack>
      </Layout>
    </div>
  );
}
