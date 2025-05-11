import { HTMLAttributes, ReactNode } from 'react';

import { mergeClasses } from '../../utils/tailwind.util';

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function CardBody({ children, ...props }: CardBodyProps) {
  return (
    <div {...props} className={mergeClasses('px-3', props.className)}>
      {children}
    </div>
  );
}

export default CardBody;
