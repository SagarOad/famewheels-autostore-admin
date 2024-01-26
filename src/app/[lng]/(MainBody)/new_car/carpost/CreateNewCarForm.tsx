"use client"
import { NewProjectInitialValue, NewProjectValidation, ProjectListData } from "@/Data/Application/Project";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
// import { setCreatedData } from "@/Redux/Reducers/ProjectSlice";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { NewCarFormFields } from "./CarFormFields";
import { ProjectSection } from "./ProjectSection";
import { DateSection } from "./DateSection";
import { DescriptionSection } from "./DescriptionSection";
import { ButtonSection } from "./ButtonSection";
import UploadProjectFile from "./UploadProjectFile";
import { ProjectInitialValue } from "@/Types/ProjectType";
import { FormEvent } from "react";

const CreateNewCarForm = () => {
  const router = useRouter();
  // const { createdFormData } = useAppSelector((state) => state.project);
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();
  const randomValue = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  // const newCarSubmit = (values:ProjectInitialValue) => {
  //   console.log("values ==== ",values)
  //   const submittedData = {
  //     coverImage: values.coverImage,
  //     description:values.description,
  //     customers_img1: "3.jpg",
  //     customers_img2: "5.jpg",
  //     customers_img3: "1.jpg",
  //   };
  //   console.log("values",submittedData)
  //   // dispatch(setCreatedData([...createdFormData, submittedData]));
  //   // router.push(`/${i18LangStatus}/project/project_list`);
  // };





  return (
    <>
    {/* // <Formik initialValues={NewProjectInitialValue} validationSchema={NewProjectValidation} onSubmit={newCarSubmit}>
    //   {() => ( */}
      {/* // <Form className="theme-form"> */}
      {/* <UploadProjectFile /> */}
      <NewCarFormFields />
      {/* <ProjectSection />
      <DateSection />
    <DescriptionSection /> */}
    {/* <ButtonSection /> */}
    {/* </Form> */}
    
    {/* //   )}
    // </Formik> */}
    </>
    );
};

export default CreateNewCarForm;
