import SideBarHome from "./SideBarHome";
import NavBarHome from "./HeaderPage";
import { Layout } from "antd";
import { Stack } from "@mui/material";
export default function Home() {
  return (
    <div>
      <Layout style={{ height: "100vh", width: "100%" }}>
        <Stack direction={"column"}>
          <NavBarHome />
          <Stack direction={'row'}>
            <SideBarHome />
            <h1>ngu ngu</h1>
          </Stack>
        </Stack>
      </Layout>
    </div>
  );
}
