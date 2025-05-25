import { HTMLAttributes } from 'react';

function Form(props: HTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{props.children}</form>;
}

export default Form;
