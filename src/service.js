import md5 from 'js-md5'
import React from 'react';
React.Component.prototype.$md5 = md5

  const BASE_URL = 'http://18.188.120.153:8080';

  export const GetSeriesList = async () => {
    try {
      let data = {};
      const cachedData = localStorage.getItem('seriesListCache');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (new Date().getTime() - parsedData.timestamp < 3600000) {
          data = parsedData.data;
        }
      }
      if (!cachedData || Object.keys(data).length === 0) {
        const response = await fetch(`${BASE_URL}/video-list`, {
          method: 'GET',
        });
        data = await response.json();
        localStorage.setItem('seriesListCache', JSON.stringify({
          data: data,
          timestamp: new Date().getTime()
        }));
      }
      const seriesByType = {
        type1: [],
        type2: [],
        type3: []
      };
  
      data.VideoList.forEach(video => {
        const typeKey = `type${video.Type}`;
        if (seriesByType[typeKey]) {
          seriesByType[typeKey].push(video);
        }
      });
      return seriesByType;
    } catch (error) {
      console.error('Get Series List failed:', error);
      throw error;
    }
  };  

  export const GetSeries = async (id) => {
    try {
      let data = {};
      const cachedData = localStorage.getItem('seriesListCache');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (new Date().getTime() - parsedData.timestamp < 3600000) {
          data = parsedData.data;
        }
      }
      if (!cachedData || Object.keys(data).length === 0) {
        const response = await fetch(`${BASE_URL}/video-list`, {
          method: 'GET',
        });
        data = await response.json();
        localStorage.setItem('seriesListCache', JSON.stringify({
          data: data,
          timestamp: new Date().getTime()
        }));
      }
      for (const video of data.VideoList) {
        if (String(id) === String(video.ID)) {
          return video;
        }
      }
      return null;
    } catch (error) {
      console.error('Get Series failed:', error);
      throw error;
    }
  };
  

  export const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
          'email': email,
          'password': md5(password)
        })
      })
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  export const register = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({
          'email': email,
          'password': md5(password)
        })
      })
      return await response.json();
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };
   