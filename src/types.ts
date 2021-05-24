export type Person = {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  registered: {
    date: string;
    age: number;
  };
  picture: {
    thumbnail: string;
  };
};

export type Response = {
  range: string;
  peoples: Person[];
};
