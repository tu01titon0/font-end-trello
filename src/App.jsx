import MenuAppBar from './components/Layout.jsx';
import SideBar from './components/Sidebar.jsx';
import './App.css';
import { Layout } from 'antd';

function App() {
  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <MenuAppBar />
      <SideBar />
      <h1> ngu ngu ngu </h1>
    </Layout>
  );
}

export default App;
