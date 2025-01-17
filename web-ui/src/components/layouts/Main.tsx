import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { name, email } = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Task Manager</h1>
            {email && <p className="text-sm text-gray-600">{email}</p>}
            {name && <p className="text-sm text-gray-600">{name}</p>}
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
