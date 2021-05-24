import { Person } from "./types";

export const createDate = (date: string) => {
  const parsedDate = new Date(date);
  return `${addZeroToDate(parsedDate.getDate())}.${addZeroToDate(
    parsedDate.getMonth() + 1
  )}.${addZeroToDate(parsedDate.getFullYear())}`;
};

const addZeroToDate = (item: number) => {
  return item >= 10 ? item : `0${item}`;
};

export const handleDragStart = (
  setter: (item: Person) => void,
  item: Person
) => {
  setter(item);
};

export const handleDragEnd = (setter: (item: Person) => void) => {
  setter({} as Person);
};

export const sortableDrop = (
  item: Person,
  favourite: Person[],
  setFavourite: (items: Person[]) => void,
  currentDragItem: Person
) => {
  const currentIndex = favourite.indexOf(currentDragItem);
  const dropIndex = favourite.indexOf(item);
  if (currentIndex === -1) {
    setFavourite([
      ...favourite.slice(0, dropIndex),
      currentDragItem,
      ...favourite.slice(dropIndex, favourite.length),
    ]);
  } else if (currentIndex < dropIndex) {
    setFavourite([
      ...favourite.slice(0, currentIndex),
      ...favourite.slice(currentIndex + 1, dropIndex + 1),
      currentDragItem,
      ...favourite.slice(dropIndex + 1, favourite.length),
    ]);
  } else if (currentIndex > dropIndex) {
    setFavourite([
      ...favourite.slice(0, dropIndex),
      currentDragItem,
      ...favourite.slice(dropIndex, currentIndex),
      ...favourite.slice(currentIndex + 1, favourite.length),
    ]);
  }
};
