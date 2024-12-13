interface Row {
  id: string;
  classification: string;
  name: string;
  [characteristic: string]: string;
}
export type TableData = Row[];
export type Data = {
  data: TableData;
};
