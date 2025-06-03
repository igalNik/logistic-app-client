interface MessageProps {
  type: 'success' | 'failure';
  title: string;
  subTitle: string;
}

const messageConfig = {
  success: {
    color: 'text-green-500',
    image: 'app-launch-green',
  },
  failure: {
    color: 'text-red-600',
    image: 'crashed-error-red',
  },
} as const;

function Message({ type, title, subTitle }: MessageProps) {
  const { color, image } = messageConfig[type];
  return (
    <div className={`${color} flex flex-col items-center justify-center`}>
      <img
        src={`public/illustrations/${image}.svg`}
        alt="Page Not Found"
        className="max-w-md h-60 w-auto"
      />

      <span className="text-4xl font-bold h-auto">{title}</span>
      <span className="mb-4">{subTitle}</span>
    </div>
  );
}

export default Message;
