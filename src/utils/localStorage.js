import { reactive } from "vue";

const useLocalStorage = (localStorageName, initialValue) => {
  let itemParsed = JSON.parse(localStorage.getItem(localStorageName));

  if (!itemParsed) {
    localStorage.setItem(localStorageName, JSON.stringify(initialValue));
    itemParsed = initialValue;
  }

  let item = reactive(itemParsed);

  const saveItem = (newItem) => {
    let itemStringified = JSON.stringify(newItem);
    localStorage.setItem(localStorageName, itemStringified);
    item = newItem;
  };

  return [item, saveItem];
};

export default useLocalStorage;
