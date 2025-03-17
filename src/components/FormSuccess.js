import React from "react";
import useData from "../data";
import { GrMailOption } from "react-icons/gr";

const FormSuccess = () => {
  const data = useData()?.contact;

  return (
    <>
      <GrMailOption size="40%" color="green" className="mx-auto mt-2" />
      <h3>
        <b>{data?.success?.title}</b>
      </h3>
      <p>
        <p className="h5">{data?.success?.subtitle}</p>
      </p>
    </>
  );
};

export default FormSuccess;
