import { HTMLAttributes, ReactNode } from 'react';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  headerTitle?: string;
  headerSubTitle?: string;
  children: ReactNode;
}

function Card({ headerTitle, headerSubTitle, children, ...props }: CardProps) {
  return (
    <div className="mb-4" dir="rtl">
      {(headerTitle || headerSubTitle) && (
        <CardHeader
          title={headerTitle}
          subtitle={headerSubTitle}
          className="p-3 text-gray-100"
        />
      )}
      <CardBody className={props.className}>{children}</CardBody>
    </div>
  );
}

export default Card;
