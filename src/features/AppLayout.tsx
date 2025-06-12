import Header from './../components/header/Header';
import { useState } from 'react';
// import BlankPage from '../components/BlankPage';
import SideNav from '../components/sideNav/SideNav';
import { Navigation, Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import BlankPage from '../components/BlankPage';
import IconButton from '../components/IconButton';
import Overlay from '../components/Overlay';
import { useTailwindBreakpoint } from '../hooks/useTailwindBreakpoint';

function AppLayout() {
  const breakPoint = useTailwindBreakpoint();
  const [showSideNav, setShowSideNav] = useState(false);
  const navigation: Navigation = useNavigation();
  const authState = useSelector((state: RootState) => state.auth);

  const isLoading = authState.loading || navigation.state === 'loading';
  const isMobileAndMenuIsClose = breakPoint.isMobile() && !showSideNav;
  return (
    <div
      className={`text-gray-900 text-lg grid h-screen max-h-full w-full max-w-screen overflow-hidden ${showSideNav ? 'grid-cols-[auto_1fr]' : 'grid-cols-[1fr]'} min-w-60 bg-slate-100 md:grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]`}
    >
      <div className={`md:w-full max-w-screen`}>
        <Header>
          <div className="w-fit">
            {isMobileAndMenuIsClose && (
              <IconButton
                iconName={'Menu'}
                onClick={() => {
                  setShowSideNav((showSideNav) => !showSideNav);
                }}
                className="hover:rotate-180"
              />
            )}
          </div>
          <span>לוגיסטיקה מסייעת</span>
        </Header>
      </div>

      <div
        className={` ${!showSideNav ? 'hidden' : ''} md:inline-block row-start-1 row-end-3 block h-full transition-all duration-200`}
      >
        <Overlay isOpen={showSideNav} onClick={() => setShowSideNav(false)}>
          <SideNav expend={!breakPoint.isMobile()} />
        </Overlay>
      </div>
      {/* <div className="md:col-start-2 md:col-end-2 row-start-2 h-full w-full">
        <BlankPage> */}
      <main className="md:p-6 bg-gray-100 row-start-2 mx-auto h-full max-h-full w-full max-w-[1200px] overflow-hidden">
        <BlankPage>
          {isLoading ? <Spinner type="page" /> : <Outlet />}
        </BlankPage>
      </main>

      {/* <div className="col-span-full bg-pink-500"><Footer /></div> */}
    </div>
  );
}

export default AppLayout;
