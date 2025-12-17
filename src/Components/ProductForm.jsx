import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    image: "",
    SellingPrice: "",
    OriginalPrice: "",
    Category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.Name,
          Category: formData.Category,
          image: formData.image,
          OriginalPrice: Number(formData.OriginalPrice),
          SellingPrice: Number(formData.SellingPrice),
        }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      alert("Product added successfully!");
      setFormData({
        Name: "",
        image: "",
        SellingPrice: "",
        OriginalPrice: "",
        Category: "",
      });
    } catch (err) {
      console.error(err);
      alert("Could not add product. Check server.");
    }
  };
  return (
    <form className="mx-auto w-[500px] rounded-md bg-cover bg-[url('https://i.pinimg.com/736x/07/04/f0/0704f0e07d119915261cd66af43b4e73.jpg')] bg-no-repeat py-8 mt-20  border-1 shadow-lg m-40">
      <h1 className="text-black text-2xl px-20 py-5 font-bold text-center">
        ADD PRODUCTS
      </h1>
      <h1 className="text-black text-1xl ml-25 px-5">Name</h1>
      <input
        name="Name"
        type="text"
        className="border-1 px-10 ml-30 py-2 mt-2 rounded-md shadow-lg"
        value={formData.Name}
        onChange={handleChange}
        required
      ></input>
      <h1 className="text-black px-5 ml-25 mt-2">Image Url</h1>
      <input
        name="image"
        type="text"
        className="border-1 px-10 ml-5 py-2  ml-30 mt-2 rounded-md  shadow-lg"
        value={formData.image}
        onChange={handleChange}
      ></input>
      <h1 className="text-black mt-2 ml-25 px-5">Selling Price</h1>
      <input
        type="number"
        name="SellingPrice"
        className="border-1 px-10 ml-5 py-2  ml-30 mt-2 rounded-md  shadow-lg"
        value={formData.SellingPrice}
        onChange={handleChange}
      ></input>
      <h1 className="text-black mt-2 ml-25  px-5 ">Original Price</h1>
      <input
        type="number"
        name="OriginalPrice"
        className="border-1 px-10 ml-5 py-2 ml-30 mt-2 rounded-md shadow-lg"
        value={formData.OriginalPrice}
        onChange={handleChange}
      ></input>
      <h1 className="text-black mt-2 ml-25  px-5">Category</h1>
      <input
        type="text"
        name="Category"
        className="border-1 px-10 ml-5 ml-30 py-2 mt-2 mb-3 rounded-md shadow-lg"
        value={formData.Category}
        onChange={handleChange}
      ></input>
      <h1></h1>
      <input
        type="submit"
        value="ADD"
        onClick={handleSubmit}
        className=" bg-pink-200 mr-100 ml-50 py-3 px-5 border-2  border-black rounded-lg px-5 mb-5 ml-10 mr-10 mt-10 text-black"
      ></input>
    </form>
  );
};
export default ProductForm;
