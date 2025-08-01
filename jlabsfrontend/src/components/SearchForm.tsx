import React, { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';

type Props = {
  onSearch: (ip: string) => void;
  onClear: () => void;
};

const isValidIP = (ip: string) =>
  /^(?!0)(?!.*\.$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);

const SearchForm = ({ onSearch, onClear }: Props) => {
  const [searchIP, setSearchIP] = useState('');

  const handleSearch = () => {
    if (!isValidIP(searchIP)) {
      alert('Invalid IP');
      return;
    }
    onSearch(searchIP);
    setSearchIP('');
  };

  const handleClear = () => {
    setSearchIP(''); 
    onClear();        
  };


  return (
    <div className="flex gap-2 items-center">
      <TextInput
        type="text"
        placeholder="Enter IP address..."
        value={searchIP}
        onChange={(e) => setSearchIP(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleSearch}>Search</Button>
      <Button color="gray" onClick={handleClear}>Clear</Button>
    </div>
  );
};

export default React.memo(SearchForm);
