import  { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const API_URL = "https://database-project-car-data.onrender.com";


  

  const [cars, setCars] = useState([]);

  const [form, setForm] = useState({

    name: "",
    brand: "",
    price: "",
    year: "",
    fuel: "Petrol",
    status: "Available",

  });

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);




  const getCars = async () => {

    try {

      const response =
        await axios.get(`${API_URL}/cars`);

      setCars(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    getCars();

  }, []);




  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !form.name ||
      !form.brand ||
      !form.price ||
      !form.year
    ) {

      alert("Please fill all fields");

      return;

    }


    try {

      setLoading(true);


  
      if (editingId) {

        const response =
          await axios.put(
            `${API_URL}/cars/${editingId}`,
            form
          );


        setCars(

          cars.map((car) =>
            car._id === editingId
              ? response.data
              : car
          )

        );


        setEditingId(null);

      }


     
      else {

        const response =
          await axios.post(
            `${API_URL}/cars`,
            form
          );


        setCars([
          ...cars,
          response.data
        ]);

      }


      setForm({

        name: "",
        brand: "",
        price: "",
        year: "",
        fuel: "Petrol",
        status: "Available",

      });

    } catch (error) {

      console.log(error);

      alert("Operation failed");

    } finally {

      setLoading(false);

    }

  };




  const deleteCar = async (id) => {

    if (!window.confirm("Delete this car?")) {
      return;
    }


    try {

      await axios.delete(
        `${API_URL}/cars/${id}`
      );


      setCars(

        cars.filter(
          (car) => car._id !== id
        )

      );

    } catch (error) {

      console.log(error);

    }

  };




  const editCar = (car) => {

    setEditingId(car._id);


    setForm({

      name: car.name,

      brand: car.brand,

      price: car.price,

      year: car.year,

      fuel: car.fuel,

      status: car.status,

    });


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };




  const deleteAllCars = async () => {

    if (
      !window.confirm(
        "Are you sure you want to delete ALL cars?"
      )
    ) {

      return;

    }


    try {

      await axios.delete(
        `${API_URL}/cars`
      );


      setCars([]);

    } catch (error) {

      console.log(error);

    }

  };



  const runQuery = async (query) => {

    try {

      const response =
        await axios.get(
          `${API_URL}/cars/query/${query}`
        );


      setCars(response.data);

    } catch (error) {

      console.log(error);

    }

  };


 

  const showAll = () => {

    getCars();

  };




  const updateMultiple = async () => {

    try {

      const response =
        await axios.put(
          `${API_URL}/cars/update-multiple`
        );


      alert(
        `${response.data.modified} cars updated`
      );


      getCars();

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-slate-950 text-white">



      <header className="border-b border-slate-800">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-2xl">
              🚗
            </div>

            <div>

              <h1 className="text-xl font-bold">
                Luxury Cars
              </h1>

              

            </div>

          </div>


          <div className="rounded-full border border-slate-700 px-4 py-2 text-sm">

            {cars.length} Cars

          </div>

        </div>

      </header>


      <main className="mx-auto max-w-7xl px-6 py-10">


    

        <div className="mb-10 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            Vehicle Database
          </p>

          <h2 className="text-4xl font-extrabold sm:text-5xl">

            Luxury Car{" "}

            <span className="text-red-500">
              Management
            </span>

          </h2>

         

        </div>


      

        <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

          <div className="mb-6">

            <h3 className="text-xl font-bold">

              {editingId
                ? "✏️ Update Car"
                : "➕ Add New Car"}

            </h3>

            <p className="text-sm text-slate-400">
              Enter vehicle details
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >


            
            <input

              name="name"

              value={form.name}

              onChange={handleChange}

              placeholder="Car Name - BMW M4"

              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-500"

            />


       

            <input

              name="brand"

              value={form.brand}

              onChange={handleChange}

              placeholder="Brand - BMW"

              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-500"

            />


         

            <input

              name="price"

              type="number"

              value={form.price}

              onChange={handleChange}

              placeholder="Price - 8500000"

              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-500"

            />


            <input

              name="year"

              type="number"

              value={form.year}

              onChange={handleChange}

              placeholder="Year - 2024"

              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-500"

            />


        

            <select

              name="fuel"

              value={form.fuel}

              onChange={handleChange}

              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-500"

            >

              <option>Petrol</option>

              <option>Diesel</option>

              <option>Electric</option>

              <option>Hybrid</option>

            </select>


          

            <select

              name="status"

              value={form.status}

              onChange={handleChange}

              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-500"

            >

              <option>Available</option>

              <option>Sold</option>

              <option>Reserved</option>

            </select>



            <button

              type="submit"

              disabled={loading}

              className="rounded-xl bg-red-500 px-6 py-3 font-bold transition hover:bg-red-600 disabled:opacity-50 lg:col-span-3"

            >

              {loading
                ? "Processing..."
                : editingId
                  ? "Update Car"
                  : "+ Add Car"}

            </button>


          </form>


          {editingId && (

            <button

              onClick={() => {

                setEditingId(null);

                setForm({

                  name: "",
                  brand: "",
                  price: "",
                  year: "",
                  fuel: "Petrol",
                  status: "Available",

                });

              }}

              className="mt-3 text-sm text-slate-400 hover:text-white"

            >

              Cancel Edit

            </button>

          )}

        </section>


     

        <section className="mb-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          


          <div className="flex flex-wrap gap-3">


            <button
              onClick={showAll}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
            >
              All Cars
            </button>


            <button
              onClick={() => runQuery("greater")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
            >
              ABOVE &gt; ₹50L
            </button>


            <button
              onClick={() => runQuery("less")}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm hover:bg-purple-500"
            >
              UNDER &lt; ₹1Cr
            </button>


            <button
              onClick={() => runQuery("in")}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm hover:bg-green-500"
            >
               BMW CARS
            </button>


            <button
              onClick={() => runQuery("and")}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm hover:bg-orange-500"
            >
               Petrol + ₹1CR
            </button>


            <button
              onClick={() => runQuery("or")}
              className="rounded-lg bg-pink-600 px-4 py-2 text-sm hover:bg-pink-500"
            >
               BMW / ASTON MARTIN
            </button>


            <button
              onClick={() => runQuery("exists")}
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm hover:bg-cyan-500"
            >
              exists Year
            </button>

          </div>

        </section>


     

        <section className="mb-10 flex flex-wrap gap-3">

          <button

            onClick={updateMultiple}

            className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-3 text-sm font-semibold text-yellow-400 hover:bg-yellow-500 hover:text-black"

          >

            🔄 Update All Petrol Cars

          </button>


          <button

            onClick={deleteAllCars}

            className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white"

          >

            🗑 Delete All Cars

          </button>

        </section>


        <div className="mb-5">

          <h3 className="text-2xl font-bold">
            🚘 Car Collection
          </h3>

          <p className="text-sm text-slate-500">
            Current database results
          </p>

        </div>


        {cars.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-700 p-16 text-center">

            <div className="mb-4 text-6xl">
              🚙
            </div>

            <h3 className="text-xl font-bold">
              No Cars Found
            </h3>

            <p className="mt-2 text-slate-500">
              Add a car or change your search.
            </p>

          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


            {cars.map((car) => (

              <div

                key={car._id}

                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-red-500/50"

              >


              

                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">

                  <span className="text-7xl">
                    🚗
                  </span>

                </div>


                <div className="p-5">


                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs text-slate-500">
                        {car.brand}
                      </p>

                      <h4 className="text-xl font-bold">
                        {car.name}
                      </h4>

                    </div>


                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">

                      {car.status}

                    </span>

                  </div>


                  <div className="my-4 rounded-xl bg-slate-950 p-4">

                    <p className="text-xs text-slate-500">
                      Price
                    </p>

                    <p className="text-2xl font-bold text-red-400">

                      ₹{Number(car.price).toLocaleString("en-IN")}

                    </p>

                  </div>


                  <div className="mb-5 grid grid-cols-2 gap-3 text-sm">

                    <div className="rounded-lg bg-slate-800 p-3">

                      <p className="text-xs text-slate-500">
                        Year
                      </p>

                      <p className="font-semibold">
                        {car.year}
                      </p>

                    </div>


                    <div className="rounded-lg bg-slate-800 p-3">

                      <p className="text-xs text-slate-500">
                        Fuel
                      </p>

                      <p className="font-semibold">
                        {car.fuel}
                      </p>

                    </div>

                  </div>


                  

                  <div className="flex gap-3">


                    <button

                      onClick={() => editCar(car)}

                      className="flex-1 rounded-xl bg-blue-500/10 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500 hover:text-white"

                    >

                      ✏️ Edit

                    </button>


                    <button

                      onClick={() => deleteCar(car._id)}

                      className="flex-1 rounded-xl bg-red-500/10 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white"

                    >

                      🗑 Delete

                    </button>


                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-600">

        Luxury Cars 

      </footer>

    </div>

  );

}

export default App;
