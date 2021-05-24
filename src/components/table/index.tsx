import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  CSSProperties,
} from "react";

import {
  Container,
  Header,
  HeaderCell,
  GroupRow,
  GroupCell,
  Content,
  ContentRow,
  ContentCell,
  Accordion,
  Body,
  Wrapper,
  Loader,
  LoaderWrapper,
  Overlay,
} from "./styles/table";

type ContextType = {
  toggleShow: boolean;
  setToggleShow: (value: boolean) => void;
  childrenCount: number;
  setChildrenCount: (value: number) => void;
};

const ToggleContext = createContext({} as ContextType);

export default function Table({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  return <Container {...restProps}>{children}</Container>;
}

Table.Header = function TableHeader({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  return <Header {...restProps}>{children}</Header>;
};

Table.HeaderCell = function TableHeaderCell({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  return <HeaderCell {...restProps}>{children}</HeaderCell>;
};

Table.GroupRow = function TableGroupRow({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  const { toggleShow, setToggleShow, childrenCount } =
    useContext(ToggleContext);
  return (
    <GroupRow {...restProps}>
      <GroupCell
        disabled={!childrenCount}
        onClick={() => setToggleShow(!toggleShow)}
      >
        {children}
      </GroupCell>
    </GroupRow>
  );
};

Table.Content = function TableContent({
  children,
  childrenLenght,
  ...restProps
}: {
  children: React.ReactNode;
  childrenLenght: number;
}) {
  const { toggleShow, setChildrenCount } = useContext(ToggleContext);

  useEffect(() => {
    setChildrenCount(childrenLenght);
  }, [childrenLenght, setChildrenCount]);
  return toggleShow ? <Content {...restProps}>{children}</Content> : null;
};

Table.ContentRow = function TableContentRow({
  children,
  style,

  ...restProps
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <ContentRow style={style} {...restProps}>
      <ContentCell>{children}</ContentCell>
    </ContentRow>
  );
};

Table.Accordion = function TableAccordion({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  const [toggleShow, setToggleShow] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  return (
    <ToggleContext.Provider
      value={{ toggleShow, setToggleShow, childrenCount, setChildrenCount }}
    >
      <Accordion {...restProps}>{children}</Accordion>
    </ToggleContext.Provider>
  );
};

Table.Body = function TableBody({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) {
  return <Body {...restProps}>{children}</Body>;
};

Table.Wrapper = function TableWrapper({
  children,
  onDrop,
  onDragOver,
  isDragging,
  ...restProps
}: {
  children?: React.ReactNode;
  isDragging?: boolean | undefined;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <Wrapper onDrop={onDrop} onDragOver={onDragOver} {...restProps}>
      {children}
      {isDragging && (
        <Overlay>
          <div>
            <p>Drop Items Here</p>
            <img src="icons/drop.png" alt="Drop zone" />
          </div>
        </Overlay>
      )}
    </Wrapper>
  );
};

Table.Loader = function TableLoader() {
  return (
    <LoaderWrapper>
      <Loader>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Loader>
    </LoaderWrapper>
  );
};
