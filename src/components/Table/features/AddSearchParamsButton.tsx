import { ICellRendererParams } from 'ag-grid-community';
// import Button from "";
import { useSearchParams } from 'react-router-dom';
import Button from '../../Button';

function AddSearchParamsButton({ data }: ICellRendererParams) {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => setSearchParams({ id: data._id });
  return (
    <div className="p-1 w-10 flex h-full items-center justify-start">
      <Button
        onClick={handleClick}
        iconName={'Edit'}
        iconOptions={{ fontSize: '16px' }}
      />
    </div>
  );
}

export default AddSearchParamsButton;
