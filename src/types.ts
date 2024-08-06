export type SelectOption = {
  id: string;
  name: string;
};

export type SelectDataProvider = {
  url: string;
  dataMapper?: (data: any) => SelectOption[];
};
