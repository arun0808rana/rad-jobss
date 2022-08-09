import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DummyCompanyLogo from './assets/company_logo_dummy.png';
import JobsListingPage from './JobsListingPage';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import JobDescription from './JobDescription';
import About from './About';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { globalStateActionCreator } from './redux/actions';
import fetchJobs from './api';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);
  const dispatch = useDispatch();
  const [searchQueries, setSearchQueries] = useState({
    what: '',
    where: '',
    salary_min: '',
    salary_max: '',
    full_time: '',
    part_time: '',
    contract: '',
    permanent: '',
    company: '',
    sort_by: ''
  });
  const [isDark, setIsDark] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [state, setState] = useState({ error: null, isLoaded: false, data: [], searchQuery: '', hashtagsArr: [] })

  const handleDarkMode = () => {
    console.log('isDark', isDark)
    setIsDark(!isDark);
  }

  // set salaries min and max
  const handleSalaryRange = (e) => {
    const salryRange = JSON.parse(e.target.value);
    console.log('salary', e.target.defaultChecked);
    setSearchQueries(prevState => ({ ...prevState, salary_max: salryRange.max, salary_min: salryRange.min }))
  }

  // search jobs when user clicks on blue find job btn
  const handleJobSearch = async () => {
    console.log(location.pathname, 'path..');
    if (location.pathname === '/description') {
      navigate('/')
    }
    const res = await fetchJobs(pageNo, searchQueries);
    dispatch(globalStateActionCreator(res?.data?.results));
  }

  // effects
  useEffect(() => {
    console.log('search queries', searchQueries)
  }, [searchQueries])

  return (
    <div className={"dark-container " + (isDark ? 'dark-mode' : '')}>
      {/* {console.log('rendering app')} */}
      <div className="job">
        <div className="header">
          <Link to="/" className="logo">
            RADIUM
          </Link>

          <div className="user-settings">
            <div className={"dark-light "} onClick={handleDarkMode}>
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="search-menu">
            {/* <div className="search-bar">
              <input placeholder='Enter job title' type="text" className="search-box" onChange={(e) => setSearchQueries(prevState => ({ ...prevState, what: e.target.value }))} />
            </div> */}
            <div className="search-location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966" fill="currentColor"
                // stroke="currentColor"
                // strokeWidth={2}
                // strokeLinecap="round"
                strokeLinejoin="round"><path d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" /></svg>


              <input placeholder='Enter job title' type="search" className="search-box" onChange={(e) => setSearchQueries(prevState => ({ ...prevState, what: e.target.value }))} />
            </div>
            <div className="search-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx={12} cy={10} r={3} />
              </svg>
              <input placeholder='Enter location' type="search" className="search-box" onChange={(e) => setSearchQueries(prevState => ({ ...prevState, where: e.target.value }))} />
            </div>
            <div className="search-job">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-briefcase"
              >
                <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
              <input type="search" placeholder="Company Name" onChange={(e) => setSearchQueries(prevState => ({ ...prevState, company: e.target.value }))} />
            </div>
            <div className="search-salary">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth=".4"
              >
                <path
                  d="M12.6 18H9.8a.8.8 0 010-1.5h2.8a.9.9 0 000-1.8h-1.2a2.4 2.4 0 010-4.7h2.8a.8.8 0 010 1.5h-2.8a.9.9 0 000 1.8h1.2a2.4 2.4 0 010 4.7z"
                  stroke="currentColor"
                />
                <path
                  d="M12 20a.8.8 0 01-.8-.8v-2a.8.8 0 011.6 0v2c0 .5-.4.8-.8.8zM12 11.5a.8.8 0 01-.8-.8v-2a.8.8 0 011.6 0v2c0 .5-.4.8-.8.8z"
                  stroke="currentColor"
                />
                <path
                  d="M21.3 23H2.6A2.8 2.8 0 010 20.2V3.9C0 2.1 1.2 1 2.8 1h18.4C22.9 1 24 2.2 24 3.8v16.4c0 1.6-1.2 2.8-2.8 2.8zM2.6 2.5c-.6 0-1.2.6-1.2 1.3v16.4c0 .7.6 1.3 1.3 1.3h18.4c.7 0 1.3-.6 1.3-1.3V3.9c0-.7-.6-1.3-1.3-1.3z"
                  stroke="currentColor"
                />
                <path
                  d="M23.3 6H.6a.8.8 0 010-1.5h22.6a.8.8 0 010 1.5z"
                  stroke="currentColor"
                />
              </svg>
              <input type="number" placeholder="Min. Salary" onChange={(e) => setSearchQueries(prevState => ({ ...prevState, salary_min: e.target.value }))} />
            </div>
            <button className="search-button" onClick={handleJobSearch}>Find Job</button>
          </div>
          <div className="main-container">
            <div className="search-type">
              {/* <div className="alert">
                <div className="alert-title">Create Job Alert</div>
                <div className="alert-subtitle">
                  Create a job alert now and never miss a job
                </div>
                <input type="text" placeholder="Enter job keyword" />
                <button className="search-buttons">Create Job Alerts</button>
              </div> */}
              <div className="job-time">
                <div className="job-time-title">Employment Type</div>
                <div className="job-wrapper">
                  <div className="type-container">
                    <input
                      type="checkbox"
                      id="jobany"
                      className="job-style"
                      checked={!searchQueries.full_time && !searchQueries.contract && !searchQueries.part_time && !searchQueries.permanent}
                      onChange={() => setSearchQueries(ps => ({ ...ps, full_time: '', part_time: '', permanent: '', contract: '' }))}
                    />
                    <label htmlFor="jobany">All Jobs</label>

                  </div>
                  <div className="type-container">
                    <input
                      type="checkbox"
                      id="job1"
                      className="job-style"
                      checked={searchQueries.full_time}
                      onChange={() => setSearchQueries(ps => ({ ...ps, full_time: ps.full_time ? '' : 1 }))}
                    />
                    <label htmlFor="job1">Full Time Jobs</label>

                  </div>
                  <div className="type-container">
                    <input checked={searchQueries.part_time} type="checkbox" id="job2" className="job-style" onChange={() => setSearchQueries(ps => ({ ...ps, part_time: ps.part_time ? '' : 1 }))} />
                    <label htmlFor="job2">Part Time Jobs</label>

                  </div>
                  <div className="type-container">
                    <input checked={searchQueries.permanent} type="checkbox" id="job3" className="job-style" onChange={() => setSearchQueries(ps => ({ ...ps, permanent: ps.permanent ? '' : 1 }))} />
                    <label htmlFor="job3">Permanent</label>

                  </div>
                  <div className="type-container">
                    <input onChange={() => setSearchQueries(ps => ({ ...ps, contract: ps.contract ? '' : 1 }))} checked={searchQueries.contract} type="checkbox" id="job5" className="job-style" />
                    <label htmlFor="job5">Contract</label>

                  </div>
                </div>
              </div>
              <div className="job-time">
                <div className="job-time-title">Salary Range</div>
                <div className="job-wrapper">
                  <div className="type-container">
                    <input name='salary-range' value={`{"min":"", "max":""}`} type="radio" id="sal-any" className="job-style"
                      onChange={handleSalaryRange} />
                    <label htmlFor="sal-any">All Jobs</label>

                  </div>
                  <div className="type-container">
                    <input name='salary-range' value={`{"min":700, "max":1000}`} type="radio" id="sal-1" className="job-style"
                      onChange={handleSalaryRange} />
                    <label htmlFor="sal-1">$700 - $1000</label>

                  </div>
                  <div className="type-container">
                    <input name='salary-range' value={`{"min":1000, "max":1200}`} type="radio" id="sal-2" className="job-style"

                      onChange={handleSalaryRange} />
                    <label htmlFor="sal-2">$1000 - $1200</label>

                  </div>
                  <div className="type-container">
                    <input name='salary-range' value={`{"min":1200, "max":1400}`} type="radio" id="sal-3" className="job-style"

                      onChange={handleSalaryRange} />
                    <label htmlFor="sal-3">$1200 - $1400</label>

                  </div>
                  <div className="type-container">
                    <input name='salary-range' value={`{"min":1500, "max":1800}`} type="radio" id="sal-4" className="job-style"

                      onChange={handleSalaryRange} />
                    <label htmlFor="sal-4">$1500 - $1800</label>

                  </div>
                  <div className="type-container">
                    <input
                      name='salary-range' value={`{"min":2000, "max":3000}`} type="radio"
                      id="sal-5"
                      className="job-style"
                      defaultChecked=""

                      onChange={handleSalaryRange}
                    />
                    <label htmlFor="sal-5">$2000 - $3000</label>

                  </div>
                  <div className="type-container">
                    <input
                      name='salary-range' value={`{"min":3000, "max":4000}`} type="radio"
                      id="sal-6"
                      className="job-style"
                      defaultChecked=""

                      onChange={handleSalaryRange}
                    />
                    <label htmlFor="sal-6">$3000 - $4000</label>

                  </div>
                  <div className="type-container">
                    <input name='salary-range' value={`{"min":4000, "max":5000}`} type="radio" id="sal-7" className="job-style" onChange={handleSalaryRange} />
                    <label htmlFor="sal-7">$4000 - $5000</label>

                  </div>
                </div>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<JobsListingPage queryState={{ searchQueries, setSearchQueries }} />} />
              {/* <Route path="/" element={<About/>} /> */}
              <Route path="description" element={<JobDescription />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
