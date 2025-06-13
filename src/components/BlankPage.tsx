import { ReactNode } from 'react';

interface BlankPageProps {
  children: ReactNode;
}
function BlankPage({ children }: BlankPageProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-max-[98%] h-full min-h-full w-full">
      {children}
    </div>
  );
}

export default BlankPage;
