import React, { CSSProperties } from "react";

import { default as Table } from "../components/table";
import { default as PersonCard } from "../components/person-card";
import {
  createDate,
  handleDragStart,
  handleDragEnd,
  sortableDrop,
} from "../utils";

import { Person } from "../types";

export const Row = React.memo(
  ({
    data,
    index,
    style,
  }: {
    data: {
      peoples: Person[];
      setter: (item: Person) => void;
      favourite: Person[];
      setFavourite: (item: Person[]) => void;
      currentDragItem: Person;
    };
    index: number;
    style: CSSProperties;
  }) => {
    const { peoples, setter, favourite, setFavourite, currentDragItem } = data;
    const person = peoples[index];

    return (
      <Table.ContentRow key={`${person.login.uuid}`} style={style}>
        <PersonCard
          draggable={true}
          onDragStart={() => handleDragStart(setter, person)}
          onDragEnd={() => handleDragEnd(setter)}
          onDrop={() =>
            sortableDrop(person, favourite, setFavourite, currentDragItem)
          }
        >
          <PersonCard.Img
            src={person.picture.thumbnail}
            alt={`${person.name.first} ${person.name.last}`}
          />

          <PersonCard.Wrapper>
            <PersonCard.TextBox>{`${person.name.first} ${
              person.name.last
            }, дата регистрации: ${createDate(
              person.registered.date
            )}`}</PersonCard.TextBox>
            <PersonCard.TextBox>{`Email: ${person.email}`}</PersonCard.TextBox>
          </PersonCard.Wrapper>
        </PersonCard>
      </Table.ContentRow>
    );
  }
);
