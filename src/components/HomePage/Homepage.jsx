import SideBarHome from './SideBarHome';
import NavBarHome from './HeaderPage';
import { Layout } from 'antd';
import { Stack } from '@mui/material';
export default function Home() {
  return (
    <div>
      <Layout style={{ minHeight: '105vh', width: '400vh' }}>
        <NavBarHome />
        <Stack direction={'row'} gap={20}>
          <SideBarHome />
          <h1>ngu ngu</h1>
        </Stack>
      </Layout>
    </div>
  );
}
