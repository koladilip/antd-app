import { SelectDataProvider } from "../types";

export const fetchDataForSelect = async (dataProvider: SelectDataProvider) => {
  const { url, dataMapper } = dataProvider;
  try {
    const response = await fetch(url); // Replace with your API URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const respData: any = await response.json();
    if (dataMapper) {
      return dataMapper(respData);
    } else {
      return respData;
    }
  } catch (error) {
    throw new Error("Error occurred while fetching data: " + error);
  }
};
