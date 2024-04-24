
export type StructurizedData = Record<string, string>;
export type SearchData = {
  [route: string]: {
    title: string;
    data: StructurizedData;
  };
};