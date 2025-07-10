import { ICellRendererParams } from 'ag-grid-community';
import Button from '../Button';

function CellButton({ data }: ICellRendererParams) {
  console.log(data);

  return (
    <Button
      //   onClick={onClick}
      iconName={'Edit'}
      iconOptions={{ fontSize: '12px' }}
      className=""
    />
  );
}

export default CellButton;
