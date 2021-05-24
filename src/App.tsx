import React, { useState, useEffect } from "react";
import axios from "axios";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Table, PersonCard } from "./components";
import { Row } from "./containers/row";
import { Response, Person } from "./types";
import {
  createDate,
  handleDragStart,
  handleDragEnd,
  sortableDrop,
} from "./utils";

export default function App() {
  const [persons, setPersons] = useState<Response[]>([]);
  const [status, setStatus] = useState("idle");
  const [inputValue, setInputValue] = useState("");
  const [favourite, setFavourite] = useState<Person[]>([]);
  const [currentDragItem, setCurrentDragItem] = useState({} as Person);

  useEffect(() => {
    setStatus("pending");
    axios.get("https://randomuser.me/api/?results=500").then(
      (response) => {
        let groups = [];
        for (let i = 1; i < 100; i += 10) {
          let groupPersons = response.data.results.filter(
            (person: Person) =>
              person.registered.age <= i + 9 && person.registered.age >= i
          );
          groups.push({ range: `${i}-${i + 9}`, peoples: groupPersons });
        }
        setPersons(groups);
        setStatus("resolved");
      },
      () => setStatus("rejected")
    );
  }, []);

  const searchAndHighlight = React.useCallback(
    (search: string) => {
      if (search.length > 0) {
        const regexp = new RegExp(search, "gi");
        const filtered = persons.map(({ range, peoples }) => {
          const temp = peoples.filter(
            (person) =>
              person.name.first.match(regexp) ||
              person.name.last.match(regexp) ||
              `${person.name.first} ${person.name.last}`.match(regexp)
          );
          return { range, peoples: [...temp] };
        });
        return filtered;
      }
      return persons;
    },
    [persons]
  );

  const checkForDuplicate = (array: Person[]) => {
    return array.filter(
      (item) => item.login.uuid === currentDragItem.login.uuid
    ).length > 0
      ? array
      : [...array, currentDragItem];
  };

  const handleDrop = () => {
    setFavourite((prevState) => checkForDuplicate(prevState));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const deleteHandler = (item: Person) => {
    setFavourite((prevState) =>
      prevState.filter((prevItem) => prevItem.login.uuid !== item.login.uuid)
    );
  };

  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell>
          <input
            placeholder="Поиск"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Table.HeaderCell>
        <Table.HeaderCell>Избранное</Table.HeaderCell>
      </Table.Header>
      {status === "resolved" ? (
        <Table.Body>
          <Table.Wrapper>
            {searchAndHighlight(inputValue).map(({ range, peoples }) => (
              <Table.Accordion key={range}>
                <Table.GroupRow>{range}</Table.GroupRow>
                <Table.Content childrenLenght={peoples.length}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <FixedSizeList
                        height={peoples.length > 10 ? 700 : peoples.length * 64}
                        width={width}
                        itemSize={64}
                        itemCount={peoples.length}
                        className="no-scrollbars"
                        itemData={{
                          peoples: peoples,
                          setter: setCurrentDragItem,
                          favourite,
                          setFavourite,
                          currentDragItem,
                        }}
                      >
                        {Row}
                      </FixedSizeList>
                    )}
                  </AutoSizer>
                </Table.Content>
              </Table.Accordion>
            ))}
          </Table.Wrapper>
          <Table.Wrapper
            onDrop={() => handleDrop()}
            onDragOver={(e) => handleDragOver(e)}
            isDragging={!!Object.keys(currentDragItem).length}
          >
            {favourite.length > 0 &&
              favourite.map((favor) => (
                <Table.ContentRow key={`${favor.login.uuid}`}>
                  <PersonCard
                    draggable={true}
                    onDragStart={() =>
                      handleDragStart(setCurrentDragItem, favor)
                    }
                    onDragEnd={() => handleDragEnd(setCurrentDragItem)}
                    onDrop={() =>
                      sortableDrop(
                        favor,
                        favourite,
                        setFavourite,
                        currentDragItem
                      )
                    }
                  >
                    <PersonCard.Img
                      src={favor.picture.thumbnail}
                      alt={`${favor.name.first} ${favor.name.last}`}
                    />

                    <PersonCard.Wrapper>
                      <PersonCard.TextBox>{`${favor.name.first} ${
                        favor.name.last
                      }, дата регистрации: ${createDate(
                        favor.registered.date
                      )}`}</PersonCard.TextBox>
                      <PersonCard.TextBox>{`Email: ${favor.email}`}</PersonCard.TextBox>
                    </PersonCard.Wrapper>
                    <PersonCard.Trash onClick={() => deleteHandler(favor)} />
                  </PersonCard>
                </Table.ContentRow>
              ))}
          </Table.Wrapper>
        </Table.Body>
      ) : (
        <Table.Loader />
      )}
    </Table>
  );
}
