import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Spinner from "../components/spinner/spinner";

export default function Home() {

  const [title, setTitle] = useState("bored ape");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UBIQUITY_API_KEY}`,
    },
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/collections/search?name=${title}&page_size=20`,
        config
      );

      if (res.status === 200) {
        console.log(res.data.data);
        setResults(res.data.data);
        setErrorMessage('Yoo! You just Search for the wrong Nft, Use the right word!');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col px-5 md:px-12 px-4  font-spacemono items-center min-h-screen shadow-sm bg-gradient-to-r from-[#04091E] to-[#00D0CC] pb-20">
        <h1 className="md:text-6xl text-4xl font-bold text-white mt-10">
          <span className="text-active">Nift</span> NFT Explorer
        </h1>
        <h2 className="text-[#f48700] text-2xl font-normal mt-6 font-ebas">
          {/* Search for NFTcollections in 5+networks */}
          Search for NFT collections and Assets
        </h2>

        <h2 className="text-stone-200 text-xl font-light mt-6 font-ebas">
          Power by {" "}
          <b>
            <a target="_blank" href="https://blockdaemon.com/documentation/" rel="noopener noreferrer">
             Ubiquity API
            </a>
          </b>, Brought to you by <b>TeamUp</b>
        </h2>
        <form
          className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSearch();
          }}
        >
          <input
            type="text"
            className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-light focus:outline-none focus:ring-2 focus:ring-active"
            placeholder="Enter the NFT collection name"
            defaultValue={title} // Default to 'bored ape'
            onChange={(e) => {
              setTitle(e.target.value); // Store keyword in the state
            }}
          />

          <div className="mt-4 sm:mt-0 sm:ml-3">
            <button
              className="block w-full rounded-lg px-5 py-3 bg-orange-500 text-white font-bold focus:outline-none focus:ring-2 focus:ring-white sm:px-10"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        {/* display search results */}
        {loading ? (
          <div className="h-[300px] w-[100px]">
            <Spinner />
          </div>
        ) : (
          <>
          {results?.length > 0? 
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
            {results?.map((data) => {
              return (
                <div
                  className="bg-white rounded-md p-4 shadow-md"
                  key={data.id}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className="w-[60px] h-[60px] rounded-full bg-black"
                      style={{
                        backgroundImage: `url(
                          https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${data.logo}?apiKey=${process.env.NEXT_PUBLIC_UBIQUITY_API_KEY}
                        )`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      title="logo"
                    ></div>
                    <button className="bg-[#00D0CC] px-2 py-1 rounded-md text-[#04091E]">
                      {data.verified ? "Verified" : "Unverified"}
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <div>
                      <p>Name:</p>
                      <p>Address:</p>
                    </div>
                    <div>
                      <Link href={`/${data.name}`} passHref>
                        <p
                          className="truncate text-ellipsis overflow-hidden max-w-[100px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[180px] xl:max-w-[180px] cursor-pointer"
                          title={data?.name}
                        >
                          {data.name}
                        </p>
                      </Link>

                      <p
                        title={data?.contracts[0]}
                        className="text-ellipsis overflow-hidden max-w-[100px] md:max-w-[100px] lg:max-w-[140px] xl:max-w-[180px]"
                      >
                        {data?.contracts[0]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
             {/* <>
           
            </> */}
          </div>
           : <div className="mt-10 bg-red rounded-sm p-4 shadow-md"> 
           {errorMessage && (
               <p className="text-white"> {errorMessage} </p>
             )}
             </div>
             }
          </>
        )}
        

        {/* <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/token/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/5e1f4454-34ff-5118-9987-96b481625128.png"
          alt="lkjhbjg"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/token/0x0c3A405727dEa8C9FA51FD931ed223535412F7Ac/6fb9df73-db2a-5692-9f06-b686ff4781b7.jpeg"
          alt="head"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/003cdb84-487a-57dc-aae7-8832d7e12a08/logo.gif"
          alt="logo"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/4203aedd-7964-5fe1-b932-eb8c4fda7822/logo.png"
          alt="logo2"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/b0c32713-c156-5e38-af4c-a8d49e0ee47e/logo.jpeg"
          alt="logo3"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/4203aedd-7964-5fe1-b932-eb8c4fda7822/logo.png"
          alt="logo4"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/d62be211-793a-581f-9850-4b4785ea89f6/logo.png"
          alt="logo5"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/d6703e72-444f-571b-a5fa-1ae82fd7d621/logo.jpeg"
          alt="logo6"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/4427469a-f83c-540e-8ec0-7c62eb5eb01a/logo.jpeg"
          alt="logo7"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/collection/8d62671f-f2c5-5f7f-8fc6-6c6f0b54dc6c/logo.png"
          alt="logo8"
        />
        <img
          src="https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/token/0x0c3A405727dEa8C9FA51FD931ed223535412F7Ac/4acae743-0516-508f-b3bb-81c3403a2f5b.gif"
          alt="logo9"
        /> */}
      </div>
    </>
  );
}

