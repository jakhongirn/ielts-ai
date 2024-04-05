import algoliasearch from "algoliasearch";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import CustomHits from "./CustomHits";
import SearchBox from "./CustomSearchBox";
import EmptyState from "./EmptyState";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID as string;
const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX as string;

const algoliaClient = algoliasearch(APP_ID, API_KEY);

type Props = {
  searchModalOpen: boolean;
  setSearchModalOpen: (value: boolean) => void;
};

const GlobalSearchModal = (props: Props) => {
  const { searchModalOpen, setSearchModalOpen } = props;

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        setSearchModalOpen(false);
      }
    }

    if (searchModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchModalOpen, setSearchModalOpen]);

  return (
    <>
      {searchModalOpen && (
        <div className="fixed left-0 top-0 z-[99999] flex h-full min-h-screen w-full justify-center bg-[rgba(0,0,0,0.25)] px-4 py-[12vh] backdrop-blur-sm">
          <div className="modal-content relative w-full max-w-[600px] overflow-y-auto rounded-xl bg-white dark:bg-black">
            <div> 
              <InstantSearch
                insights={false}
                searchClient={algoliaClient}
                indexName={INDEX}
              >
                <SearchBox />
                <EmptyState />
                <Hits
                  hitComponent={(props) => (
                    <CustomHits
                      {...props}
                      setSearchModalOpen={setSearchModalOpen}
                    />
                  )}
                />
              </InstantSearch>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSearchModal;
