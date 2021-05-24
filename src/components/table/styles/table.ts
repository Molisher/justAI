import styled from "styled-components/macro";

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
  min-height: 50px;
  margin-bottom: 5px;
`;
export const HeaderCell = styled.div`
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;

  input {
    width: 100%;
    font-size: 20px;
    height: 100%;
    border: none;
    outline: none;
    text-align: center;
  }
  input::placeholder {
    color: black;
  }
  input:focus::placeholder {
    opacity: 0.5;
  }
`;

export const GroupCell = styled(HeaderCell)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  width: 100%;
`;

export const GroupRow = styled(Header)`
  margin: 5px 0;
  ${GroupCell}:first-of-type {
    background-color: #dcdcdc;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  .no-scrollbars {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    &::-webkit-scrollbar {
      width: 1px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  .no-scrollbars::-webkit-scrollbar {
    display: none;
  }
`;
export const Body = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Accordion = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 49%;
`;

export const ContentCell = styled(HeaderCell)`
  width: 100%;
`;

export const ContentRow = styled(Header)`
  height: auto;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 999;
  border: 4px dashed black;
  opacity: 0.3;
  pointer-events: none;

  & div {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 50px;
  }
`;
export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: black;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
