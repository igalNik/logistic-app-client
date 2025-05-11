import { HTMLAttributes, ReactNode } from 'react';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  headerTitle: string;
  headerSubTitle: string;
  children: ReactNode;
}

function Card({ headerTitle, headerSubTitle, children }: CardProps) {
  return (
    <div className="mb-10" dir="rtl">
      {headerTitle && (
        <CardHeader
          title={headerTitle}
          subtitle={headerSubTitle}
          className="p-3 text-gray-100"
        />
      )}
      <CardBody
        onSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        {children}
      </CardBody>
    </div>
  );
}

export default Card;
