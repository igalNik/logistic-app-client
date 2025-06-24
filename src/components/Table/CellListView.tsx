import { useState } from 'react';
import Button from '../Button';

function CellListView(props: any) {
  const [showList, setShowList] = useState(false);
  const length = props?.value?.length || 0;

  if (length === 0) {
    return <span>אין מק"טים</span>;
  }

  if (length === 1) {
    return <span>{props?.value[0]}</span>;
  }

  return (
    <>
      <div className="h-6 my-2 z-100 flex w-fit items-center justify-start overflow-visible">
        <Button
          onClick={() => {
            setShowList((prev) => !prev);
          }}
          iconName={showList ? 'ArrowUp' : 'ArrowDown'}
          iconOptions={{ fontSize: '12px' }}
          className="px-2 z-50 h-full w-fit overflow-visible"
        >
          {showList ? 'הסתרה' : 'הצגה'}
        </Button>
      </div>
      {showList && (
        <ul>
          {props?.value.map((item: string) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </>
  );
}
export default CellListView;
