import { ICellRendererParams } from 'ag-grid-community';
import Button from '../Button';

function CellButton({ data }: ICellRendererParams) {
  console.log(data);

  return (
    <div className="p-1 w-full">
      <Button
        //   onClick={onClick}
        iconName={'Edit'}
        iconOptions={{ fontSize: '12px' }}
        className=""
      />
    </div>
  );
}

export default CellButton;
