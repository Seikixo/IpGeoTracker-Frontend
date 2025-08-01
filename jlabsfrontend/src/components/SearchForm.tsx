import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

type Props = {
  onSearch: (ip: string) => void;
  onClear: () => void;
};

const isValidIP = (ip: string) =>
  /^(?!0)(?!.*\.$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);

const SearchForm = ({ onSearch, onClear }: Props) => {
  const [searchIP, setSearchIP] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!isValidIP(searchIP)) {
      setError('Invalid IP Address');
      return;
    }
    onSearch(searchIP);
    setSearchIP('');
  };

  const handleClear = () => {
    setSearchIP(''); 
    onClear();
    setError('');        
  };


  return (
    <div className="flex gap-2 items-start flex-col w-full">
      <div className='flex'>
        <TextInput
          type="text"
          placeholder="Enter IP address..."
          value={searchIP}
          onChange={(e) => setSearchIP(e.target.value)}
          className="w-full mr-2"
        />
        <Button onClick={handleSearch} className='mr-1'>Search</Button>
        <Button color="gray" onClick={handleClear}>Clear</Button>
      </div>
      <div className='flex w-full'>
        {error && (
          <Alert className='flex w-full' color="failure" icon={HiInformationCircle}>
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchForm);
