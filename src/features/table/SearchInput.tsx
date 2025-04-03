import Icons from '../../utils/Icons';
import { Suspense, useRef } from 'react';

const { Search } = Icons;

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ onChange }: SearchInputProps) {
  const containerEl = useRef<HTMLDivElement | null>(null);
  const inputEl = useRef<HTMLInputElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof Node &&
      containerEl.current?.contains(event.target)
    ) {
      inputEl.current?.focus();
    }
  };

  return (
    <div
      ref={containerEl}
      onClick={handleClick}
      className="rounded border-header-border-color bg-white text-bg-sidebar-alt flex items-center border-[1px] border-solid focus-within:ring focus-within:outline-none"
    >
      <span className="pr-4">
        <Suspense fallback={null}>
          <Search
            color="inherit"
            style={{ fontSize: '16px', color: 'inherit' }}
          />
        </Suspense>
      </span>
      <input
        tabIndex={0}
        ref={inputEl}
        id="search"
        type="text"
        placeholder="חיפוש"
        className="p-2 flex-1 focus:outline-none"
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;
