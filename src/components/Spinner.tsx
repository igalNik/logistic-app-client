export interface SpinnerProps {
  type: string;
  text?: string;
}

function Spinner({ type, text = '' }: SpinnerProps) {
  switch (type) {
    case 'icon':
      return (
        <div className="border-gray-300 border-t-blue-400 animate-spin h-6 w-6 mx-auto rounded-full border-4"></div>
      );
    case 'page':
      return (
        <div className="h-60 mx-auto flex items-center justify-center">
          <div className="border-gray-300 border-t-blue-400 animate-spin h-30 w-30 absolute mx-auto rounded-full border-8"></div>
          {text && (
            <div className="text-blue-400 font-semibold absolute flex h-full w-full items-center justify-center">
              {text}
            </div>
          )}
        </div>
      );
  }
  return (
    <div className="border-gray-300 border-t-blue-400 animate-spin h-16 mx-auto w-full rounded-full border-4"></div>
  );
}

export default Spinner;
