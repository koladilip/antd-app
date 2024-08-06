import React, { useState, useEffect } from "react";
import { Select, Button, Spin, Space, Form } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SelectDataProvider, SelectOption } from "../types";
import { fetchDataForSelect } from "../utils";
import { FormListProps } from "antd/es/form";

const { Option } = Select;

interface Mapping {
  from: string;
  to: string;
}

type MappingsProps = {
  name: string;
  source: SelectDataProvider;
  destination: SelectDataProvider;
};

export const Mappings: React.FC<MappingsProps> = ({
  name,
  source,
  destination,
}) => {
  const [sourceFields, setSourceFields] = useState<SelectOption[]>([]);
  const [destinationFields, setDestinationFields] = useState<SelectOption[]>(
    []
  );
  const [loadingSource, setLoadingSource] = useState<boolean>(false);
  const [loadingDestination, setLoadingDestination] = useState<boolean>(false);
  const [form] = Form.useForm<{ mappings: Mapping[] }>();
  console.log("Form values:", form);
  const usedDestinationFields =
    Form.useWatch("mappings", form)
      ?.filter((m) => m.to)
      .map((m) => m.to) || [];

  console.log("Used destination fields:", usedDestinationFields);

  const fetchSourceFields = async () => {
    setLoadingSource(true);
    try {
      setSourceFields(await fetchDataForSelect(source));
    } catch (error) {
      console.error("Error fetching source fields:", error);
    }
    setLoadingSource(false);
  };

  const fetchDestinationFields = async () => {
    setLoadingDestination(true);
    try {
      setDestinationFields(await fetchDataForSelect(destination));
    } catch (error) {
      console.error("Error fetching destination fields:", error);
    }
    setLoadingDestination(false);
  };

  useEffect(() => {
    fetchSourceFields();
    fetchDestinationFields();
  }, []);

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button
              onClick={fetchSourceFields}
              loading={loadingSource}
              style={{ marginRight: 8 }}
            >
              Refresh Source Fields
            </Button>
            <Button
              onClick={fetchDestinationFields}
              loading={loadingDestination}
            >
              Refresh Destination Fields
            </Button>
          </div>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, "from"]}
                rules={[{ required: true, message: "Missing source field" }]}
              >
                <Select
                  style={{ width: 200 }}
                  placeholder="Select source field"
                  loading={loadingSource}
                  notFoundContent={loadingSource ? <Spin size="small" /> : null}
                >
                  {sourceFields.map((field) => (
                    <Option key={field.id} value={field.id}>
                      {field.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "to"]}
                rules={[
                  { required: true, message: "Missing destination field" },
                ]}
              >
                <Select
                  style={{ width: 200 }}
                  placeholder="Select destination field"
                  loading={loadingDestination}
                  notFoundContent={
                    loadingDestination ? <Spin size="small" /> : null
                  }
                >
                  {destinationFields.map((field) => (
                    <Option
                      key={field.id}
                      value={field.id}
                      disabled={usedDestinationFields.includes(field.id)}
                    >
                      {field.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
            >
              <PlusOutlined /> Add Mapping
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
