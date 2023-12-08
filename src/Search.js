import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Box } from '@mui/material';
import { SearchSeries } from './service';
import { GetUser } from './cache';
import SeriesInfo from './SeriesInfo';
import SeriesList from './SeriesList';
import SearchBar from './SearchBar';

const Search = () => {
  const { searchTerm } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null);
  const [user, setUser] = useState(null);
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    setUser(GetUser)
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      const results = await SearchSeries(searchTerm);
      setSeriesList(results);
    };

    performSearch();
  }, [searchTerm]);

  const handleSeriesClick = (seriesItem) => {
    setCurrentSeries(seriesItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSeries(null);
  };

  return (
    <div style={{ height: '92vh', overflowY: 'auto', backgroundColor: '#111', color: 'white' }}>

      <SearchBar />

      <h3 style={{ fontWeight: 'bold', marginLeft: '10px' }}>Search Results</h3>
      <SeriesList seriesList={seriesList} handleSeriesClick={handleSeriesClick} />

      <div style={{ height: '8vh' }}></div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 210,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: '#111',
          border: '1px solid #a70',
          borderRadius: '10px',
          color: 'white',
          boxShadow: 24,
          p: 4
        }}>
          <div id="modal-modal-description">
            <SeriesInfo user={user} series={currentSeries} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Search;
