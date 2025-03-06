import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import Autosuggest from 'react-autosuggest';
import { TbX } from 'react-icons/tb';

interface SuggestionTextProps {
  isAutoClear?: boolean;
  isMandatory?: boolean;
  storageId?: string;
  label: string;
  placeholder?: string;
  suggestions: string[];
  onSetName?: (name: string) => void;
  onNameSelected: (name: string) => void;
  onFormSubmit?: (value: string) => void; // New prop for form submission behavior
}

const SuggestionText = forwardRef<HTMLInputElement, SuggestionTextProps>(
  (
    {
      isAutoClear,
      isMandatory,
      storageId,
      label,
      placeholder = 'Ketik dan pilih',
      suggestions,
      onSetName,
      onNameSelected,
      onFormSubmit, // Receive the new prop
    },
    ref
  ) => {
    const [name, setName] = useState<string>('');
    const [namesSuggestions, setNamesSuggestions] = useState<string[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      ...inputRef.current!, // Spread all default input properties
      focus: () => inputRef.current?.focus(),
    }));

    const fetchSuggestions = ({ value }: { value: string }) => {
      setNamesSuggestions(
        value.trim()
          ? suggestions.filter((item) =>
              item.toLowerCase().includes(value.trim().toLowerCase())
            )
          : []
      );
    };

    const clearSuggestions = () => setNamesSuggestions([]);

    const handleNameChange = (
      _: React.FormEvent<HTMLElement>,
      { newValue }: { newValue: string }
    ) => {
      if (storageId) localStorage.setItem(storageId, newValue);
      setName(newValue);
      onSetName?.(newValue);
    };

    const handleClear = () => {
      setName('');
      onSetName?.('');
      if (storageId) localStorage.removeItem(storageId);
    };

    const handleSuggestionSelected = (
      _: React.FormEvent<HTMLElement>,
      { suggestion }: { suggestion: string }
    ) => {
      const selectedName = isAutoClear ? '' : suggestion;
      setName(selectedName);
      onSetName?.(suggestion);
      onNameSelected(suggestion);
      clearSuggestions();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent default form submission behavior
      onFormSubmit?.(name); // Invoke the onFormSubmit callback
      if (isAutoClear) handleClear(); // Clear the input if isAutoClear is true
    };

    useEffect(() => {
      if (storageId) {
        const savedName = localStorage.getItem(storageId);
        if (savedName) {
          setName(savedName);
          onSetName?.(savedName);
        }
      }
    }, [storageId, onSetName]);

    return (
      <form onSubmit={handleFormSubmit} className="relative w-full"> {/* Add onSubmit handler */}
        <label className="text-gray-700 flex items-center">
          {label}
          {isMandatory && <span className="ml-1 w-2.5 h-2.5 bg-red-500 rounded-full" />}
        </label>
        <div className="relative">
          <Autosuggest
            suggestions={namesSuggestions}
            onSuggestionsFetchRequested={fetchSuggestions}
            onSuggestionsClearRequested={clearSuggestions}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={(suggestion) => <div>{suggestion}</div>}
            inputProps={{
              placeholder,
              value: name,
              onChange: handleNameChange,
              className: 'text-xs w-full p-2 rounded-lg border focus:border-blue-100',
              required: isMandatory,
              ref: inputRef, // Attach input ref
            }}
            theme={{
              container: 'relative',
              suggestionsContainerOpen: 'absolute z-10 mt-1 w-full bg-white rounded rounded-md shadow-lg',
              suggestion: 'p-2 hover:bg-gray-200 cursor-pointer text-xs',
              suggestionHighlighted: 'bg-gray-300',
              input: 'w-full p-2',
            }}
            onSuggestionSelected={handleSuggestionSelected}
          />
          {name && (
            <span
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              aria-label="Clear"
            >
              <TbX color="gray" />
            </span>
          )}
        </div>
      </form>
    );
  }
);

export default SuggestionText;
