// no dues form

import React, { useState } from "react";
import Base from "../../Component/Base";
import InputField from "../../Component/InputField";

const NoDueForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [country, setCountry] = useState("");
    const [course, setCourse] = useState("");
    const [branch, setBranch] = useState("");
    const [semester, setSemester] = useState("");
    const [dueAmount, setDueAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [dueReason, setDueReason] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
        "First Name:",
        firstName,
        "Last Name:",
        lastName,
        "Email:",
        email,
        "Phone:",
        phone,
        "Address:",
        address,
        "City:",
        city,
        "State:",
        state,
        "Pincode:",
        pincode,
        "Country:",
        country,
        "Course:",
        course,
        "Branch:",
        branch,
        "Semester:",
        semester,
        "Due Amount:",
        dueAmount,
        "Due Date:",
        dueDate,
        "Due Reason:",
        dueReason
        );
    };
    
    return (
        <Base title="No Due Form">
        <div className="no-due-form bg-background min-h-screen p-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">No Due Form</h2>
            <form onSubmit={handleSubmit}>
            <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">Dues</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current City
                </label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  className="mt-1 p-2 w-full border rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload documents
                </label>
                <input
                  type="file"
                  id="doc1"
                  className="  my-2    file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      "
                />
                <input
                  type="file"
                  id="doc2"
                  className="    my-2  file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      "
                />
                <input
                  type="file"
                  id="doc3"
                  className=" my-2     file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      "
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </form>
        </div>
        </Base>
    );
}

export default NoDueForm;
                