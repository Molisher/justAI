import React from "react";

import { Container, Img, TextBox, Wrapper, Trash } from "./styles/personCard";

export default function PersonCard({
  children,
  draggable,
  onDragStart,
  onDragEnd,
  onDrop,
  ...restProps
}: {
  children: React.ReactNode;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: () => void;
}) {
  return (
    <Container
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      {...restProps}
    >
      {children}
    </Container>
  );
}

PersonCard.Img = function PersonCardImg({
  src,
  alt,
  ...restProps
}: {
  src: string;
  alt: string;
}) {
  return <Img src={src} alt={alt} {...restProps} />;
};

PersonCard.TextBox = function PersonCardTextBox({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  return <TextBox {...restProps}>{children}</TextBox>;
};

PersonCard.Wrapper = function PersonCardWrapper({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

PersonCard.Trash = function PersonCardTrash({ ...restProps }) {
  return (
    <Trash src="icons/trash.svg" alt="Delete from favourite" {...restProps} />
  );
};
