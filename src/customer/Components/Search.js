import algoliasearch from "algoliasearch/lite";
import React, { useRef } from "react";
import {
  Configure,
  HierarchicalMenu,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
  ToggleRefinement,
  Highlight,
  Snippet,
} from "react-instantsearch";
import classNames from "classnames";

import {
  AlgoliaSvg,
  ClearFilters,
  ClearFiltersMobile,
  NoResults,
  NoResultsBoundary,
  Panel,
  PriceSlider,
  Ratings,
  ResultsNumberMobile,
  SaveFiltersMobile,
} from "./components";
import { ScrollTo } from "./components/ScrollTo";
// import getRouting from "./routing";
import { formatNumber } from "./utils";
import "./Theme.css";
import "./App.css";
import "./components/Pagination.css";
import "./App.mobile.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import Spinner from "./Spinners/Spinner";

const searchClient = algoliasearch(
  "3BP6P78G2Y",
  "1903a10f4bc35dca44f99e43d8c51a99"
);

const indexName = "jayJays";
// const routing = getRouting(indexName);

export function App() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const searchBoxRef = useRef(null);

  function openFilters() {
    document.body.classList.add("filtering");
    window.scrollTo(0, 0);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("click", onClick);
  }

  function closeFilters() {
    document.body.classList.remove("filtering");
    containerRef.current.scrollIntoView();
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("click", onClick);
  }

  function onKeyUp(event) {
    if (event.key !== "Escape") {
      return;
    }

    closeFilters();
  }

  function onClick(event) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }

  return (
    <div className="mt-0">
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        // routing={routing}
        insights={true}
      >
        <header className="header" ref={headerRef}>
          <p className="header-logo">{/* <AlgoliaSvg /> */}</p>
          <div ref={searchBoxRef}>
            <SearchBox
              placeholder="Categories, price, color, …"
              submitIconComponent={SubmitIcon}
            />
          </div>
        </header>

        <Configure
          attributesToSnippet={["description:10"]}
          snippetEllipsisText="…"
          removeWordsIfNoResults="allOptional"
        />

        <ScrollTo>
          <main className="container" ref={containerRef}>
            <div className="container-wrapper">
              <section className="container-filters" onKeyUp={onKeyUp}>
                <div className="container-header">
                  <h2>Filters</h2>
                  <div className="clear-filters" data-layout="desktop">
                    <ClearFilters />
                  </div>
                  <div className="clear-filters" data-layout="mobile">
                    <ResultsNumberMobile />
                  </div>
                </div>
                <div className="container-body">
                  <Panel header="Color">
                    <RefinementList attribute="color" showMore />
                  </Panel>
                  <Panel header="Gender">
                    <RefinementList attribute="gender" />
                  </Panel>
                  <Panel header="Categories">
                    <RefinementList attribute="categories" showMore />
                  </Panel>
                  <Panel header="Price">
                    <PriceSlider attribute="price" />
                  </Panel>

                  <Panel header="Free shipping">
                    <ToggleRefinement
                      attribute="free_shipping"
                      label="Display only items with free shipping"
                      on={true}
                    />
                  </Panel>

                  <Panel header="Ratings">
                    <Ratings attribute="rating" />
                  </Panel>

                  {/* <Panel header="Ratings">
                  <Ratings attribute="rating" />
                </Panel> */}
                </div>
              </section>
              <footer className="container-filters-footer" data-layout="mobile">
                <div className="container-filters-footer-button-wrapper">
                  <ClearFiltersMobile containerRef={containerRef} />
                </div>
                <div className="container-filters-footer-button-wrapper">
                  <SaveFiltersMobile onClick={closeFilters} />
                </div>
              </footer>
            </div>
            <section
              className="container-results"
              //  bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg"
            >
              <header className="container-header flex justify-between items-center mb-6">
                <SortBy
                  className="container-option bg-white text-gray-700 py-3 px-5 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  items={[
                    { label: "Sort By", value: "jayJays" },
                    { label: "Price Ascending", value: "jayJays_price_asc" },
                    { label: "Price Descending", value: "jayJays_price_desc" },
                  ]}
                />
                <HitsPerPage
                  className="container-option bg-white text-gray-700 py-3 px-5 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  items={[
                    { label: "16 Hits per Page", value: 16, default: true },
                    { label: "32 Hits per Page", value: 32 },
                  ]}
                />
              </header>

              <NoResultsBoundary fallback={<NoResults />}>
                <Hits hitComponent={Hit} />
              </NoResultsBoundary>

              <footer className="container-footer mt-6 flex justify-center">
                <Pagination
                  padding={2}
                  showFirst={false}
                  showLast={false}
                  className="flex space-x-2"
                  render={(props) => (
                    <button
                      {...props}
                      className="pagination-button bg-white text-gray-700 py-2 px-4 rounded-full shadow-lg transition transform hover:scale-110 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    />
                  )}
                />
              </footer>
            </section>
          </main>
        </ScrollTo>
        <aside data-layout="mobile">
          <button
            className="filters-button"
            data-action="open-overlay"
            onClick={openFilters}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
              <path
                d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
                stroke="#fff"
                strokeWidth="1.29"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </aside>
      </InstantSearch>
    </div>
  );
}

function SubmitIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.67"
        transform="translate(1 1)"
      >
        <circle cx="7.11" cy="7.11" r="7.11" />
        <path d="M16 16l-3.87-3.87" />
      </g>
    </svg>
  );
}

function Hit({ hit }) {
  const navigate = useNavigate();

  // const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   if (hit) {
  //     setLoading(false);
  //   }
  // }, [hit]);

  const handleProduct = (id) => {
    if (id.length >= 19) {
      navigate(`/product/${id}`);
      return;
    }
    return toast.error(`Product Out Of Stock (ID: ${id})`, {
      duration: 3000, // 3 seconds
      position: "top-right",
      style: {
        background: "#f87171", // Tailwind red-400
        color: "#ffffff", // Tailwind white
        padding: "10px 20px",
        borderRadius: "0.5rem", // Tailwind rounded-md
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind shadow-lg
      },
      iconTheme: {
        primary: "#ffffff", // Tailwind white
        secondary: "#f87171", // Tailwind red-400
      },
    });
  };

  return (
    <>
      {/* {loading ? (
        <Spinner />
      ) : ( */}
      <Toaster />
      <article className="hit" onClick={() => handleProduct(hit.id)}>
        <header className="hit-image-container relative">
          <img src={hit.image} alt={hit.name} className="hit-image" />
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded flex items-center">
            {hit.rating}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              className="inline-block ml-1"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
              />
            </svg>
          </span>
        </header>
        <div className="hit-info-container">
          <p className="hit-category">{hit.categories[0]}</p>
          <h1>{hit.name}</h1>
          <footer>
            <p>
              <span className="hit-em">$</span>{" "}
              <strong>{formatNumber(hit.price)}</strong>
            </p>
          </footer>
        </div>
      </article>

      {/* )} */}
    </>
  );
}

export default App;
