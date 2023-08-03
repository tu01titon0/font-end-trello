import SideBarHome from "./SideBarHome";
import NavBarHome from "./HeaderPage";
import NavBar from "./Navbar/NavBar";
import { Layout } from "antd";
import { Stack } from "@mui/material";
import SideBar from "../HomePage/SideBar/SideBar";
import BoardDisplay from "../HomePage/BoardDisplay/BoardDisplay";

export default function Home() {
  return (
    <div>
      <Layout
        style={{ minHeight: "100vh", minWidth: "100vw", backgroundColor: "#1d2125" }}
      >
        <Stack direction={"column"}>
          <NavBar />
          <Stack
            direction={"row"}
            style={{
              maxWidth: "1200px",
              minWidth: "1200px",
              margin: "20px auto",
            }}
          >
            <SideBar />
              <BoardDisplay />
          </Stack>
        </Stack>
      </Layout>
    </div>
  );
}
