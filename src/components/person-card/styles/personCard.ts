import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 50px;

  &:hover {
    cursor: grab;
  }
`;
export const Img = styled.img`
  pointer-events: none;
  margin-right: 5px;
  object-fit: cover;
`;
export const TextBox = styled.div`
  font-size: 18px;
  padding: 5px;
`;
export const Wrapper = styled.div``;
export const Trash = styled.img`
  margin-left: auto;
  cursor: pointer;
`;
