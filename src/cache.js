
export const SetUser = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("user", JSON.stringify(item));
};

export const GetUser = () => {
  const itemStr = localStorage.getItem("user");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("user");
    return null;
  }
  return item.value;
};

export const SetToken = (value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("token", JSON.stringify(item));
};

export const GetToken = () => {
  const itemStr = localStorage.getItem("token");
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("token");
    return null;
  }
  return item.value;
};

export const SetHistory = (key, value) => {
  const item = {
    value: value
  };
  localStorage.setItem("history" + key, JSON.stringify(item));
};

export const GetHistory = (key) => {
  const itemStr = localStorage.getItem("history" + key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const SetEpisode = (key, value) => {
  const item = {
    value: value
  };
  localStorage.setItem("episode" + key, JSON.stringify(item));
};

export const GetEpisode = (key) => {
  const itemStr = localStorage.getItem("episode" + key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const SetFavorites = (key) => {
  const item = {
    value: true
  };
  localStorage.setItem("favorites" + key, JSON.stringify(item));
};

export const RemoveFavorites = (key) => {
  localStorage.removeItem("favorites" + key);
};

export const GetFavorites = (key) => {
  const itemStr = localStorage.getItem("favorites" + key);
  if (!itemStr) {
    return false;
  }
  const item = JSON.parse(itemStr);
  return item.value;
};

export const SetCache = (key, value) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + 60 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const GetCache = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const FetchAndCacheVideo = async (series, episode) => {
  const videoUrl = `${series.BaseURL}/${episode}.mp4`;
  fetch(videoUrl)
    .then(response => response.blob())
    .then(blob => {
      const localUrl = URL.createObjectURL(blob);
      localStorage.setItem('cache-url', localUrl);
      localStorage.setItem('cache-video', JSON.stringify(series));
      localStorage.setItem('cache-episode', episode);
      localStorage.setItem('download-complete', 'true');
    })
    .catch(error => {
      console.error('Error caching video:', error);
      localStorage.setItem('download-complete', 'false');
    });
};

