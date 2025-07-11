interface TableTitleProps {
  title?: string;
  description?: string;
}

function TableTitle({ title, description }: TableTitleProps) {
  return (
    <div className="pr-1 md:flex-row md:items-center md:justify-between mb-2 flex flex-col">
      <div>
        <h2 className="text-2xl font-medium text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default TableTitle;
