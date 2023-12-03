import md5 from 'js-md5';

const BASE_URL = 'http://18.188.120.153:8080';

// Utility function to fetch data with caching
const fetchDataWithCache = async (url, cacheKey, expiryTime = 3600000) => {
  let data = {};
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (new Date().getTime() - parsedData.timestamp < expiryTime) {
      return parsedData.data;
    }
  }

  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) throw new Error('Network response was not ok.');

  data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: new Date().getTime() }));
  return data;
};

// Error handling function
const handleError = (error, message) => {
  console.error(message, error);
  throw error;
};

export const GetSeriesList = async () => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    const seriesByType = { type1: [], type2: [], type3: [] };
    data.VideoList.forEach(video => {
      const typeKey = `type${video.Type}`;
      if (seriesByType[typeKey]) {
        seriesByType[typeKey].push(video);
      }
    });
    return seriesByType;
  } catch (error) {
    handleError(error, 'Get Series List Failed:');
  }
};

export const GetSeries = async (id) => {
  try {
    const data = await fetchDataWithCache(`${BASE_URL}/video-list`, 'seriesListCache');
    return data.VideoList.find(video => String(id) === String(video.ID)) || null;
  } catch (error) {
    handleError(error, 'Get Series Failed:');
  }
};

const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Network response was not ok.');

  return await response.json();
};

export const login = async (email, password) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/login`, { email, password: hashedPassword });
    localStorage.setItem('token', data.Token);
    return data;
  } catch (error) {
    handleError(error, 'Login Failed:');
  }
};

export const register = async (email, password) => {
  try {
    const hashedPassword = md5(password);
    const data = await postRequest(`${BASE_URL}/register`, { email, password: hashedPassword });
    localStorage.setItem('token', data.Token);
    return data;
  } catch (error) {
    handleError(error, 'Register Failed:');
  }
};

export const RecordFavorites = async (userID, videoID) => {
  try {
    const token = localStorage.getItem('token');
    return await postRequest(`${BASE_URL}/record-favorites`, { token, userID, videoID });
  } catch (error) {
    handleError(error, 'Record Favorites Failed:');
  }
};

export const RecordHistory = async (userID, videoID, episode) => {
  try {
    const token = localStorage.getItem('token');
    return await postRequest(`${BASE_URL}/record-history`, { token, userID, videoID, episode });
  } catch (error) {
    handleError(error, 'Record History Failed:');
  }
};

export const GetFavorites = async (userID) => {
  try {
    const token = localStorage.getItem('token');
    return await postRequest(`${BASE_URL}/favorites`, { token, userID });
  } catch (error) {
    handleError(error, 'Favorites Failed:');
  }
};

export const GetHistory = async (userID) => {
  try {
    const token = localStorage.getItem('token');
    return await postRequest(`${BASE_URL}/history`, { token, userID });
  } catch (error) {
    handleError(error, 'History Failed:');
  }
};
