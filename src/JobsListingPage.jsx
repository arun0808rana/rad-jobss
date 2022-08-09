import React from "react";
import { useEffect, useState } from "react";

import DummyCompanyLogo from "./assets/company_logo_dummy.png";
import { useDispatch, useSelector } from "react-redux";
import { globalStateActionCreator, setClickedCardID } from "./redux/actions";
import { useNavigate } from "react-router-dom";
import fetchJobs from "./api";

function JobsListingPage({ queryState: { searchQueries, setSearchQueries } }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(1);

  // handles css and formating on tags
  const handleTagsOnCards = (tag = "") => {
    tag = tag.split("_").join(" ").trim();
    tag = tag[0]?.toUpperCase() + (tag?.slice(1) || "");
    return tag;
  };

  //   redirects app to description page with id of the clicked card
  const handleShowDescriptionForCard = (e) => {
    if (e.target.tagName !== "BUTTON") {
      return;
    }
    const cardID = e.target.getAttribute("data-card-id");
    dispatch(setClickedCardID(cardID));
    navigate("/description");
  };

  // effects
  useEffect(() => {
    const getJobs = async () => {
      const res = await fetchJobs(pageNo, searchQueries);
      dispatch(globalStateActionCreator(res?.data?.results));
    };
    getJobs();
  }, [pageNo]);

  if (state && searchQueries && setSearchQueries) {
    return (
      <div style={{width: '1200px'}}>
        {/* {console.log("rendering job listing page")} */}
        <div className="searched-jobs">
          <div className="searched-bar">
            <div className="searched-show">Showing {state.data.length} Jobs</div>
            <div className="searched-sort">
              Sort by:
              <select
                value={searchQueries.sort_by}
                onChange={(e) =>
                  setSearchQueries((prevState) => ({
                    ...prevState,
                    sort_by: e.target.value,
                  }))
                }
                id="sortByID"
              >
                <option value="">Default</option>
                <option value="date">Date</option>
                <option value="relevance">Relevance</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>
          <div className="job-cards" onClick={handleShowDescriptionForCard}>
            {state?.data?.map((job, index) => {
              return (
                <div className="job-card" key={`job-card-${index}`}>
                  <div className="job-card-header">
                    <img
                      src={`https://logo.clearbit.com/${
                        job.company.display_name.split(" ")[0]
                      }.com`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = DummyCompanyLogo;
                      }}
                    />
                  </div>
                  <div className="job-card-title">{job.title}</div>
                  <div className="job-card-subtitle">{job.description}</div>
                  <div className="job-detail-buttons">
                    {job?.contract_time || job?.contract_type ? (
                      <a className="search-buttons detail-button">
                        {handleTagsOnCards(
                          job?.contract_time || job?.contract_type
                        )}
                      </a>
                    ) : null}
                    {job.category.label ? (
                      <a className="search-buttons detail-button">
                        {job.category.label}
                      </a>
                    ) : null}
                  </div>
                  <div className="job-card-buttons">
                    <button
                      className="search-buttons card-buttons"
                      data-card-id={job.id}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}

export default JobsListingPage;
