// update profile form

import React, { useState } from "react";
import InputField from "../../Component/InputField";
import Base from "../../Component/Base";

const Update = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [adhaarNumber, setadhaarNumber] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [apaarId, setapaarId] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
      <Base>
        <div className="bg-background flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col font-semibold text-slate-700"
            >
              <h1 className="z-10 self-start -mt-1.5 text-3xl">
                Update Profile
              </h1>

                <InputField
                    label="First Name"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                />
                <InputField
                    label="Last Name"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                />
                <InputField
                    label="Date of Birth"
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                    required
                />
                <InputField
                    label="Adhaar Number"
                    id="adhaarNumber"
                    type="number"
                    value={adhaarNumber}
                    onChange={(e) => setadhaarNumber(e.target.value)}
                    required
                />
                <InputField
                    label="Contact Number"
                    id="contactNumber"
                    type="number"
                    value={contactNumber}
                    onChange={(e) => setcontactNumber(e.target.value)}
                    required
                />
                <InputField
                    label="Apaar ID"
                    id="apaarId"
                    type="text"
                    value={apaarId}
                    onChange={(e) => setapaarId(e.target.value)}
                    required
                />
                <div className="text-center">
                <img
                    src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full shadow-lg"
                />
                </div>
                <div className="text-center">
                <button
                    className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300"
                >
                    Update Profile
                </button>
                </div>

              
            </form>
          </div>
        </div>
      </Base>
    );
}

export default Update;