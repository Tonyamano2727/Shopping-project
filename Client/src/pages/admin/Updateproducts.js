import React, { useState, useEffect, useCallback } from "react";
import { Button, InputForm, Markdoweditor, Select } from "../../components";
import { useForm } from "react-hook-form";
import { validate, getBase64 } from "../../ultils/helper";
import { toast } from "react-toastify";
import icons from "../../ultils/icons";
import { apiCreateProduct } from "../../apis";
import { useSelector } from "react-redux";

const { IoTrashBin } = icons;

const Updateproducts = ({ editproduct, render }) => {
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [payload, setpayload] = useState({
    description: "",
  });
  const [preview, setpreview] = useState({
    thumb: null,
    images: [],
  });

  // useEffect(() => {
  //   reset({
  //     title : editproduct.title || '',
  //     price : editproduct.price || '',
  //     quantity : editproduct.quantity || '',
  //     color : editproduct.color || '',


  //   },[editproduct])
  // })

  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setpayload(e);
    },
    [payload]
  );
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setpreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const [hover, sethover] = useState(null);
  const handlePreviewimages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("file not support");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setpreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewimages(watch("images"));
  }, [watch("images")]);
  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append("images", image);
      }
      const response = await apiCreateProduct(formData);
      if (response.success) {
        toast.success(response.mes);
        reset();
        setpayload({
          thumb: "",
          images: [],
        });
      } else toast.error(response.mes);
    }
  };

  const handleRemoveimage = (name) => {
    const files = [...watch("images")];

    reset({
      images: files?.filter((el) => el.name !== name),
    });
    if (preview.images?.some((el) => el.name === name))
      setpreview((prev) => ({
        ...prev,
        images: prev.images.filter((el) => el.name !== name),
      }));
  };
  return (
    <div className="w-full flex flex-col gap-4 text-start relative">
      <div className="p-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight ">Updateproducts</h1>
      </div>
      <div>
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
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              register={register}
              {...register("thumb", { required: "Need fill" })}
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumb"
                className="w-[200px] object-contain"></img>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="products">
              Upload images of products
            </label>
            <input
              type="file"
              id="images"
              multiple
              register={register}
              {...register("images", { required: "Need fill" })}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, idx) => (
                <div
                  onMouseEnter={() => sethover(el.name)}
                  className="w-fit flex relative"
                  onMouseLeave={() => sethover(null)}>
                  <img
                    key={idx}
                    src={el.path}
                    alt="product"
                    className="w-[200px] object-contain "></img>
                  {hover === el.name && (
                    <div
                      className="absolute cursor-pointer flex justify-end inset-0 bg-orange-200"
                      onClick={() => handleRemoveimage(el.name)}>
                      <IoTrashBin className="p-2" size={44} color="black" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Button type="submit">Create new product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateproducts;
