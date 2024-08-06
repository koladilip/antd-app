import { Button, Form, Select } from "antd";
import "./App.css";
import { DynamicSelect } from "./components";
import { Mappings } from "./components/Mappings";

function App() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <div id="app">
      <Form
        form={form}
        name="parent_form"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="productId"
          label="Product"
          rules={[{ required: true, message: "Select Product" }]}
        >
          <DynamicSelect
            url="https://dummyjson.com/products"
            dataMapper={(data) => {
              return data.products.map((product: { id: any; title: any }) => ({
                id: product.id,
                name: product.title,
              }));
            }}
          />
          {/* <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          /> */}
        </Form.Item>
        <Form.Item label="Mappings">
          <Mappings
            name="mappings"
            source={{
              url: "https://dummyjson.com/products",
              dataMapper: (data) => {
                return data.products.map(
                  (product: { id: string; title: string }) => ({
                    id: product.id,
                    name: product.title,
                  })
                );
              },
            }}
            destination={{
              url: "https://dummyjson.com/users",
              dataMapper: (data) => {
                return data.users.map(
                  (user: { id: string; email: string }) => ({
                    id: user.id,
                    name: user.email,
                  })
                );
              },
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
