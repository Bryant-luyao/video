import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import './assets/styles/tailwindcss.css'
import Layout from './layout';
import Home from './Home';
import Player from './Player';
import Profile from './Profile';
import Help from './help/Help';
import TermsofService from './help/components/TermsofService';
import PrivacyPolicy from './help/components/PrivacyPolicy';
import Favorites from './Favorites';
import History from './History';
import Recommend from './Recommend';
import Video from "./video";
import Search from "./Search";
import NewSeries from "./NewSeries";
// import Menu from "./Menu";
import Store from './Store/Store';

import './assets/styles/common.css'
import Referral from './Referral';

const UserContext = createContext();

function PlayerWrapper() {
  let { seriesId = 0, episode = 0 } = useParams();
  return <Player seriesId={seriesId} episode={episode} />;
}

function SearchWrapper() {
  let { searchTerm = "" } = useParams();
  return <Search searchTerm={searchTerm} />;
}

function SeriesWrapper() {
  let { seriesId = 0 } = useParams();
  return <NewSeries seriesId={seriesId} />;
}

function ReferralWrapper() {
  let { referralId = 0 } = useParams();
  return <Referral referralId={referralId} />;
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div style={{ fontFamily: 'Poppins', backgroundColor: '#111', color: 'white', height: '100%' }}>
          <Routes>
            <Route path="/" element={<Layout/>} >
              <Route path="/" element={<Navigate to='/home' />} />
              <Route path="/home" element={<Home />} />
              <Route path="/recommend" element={<Recommend />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/player/:seriesId/:episode" element={<PlayerWrapper />} />
            <Route path="/player/:seriesId" element={<PlayerWrapper />} />
            <Route path="/player" element={<PlayerWrapper />} />
            <Route path="/help" element={<Help />} />
            <Route path="/termsofService" element={<TermsofService />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/video" element={<Video />} />
            <Route path="/search/:searchTerm" element={<SearchWrapper />} />
            <Route path="/search" element={<SearchWrapper />} />
            <Route path="/series/:seriesId" element={<SeriesWrapper />} />
            <Route path="/store" element={<Store />} />
            <Route path="/referral/:referralId" element={<ReferralWrapper />} />
          </Routes>
          {/* <Menu /> */}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export { UserContext };
