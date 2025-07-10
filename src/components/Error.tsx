interface ErrorProps {
  error: string;
  errorCode: number;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-red-500text-lg">{error}</span>;
    </div>
  );
};
export default Error;
