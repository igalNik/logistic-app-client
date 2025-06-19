import { useState } from 'react';
import Button from '../Button';

function CellListView(props: any) {
  const [showList, setShowList] = useState(false);
  return props?.value?.length ? (
    <>
      <div className="h-6 my-2 z-100 mx-auto flex w-fit items-center justify-start overflow-visible">
        <Button
          onClick={() => {
            setShowList((prev) => !prev);
          }}
          iconName={showList ? 'ArrowUp' : 'ArrowDown'}
          iconOptions={{ fontSize: '12px' }}
          className="mr-1 px-2 z-50 h-full w-fit"
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
  ) : (
    <span>אין מק"טים</span>
  );
}
export default CellListView;
