import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import CourseHome from "../../../components/Course/CourseHome";
import Layout from "../../../components/Layout/Layout";

const CourseCategory = () => {
  const [data, setData] = useState([]);

  const router = useRouter();

  const { category } = router.query;

  useEffect(() => {
    axios
      .get(`https://app.metabillionaire.com/api/getAllCourses?category=${category}`)
      .then((res) => {
        console.clear();
        console.log("Fetch", res);
        setData(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [category]);

  return (
    <Layout>
      <CourseHome category={category} data={data} />
    </Layout>
  );
};

export default CourseCategory;
