import React, { useState, useEffect } from "react";
import { Select, Button, Spin } from "antd";
import { SelectDataProvider, SelectOption } from "../types";
import { fetchDataForSelect } from "../utils";

const { Option } = Select;

type DynamicSelectProps = SelectDataProvider & {
  onChange?: (value: string) => void;
};

export const DynamicSelect: React.FC<DynamicSelectProps> = ({
  url,
  dataMapper,
  onChange,
}) => {
  const [data, setData] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      setData(await fetchDataForSelect({ url, dataMapper }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <Select
        onChange={onChange}
        style={{ width: 200 }}
        placeholder="Select an option"
        loading={loading}
        notFoundContent={loading ? <Spin size="small" /> : null}
      >
        {data.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Button onClick={handleRefresh} style={{ marginLeft: 8 }}>
        Refresh
      </Button>
    </div>
  );
};
