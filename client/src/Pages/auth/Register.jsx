import { useState } from "react";
import { Link } from "react-router-dom";


function Register() {
    const [form, setForm] = useState({

        name: "",
        email: "",
        address: "",
        password: ""

    });

    const handleChange = (e) => {
        setForm({
            ...form,
           [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    return (

        <div className=" min-h-screen bg-[#232946] flex items-center justify-center p-5 ">
           <form
                onSubmit={handleSubmit}
                className=" bg-[#fffffe] w-full max-w-md p-8 rounded-2xl shadow-2xl "
            >
                <h1 className=" text-4xl font-bold text-center text-[#232946] mb-2 ">
                    Create Account
                </h1>
                <p className=" text-center text-[#b8c1ec] mb-6 ">
                    Join Store Rating App
                </p>

                <input
                    name="name"
                    placeholder="Full Name"
                    className="inputStyle"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    className="inputStyle"
                    onChange={handleChange}
                />
                <textarea
                    name="address"
                    placeholder="Address"
                    className="inputStyle"
                    onChange={handleChange}

                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="inputStyle"
                    onChange={handleChange}

                />
                <button className="w-full bg-[#eebbc3] text-[#232946] font-bold p-3 rounded-lg hover:scale-105 transition"  >
                 Register
                </button>
                <p className="text-center mt-5 text-[#232946]">
                    Already have account?
                    <Link to="/" className=" text-[#eebbc3] font-bold ml-2" >
                        Login
                    </Link>
              </p>
            </form>
        </div>
    )
}


export default Register;