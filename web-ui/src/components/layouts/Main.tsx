import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-[35px] flex items-center space-x-4">
            <div className="h-[35px] flex items-center justify-between">
              {email && <p className="text-sm text-gray-600">{email}</p>}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
