import { useEffect, useRef, useState } from 'react';
import { List } from './List';
import { ListItem } from './ListItem';
import { Spinner } from './Spinner';
import { cn } from '@/shared/lib/utils';

interface AutocompleteOptions {
  id: number | string;
  name: string;
}

interface AutocompleteProps<T extends AutocompleteOptions> {
  options?: T[];
  isLoading: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSelect: (item: T) => void;
  placeholder?: string;
  error?: string 
}

export const Autocomplete = <T extends AutocompleteOptions>({
  options = [],
  isLoading = false,
  inputValue,
  onInputChange,
  onSelect,
  placeholder,
  error,
}: AutocompleteProps<T>) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const filtredOptions = options?.filter((option) => {
    const searchInput = inputValue.toLowerCase().trim();
    if (!searchInput) return option;

    const matchesOption = option.name.toLowerCase().includes(searchInput);
    return matchesOption;
  });

  const handleSelect = (item: T) => {
    onSelect(item);
    setIsListOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsListOpen]);

  return (
    <div className="relative w-full">
      <div ref={dropdownRef}>
        <input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            onInputChange(e.target.value);
          }}
          className={cn(
            'input input-bordered w-full mt-2',
            error && 'input-error',
          )}
          type="search"
          onClick={() => setIsListOpen(true)}
          onFocus={() => setIsListOpen(true)}
        />
        {isListOpen && options.length > 0 && (
          <List>
            {filtredOptions?.map((option) => (
              <ListItem key={option.id} onClick={() => handleSelect(option)}>
                {option.name}
              </ListItem>
            ))}
          </List>
        )}
        {isListOpen && isLoading && (
          <List>
            <Spinner />
          </List>
        )}
        {isListOpen && isLoading && options?.length === 0 && (
          <List>
            <div className="p-3 text-center">Ничего не найдена</div>
          </List>
        )}
      </div>
    </div>
  );
};
