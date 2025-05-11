import Header from './../components/header/Header';
import { useState } from 'react';
// import BlankPage from '../components/BlankPage';
import SideNav from '../components/sideNav/SideNav';
import { Navigation, Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import BlankPage from '../components/BlankPage';

function AppLayout() {
  const [showSideNav] = useState(false);
  const navigation: Navigation = useNavigation();
  const authState = useSelector((state: RootState) => state.auth);

  const isLoading = authState.loading || navigation.state === 'loading';

  return (
    <div
      className={`text-gray-900 grid h-screen max-h-screen w-full max-w-[100vw] ${showSideNav ? 'grid-cols-[auto_1fr]' : 'grid-cols-[1fr]'} min-w-60 bg-slate-100 md:grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]`}
    >
      <div className={`md:w-full`}>
        <Header>
          <span>לוגיסטיקה מסייעת</span>
        </Header>
      </div>

      <div
        className={` ${!showSideNav && 'hidden'} md:inline-block row-start-1 row-end-3 block h-full transition-all duration-200`}
      >
        {/* <Overlay isOpen={false} onClick={() => setShowSideNav(false)}> */}
        <SideNav expend={true} />
        {/* </Overlay> */}
      </div>
      {/* <div className="md:col-start-2 md:col-end-2 row-start-2 h-full w-full">
        <BlankPage> */}
      <main className="md:p-6 bg-gray-100 row-start-2 mx-auto h-full min-h-[600px] w-full max-w-[1200px] flex-1">
        <BlankPage>
          {isLoading ? <Spinner type="page" /> : <Outlet />}
        </BlankPage>
      </main>

      {/* <div className="col-span-full bg-pink-500"><Footer /></div> */}
    </div>
  );
}

export default AppLayout;
