import React, { useCallback, useState } from "react";
import { InputForm, Select, Button, Markdoweditor } from "../../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { validate } from "../../ultils/helper";

const CreateProducts = () => {
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm({
    category: "",
  });

  const [payload, setpayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setpayload(e);
    },
    [payload]
  );

  const handleCreateProduct = (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.title;
      console.log({ ...data, ...payload });
    }
  };
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Create new products</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            label="Name product"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            className="flex-1"
            placeholder="Name of new product"
          />
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label="Price product"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Price of new product"
              fullwith={true}
            />
            <InputForm
              label="Quantity product"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Quantity of new product"
              fullwith={true}
            />
            <InputForm
              label="Color product"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Color of new product"
              fullwith={true}
            />
          </div>
          <div className="w-full flex my-6 gap-4">
            <Select
              label="Category"
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Need fill this field" }}
              style="flex-1"
              errors={errors}
            />
            <Select
              label="Brand"
              options={categories
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({ code: el, value: el }))}
              register={register}
              id="brand"
              validate={{ required: "Need fill this field" }}
              style="flex-1"
              errors={errors}
            />
          </div>
          <Markdoweditor
            name="description"
            changevalue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setinvalidFields={setInvalidFields}
          />
          <div className="flex flex-col gap-2 mt-8">
                <label className="font-semibold" htmlFor="thumb">Upload thumb</label>
                <input type="file" id="thumb"></input>
          </div>
          <div className="flex flex-col gap-2 mt-8">
                <label className="font-semibold" htmlFor="products">Upload images of products</label>
                <input type="file" id="products" multiple ></input>
          </div>
          <div className="mt-8">
          <Button type="submit">Create new product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
