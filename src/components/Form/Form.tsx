import { useContext, useState } from 'react';
import Spinner from '../Spinner';
import Message from './Message';
import Button from '../Button';
import Card from '../Card/Card';
import { ModalContext } from '../Modal/ModalContext';
import { FormProps, FormStatus } from './types';

function Form(props: FormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string>('');
  const { onClose } = useContext(ModalContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(() => 'submitting');
    try {
      const res = await props.onSubmit(event);
      if (!res) {
        setStatus(() => 'idle');
        return;
      } else if (res.status === 'success') {
        setStatus(() => 'submitted');
        return;
      } else {
        setError(() => res.data.message);
        setStatus(() => 'error');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(() => err.message);
      } else {
        setError(() => 'An unknown error occurred');
      }
      setStatus(() => 'error');
    }
  };

  if (status === 'idle')
    return (
      <form {...props} onSubmit={handleSubmit}>
        {props.children}
      </form>
    );

  if (status === 'submitting') {
    return (
      <form {...props} onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <div className="h-full w-auto items-center">
            <Spinner type={'page'} />
          </div>
        </div>
      </form>
    );
  }

  if (status === 'submitted' || status === 'error') {
    return (
      <form {...props}>
        <Card className="p-3">
          <>
            {status === 'error' && (
              <Message
                type={'failure'}
                title={'משהו השתבש...'}
                subTitle={error}
              />
            )}
            {status === 'submitted' && (
              <Message
                type={'success'}
                title={'נוצר בהצלחה!'}
                subTitle={'המשתמש נוסף לרשימת החיילים של הפלוגה'}
              />
            )}
          </>
          <div className="gap-5 flex justify-center">
            {status === 'error' && (
              <Button
                type="button"
                tabIndex={8}
                onClick={() => setStatus('idle')}
                className=""
              >
                חזרה
              </Button>
            )}
            <Button type="submit" tabIndex={8} onClick={() => onClose()}>
              סגירה
            </Button>
          </div>
        </Card>
      </form>
    );
  }
}

export default Form;
