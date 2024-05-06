import React, { useState, useEffect, useCallback } from "react";
import { Button, InputForm, Markdoweditor, Select } from "../../components";
import { useForm } from "react-hook-form";
import { validate, getBase64 } from "../../ultils/helper";
import { toast } from "react-toastify";
import icons from "../../ultils/icons";
import { apiUpdateproduct } from "../../apis";
import { useSelector } from "react-redux";

const { IoTrashBin } = icons;

const Updateproducts = ({ editproduct, render, seteditproduct }) => {
  const [isfousdescription, setisfousdescription] = useState(null)
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
  
  useEffect(() => {
    reset({
      title: editproduct?.title || "",
      price: editproduct?.price || "",
      quantity: editproduct?.quantity || "",
      color: editproduct?.color || "",
      category: editproduct?.category || "",
      brand: editproduct?.brand?.toLowerCase() || "",
      
    });
    setpayload({
      description:
        typeof editproduct?.description === "object"
          ? editproduct?.description?.join(", ")
          : editproduct?.description,
    });
    setpreview({
      thumb: editproduct?.thumb || "",
      images: editproduct?.images || [],
    });
  }, [editproduct]);
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
      imagesPreview.push(base64);
    }
    setpreview((prev) => ({ ...prev, images: imagesPreview }));
    
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch('images').length > 0) handlePreviewimages(watch("images"));
  }, [watch("images")]);
  window.scrollTo(0 , 0)
  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el.title === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload?.thumb?.length === 0 ? preview.thumb : finalPayload.thumb[0]);
      if (finalPayload.images) {
        const images = finalPayload?.image?.length === 0 ? preview.images : finalPayload.images
        for (let image of images) formData.append("images", image);
      }
      const response = await apiUpdateproduct(formData , editproduct._id);
      console.log(response);
      if (response.success) {
        toast.success(response.mes);
        render()
        seteditproduct(null)
      } else toast.error(response.mes);
      console.log(finalPayload);
    }
  };
//   const handleUpdateProduct = async (data) => {
//   const invalids = validate(payload, setInvalidFields);
//   if (invalids === 0) {
//     // Xử lý trường "thumb"
//     let thumbData = data.thumb;
//     if (data.thumb instanceof FileList && data.thumb.length > 0) {
//       thumbData = await getBase64(data.thumb[0]);
//     }

//     // Xử lý trường "images"
//     let imagesData = [];
//     if (data.images instanceof FileList && data.images.length > 0) {
//       for (let file of data.images) {
//         if (file.type !== "image/png" && file.type !== "image/jpeg") {
//           toast.warning("File not supported");
//           return;
//         }
//         const base64 = await getBase64(file);
//         imagesData.push(base64);
//       }
//     }

//     const finalPayload = { ...data, ...payload, thumb: thumbData, images: imagesData };
//     const formData = new FormData();
//     for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

//     const response = await apiUpdateproduct(formData , editproduct._id);
//     console.log(response);
//   }
// };

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
    <div className="w-full flex flex-col gap-4 text-start relative ">
      <div className="p-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight ">Updateproducts</h1>
        <span className='cursor-pointer text-main' onClick={() => seteditproduct(null)}>Cancel</span>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                code: el.title,
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
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
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
            value={payload.description}
            setisfousdescription={setisfousdescription}
          />
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              register={register}
              {...register("thumb")}
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
              {...register("images")}
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
                <div className="w-fit flex relative">
                  <img
                    key={idx}
                    src={el}
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
            <Button type="submit">Updateproducts</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateproducts;
