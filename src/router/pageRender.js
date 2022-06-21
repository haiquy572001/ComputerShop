import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useMyContext } from "../context/store";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;
  console.log(component);

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const [{ auth }] = useMyContext();

  let pageName = "";

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;
