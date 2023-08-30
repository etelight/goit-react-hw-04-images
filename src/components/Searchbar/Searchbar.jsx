import { BsSearch } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { notifyInputNotValue } from '../Notify/Notify';

import {
  Header,
  SearchFormButton,
  SearchFormButtonReset,
  SearchFormInput,
  SearchForm,
} from './Searchbar.styled';
import { useState } from 'react';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === '') {
      notifyInputNotValue();
      return;
    }

    onSubmit(query);

    evt.target.reset();
  };

  const handleInputChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size={20} />
        </SearchFormButton>
        <SearchFormInput
          onChange={handleInputChange}
          type="text"
          name="query"
          autoFocus
          placeholder="Search images and photos"
        />
        <SearchFormButtonReset type="reset">
          <FiDelete size={20} />
        </SearchFormButtonReset>
      </SearchForm>
    </Header>
  );
};
