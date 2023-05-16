const browserStorage = typeof window !== "undefined" ? localStorage : null;

const storage = {
  set(key, value) {
    browserStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(browserStorage.getItem(key));
  },
  remove(key) {
    return browserStorage.removeItem(key);
  },
  clear() {
    browserStorage.clear();
  },
};

export default storage;
