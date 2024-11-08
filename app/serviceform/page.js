import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  FormGroup,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import districtOptions from "../data";

const vehicleTypeOptions = [
  "Car",
  "Truck",
  "Bus",
  "Bike",
  "CNG",
  "Pic-Up",
  "Trucktor",
  "Auto",
  "Ship",
];

const ServiceForm = ({ open, formClose, selectItem, saveData, updateData }) => {
  const [user, setUser] = useState({
    device_id: "",
    reg_no: "",
    customer_number: "",
    address: "",
    district: "",
    problems: "",
  });

  useEffect(() => {
    setUser({ ...selectItem });
  }, [selectItem]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (selectItem) {
      updateData(user);
    } else {
      saveData(user);
      console.log("Save button clicked");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSwitchChange = (name) => {
    setUser((prevValue) => ({ ...prevValue, [name]: !prevValue[name] }));
  };

  return (
    <Modal
      open={open}
      className="w-[100%] h-[90%] flex items-center justify-center"
    >
      <form
        onSubmit={handelSubmit}
        className="h-[90%] w-[45%] bg-white rounded-md p-2"
      >
        <div className="h-[8%] w-[100%] flex items-center justify-center bg-cyan-600 text-white uppercase">
          {selectItem ? "Update Information" : "Enter Information"}
        </div>
        <div className="h-[83%] w-full items-center justify-cente  overflow-y-scroll p-2">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <TextField
              type="text"
              name="device_id"
              value={user.device_id || ""}
              onChange={handleChange}
              label="Device Id"
              className="w-[75%] mt-4"
            />
            <TextField
              type="text"
              name="reg_no"
              value={user.reg_no || ""}
              onChange={handleChange}
              label="Reg Number"
              className="w-[75%]"
            />
            <TextField
              type="text"
              name="customer_number"
              value={user.customer_number || ""}
              onChange={handleChange}
              label="Customer No"
              className="w-[75%]"
            />
            <TextField
              type="text"
              name="address"
              value={user.address || ""}
              onChange={handleChange}
              label="Address"
              className="w-[75%]"
            />
            <Autocomplete
              className="w-[75%]"
              options={districtOptions}
              value={user.district || ""}
              onChange={(e, newValue) =>
                handleAutocompleteChange("district", newValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="District" />
              )}
            />

            <TextField
              type="text"
              name="problems"
              value={user.problems || ""}
              onChange={handleChange}
              label="Problems"
              className="w-[75%]"
            />
            <div className="w-[75%] h-[55px flex items-center p-3 rounded-md shadow-md">
              Service Complete
              {
                <Switch
                  value={user.is_complete}
                  name="is_complete"
                  onChange={() => handleSwitchChange("is_complete")}
                  checked={user.is_complete}
                />
              }
            </div>
          </div>
        </div>
        <div className="h-[9%] flex items-center justify-end gap-4">
          <button
            type="submit"
            onClick={handelSubmit}
            className="ml-4 h-[60%]  w-[11%] bg-cyan-600 text-white rounded-md"
          >
            {selectItem ? "Update" : "Send"}
          </button>
          <button
            onClick={formClose}
            className=" h-[60%] w-[11%] bg-cyan-600 text-white rounded-md mr-8"
          >
            NO
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceForm;
