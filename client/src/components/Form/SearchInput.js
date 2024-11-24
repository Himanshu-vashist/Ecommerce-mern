import React from "react";
import { useSearch } from "../../context/search";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  // Safely destructure search context with default values
  const searchContext = useSearch();
  const [values = { keyword: "", results: [] }, setValues = () => {}] = 
    Array.isArray(searchContext) ? searchContext : [{ keyword: "", results: [] }, () => {}];
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword || ""}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;