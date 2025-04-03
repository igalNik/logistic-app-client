import Header from './../components/header/Header';
import { useState } from 'react';
// import BlankPage from '../components/BlankPage';
import SideNav from '../components/sideNav/SideNav';
import { Navigation, Outlet, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Spinner from '../components/Spinner';

function AppLayout() {
  const [showSideNav] = useState(false);
  const navigation: Navigation = useNavigation();
  const authState = useSelector((state: RootState) => state.auth);

  const isLoading = authState.loading || navigation.state === 'loading';
  return (
    <div
      className={`grid h-screen max-h-screen max-w-screen ${
        showSideNav ? 'grid-cols-[auto_1fr]' : 'grid-cols-[1fr]'
      } min-w-60 bg-slate-100 md:grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]`}
    >
      <div className={`md: w-full`}>
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

      {/* עדכון ה-main והצאצאים שלו */}
      <main className="p-6 bg-gray-100 row-start-2 mx-auto min-h-[600px] max-w-[1600px] min-w-[800px] flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md min-h-full w-full">
          {isLoading ? <Spinner type="page" /> : <Outlet />}
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
