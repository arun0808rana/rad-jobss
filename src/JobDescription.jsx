import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DummyCompanyLogo from "./assets/company_logo_dummy.png";

function JobDescription() {
  const state = useSelector((state) => state);

  //   finding the current element in state.data using its unquie id.
  const currentCardJob = state.data?.find(
    (job) => job.id == state.clickedCardID
  );

  if (currentCardJob) {
    return (
      <div className="wrapper detail-page">
        {/* {console.log("rendering description page")} */}
        <div className="job-overview">
          <div className="job-explain">
            <img
              className="job-bg"
              src={`https://unsplash.it/640/425?image=${Math.floor(
                Math.random() * 10
              )}`}
            />
            <div className="job-logos">
              <img
                src={`https://logo.clearbit.com/${
                  currentCardJob.company.display_name.split(" ")[0]
                }.com`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = DummyCompanyLogo;
                }}
              />
            </div>
            <div className="job-explain-content">
              <div className="job-title-wrapper">
                <div className="job-description-title">
                  {currentCardJob.title}
                </div>
                <div className="job-action">
                  <svg
                    className="heart"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-share-2"
                  >
                    <circle cx={18} cy={5} r={3} />
                    <circle cx={6} cy={12} r={3} />
                    <circle cx={18} cy={19} r={3} />
                    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                  </svg>
                </div>
              </div>
              <div className="job-subtitle-wrapper">
                <div className="company-name">
                  {currentCardJob.company.display_name}
                  <span className="comp-location">
                    {currentCardJob.location.display_name}
                  </span>
                </div>
                <div className="posted">
                  Posted on {currentCardJob.created.substring(0, 10)}
                </div>
              </div>
              <div className="explain-bar">
                <div className="explain-contents">
                  <div className="explain-title">Experience</div>
                  <div className="explain-subtitle">Minimum 1 Year</div>
                </div>
                <div className="explain-contents">
                  <div className="explain-title">Job Type</div>
                  <div className="explain-subtitle">
                    {currentCardJob.category.label}
                  </div>
                </div>
                {/* <div className="explain-contents">
                  <div className="explain-title">Employee Type</div>
                  <div className="explain-subtitle">Full Time Jobs</div>
                </div> */}
                <div className="explain-contents">
                  <div className="explain-title">Offer Salary</div>
                  <div className="explain-subtitle">
                    ${currentCardJob.salary_min} - ${currentCardJob.salary_max}
                  </div>
                </div>
              </div>
              <div className="overview-text">
                <div className="overview-text-header">Job Description</div>
                {currentCardJob.description}
              </div>
              <a
                href={currentCardJob.redirect_url}
                target="_blank"
                className="search-buttons card-buttons apply-button"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else return "Loading";
}

export default JobDescription;
