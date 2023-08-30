import { ToastContainer } from 'react-toastify';
import { notifyInputNotImg } from '../Notify/Notify';
import { Wrapper } from './App.styled';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { fetchImages } from '../API';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { LoaderBonus } from 'components/Loader/LoaderBonus';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingBonus, setLoadingBonus] = useState(false);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const loadImages = async () => {
    setLoading(true);
    setLoadingBonus(false);

    const correctQuery = query.split('/')[1];

    const foundImages = await fetchImages({ correctQuery, page });
    if (foundImages.length < 1) {
      notifyInputNotImg();
      setLoading(false);
      setLoadingBonus(true);
    } else {
      setImages(prev => [...prev, ...foundImages]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoadingBonus(true);
  }, []);

  useEffect(() => {
    if (query === '') return;

    loadImages();
  }, [query, page]);

  function handleLoadMore() {
    setPage(page + 1);
  }

  return (
    <Wrapper>
      <SearchBar onSubmit={changeQuery} />

      {loading ? (
        <Loader loaderColor="#3f51b5" />
      ) : (
        <ImageGallery images={images} />
      )}
      {loadingBonus && <LoaderBonus loaderColor="red" />}
      {images.length >= 12 && <LoadMore onClick={handleLoadMore} />}
      <ToastContainer />
    </Wrapper>
  );
};
