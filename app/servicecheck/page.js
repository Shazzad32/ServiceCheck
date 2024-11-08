"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import ServiceTable from "../servicetable/page";
import ServiceForm from "../serviceform/page";
import ServiceDelete from "../servicedelete/page";
import axios from "axios";

const ServiceCheck = () => {
  const [state, setState] = useState({
    datas: [],
    open: false,
    deleteOpen: false,
    dataResults: [],
    searchItem: "",
    selectItem: null,
  });

  useEffect(() => {
    getData();
  }, [getData]);

  const getData = () => {
    axios
      .get("http://localhost:3000/api/service-check")
      .then((res) => {
        let data = res.data;
        console.log(data);
        let old = { ...state };
        old.datas = data;
        old.dataResults = data;
        setState(old);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveData = (item) => {
    axios
      .post("http://localhost:3000/api/service-check/", item)
      .then((x) => {
        let old = { ...state };
        old.open = false;
        old.datas = [...old.datas, x.data];
        setState(old);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateData = (item) => {
    axios
      .put("http://localhost:3000/api/service-check/", item)
      .then((response) => {
        let old = { ...state };
        old.open = false;
        old.datas = old.datas.map((dataItem) =>
          dataItem._id === item._id ? response.data : dataItem
        );
        setState(old);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = (id) => {
    axios
      .delete("http://localhost:3000/api/service-check/", { data: { id } })
      .then(() => {
        let old = { ...state };
        old.datas = old.datas.filter((item) => item._id !== id);
        setState(old);
      })
      .catch((err) => {
        console.error("Error deleting data:", err);
      });
  };

  const formOpen = () => {
    const old = { ...state };
    old.open = true;
    setState(old);
  };
  const onEditOpen = (user) => {
    const old = { ...state };
    old.selectItem = user;
    console.log("select item is ", old.selectItem);
    old.open = true;
    setState(old);
  };

  const onDeleteOpen = (user) => {
    const old = { ...state };
    old.deleteOpen = true;
    old.selectItem = user;
    console.log("delete click", user);
    setState(old);
  };

  const formClose = () => {
    const old = { ...state };
    old.open = false;
    setState(old);
  };

  const onDeleteClose = () => {
    const old = { ...state };
    old.deleteOpen = false;
    setState(old);
  };

  const searchText = (e) => {
    let searchTxt = e.target.value.toLowerCase();
    console.log(searchTxt);
    let old = { ...state };
    console.log("seract", old);
    if (searchTxt === "") {
      old.datas = [...old.dataResults];
    } else {
      old.datas = [...old.dataResults].filter((x) => {
        return (
          (x.device_id &&
            x.device_id.toLowerCase().includes(searchTxt.toLowerCase())) ||
          (x.customer_number &&
            x.customer_number
              .toLowerCase()
              .includes(searchTxt.toLowerCase())) ||
          (x.district &&
            x.district.toLowerCase().includes(searchTxt.toLowerCase()))
        );
      });
    }
    old.searchItem = searchTxt;
    console.log(old.searchItem);
    setState(old);
  };

  return (
    <div className="h-[100vh] w-full bg-green-600 flex flex-col items-center justify-center">
      <div className="h-[10vh] w-full bg-cyan-800 flex">
        <div className="h-full w-[20%] flex items-center">
          <button className="p-2 ml-4 bg-white text-black rounded-md uppercase">
            <Link href="/sim">Robi</Link>
          </button>
        </div>
        <div className="h-full w-[50%] lg:text-lg md:text-md sm:text-[10px] flex items-center justify-center uppercase text-white">
          welcome to service check platform
        </div>
        <div className="h-full w-[30%] flex items-center justify-center gap-4">
          <button
            onClick={formOpen}
            className="bg-white p-3 text-black rounded-md"
          >
            <FaPlus className="" />
          </button>
          <input
            value={state.searchItem}
            onChange={searchText}
            type="search"
            placeholder="Search..."
            className="h-[40px] p-2 text-black border-none rounded-md"
          ></input>
        </div>
      </div>
      <div className="h-[90vh] w-full bg-cyan-400 flex items-center justify-center">
        <div className="h-[98%] w-[99%] bg-white">
          <div className="h-[8%] w-full bg-cyan-900 flex text-white">
            <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
              className="uppercase"
            >
              <p style={{ flex: 1.2 }}>Device id</p>
              <p style={{ flex: 1.5 }}>Reg No</p>
              <p style={{ flex: 1.2 }}>Customer No</p>
              <p style={{ flex: 1 }}>District</p>
              <p style={{ flex: 1 }}>Address</p>
              <p style={{ flex: 1.5 }}>Problems</p>
            </div>
            <div className="w-[20%] h-full flex uppercase items-center justify-center">
              Action
            </div>
          </div>
          <div className="h-[92%] w-full">
            {state.datas.map((item, i) => {
              return (
                <ServiceTable
                  key={i}
                  item={item}
                  onDeleteOpen={onDeleteOpen}
                  onEditOpen={onEditOpen}
                  deleteData={deleteData}
                />
              );
            })}
          </div>
        </div>
      </div>
      {state.open && (
        <ServiceForm
          open={state.open}
          formClose={formClose}
          saveData={saveData}
          updateData={updateData}
          selectItem={state.selectItem}
        />
      )}
      {state.deleteOpen && (
        <ServiceDelete
          open={state.deleteOpen}
          selectItem={state.selectItem}
          onDeleteClose={onDeleteClose}
        />
      )}
    </div>
  );
};

export default ServiceCheck;
