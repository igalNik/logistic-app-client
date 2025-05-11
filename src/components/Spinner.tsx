export interface SpinnerProps {
  type: string;
}

function Spinner({ type }: SpinnerProps) {
  switch (type) {
    case 'icon':
      return (
        <div className="border-gray-300 border-t-blue-400 animate-spin h-6 w-6 mx-auto rounded-full border-4"></div>
      );
    case 'page':
      return (
        <div className="border-gray-300 border-t-blue-400 animate-spin h-24 w-24 mx-auto rounded-full border-8"></div>
      );
  }
  return (
    <div className="border-gray-300 border-t-blue-400 animate-spin h-16 mx-auto w-full rounded-full border-4"></div>
  );
}

export default Spinner;
