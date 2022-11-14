import axios from "axios";
import { useRouter } from "next/router";
import Link from 'next/link'

export default function Assets({ assets, name }) {
  //   if (assets) {
  //     console.log(assets);
  //   }
  const router = useRouter();

  return (
    <div className="font-spacemono min-h-screen shadow-sm bg-gradient-to-r from-[#04091E] to-[#00D0CC] pb-20">
      <div className="max-w-[1300px] px-5 md:px-10 mx-auto pt-10">
        <button
          className="px-4 py-1 bg-orange-500 rounded-md"
          onClick={() => router.back()}
        >
          Back
        </button>
        <h1 className="text-3xl md:text-4xl text-white mt-5">
          List of Assets by {name} Collection
        </h1>
      </div>
      <div className="max-w-[1300px] px-5 md:px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
        {assets?.map((asset) => {
          return (
            <div key={asset.id} className="bg-white rounded-md shadow-md">
              <div
                className="h-[200px] w-[100%] bg-black rounded-t-md"
                style={{
                  backgroundImage: `url(
                    https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/media/${asset.image_url}?apiKey=${process.env.NEXT_PUBLIC_UBIQUITY_API_KEY}
                  )`,

                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></div>
              <div className="p-4 pb-8">
                <div className="flex gap-3">
                  <div>
                    <p>Name:</p>
                    <p>Address:</p>
                    <p>Burned:</p>
                  </div>
                  <div>
                    <p
                      className="truncate text-ellipsis overflow-hidden max-w-[200px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[180px] xl:max-w-[180px]"
                      title={asset?.name}
                    >
                      {asset.name}
                    </p>
                    <p
                      title={asset?.contract_address}
                      className="text-ellipsis overflow-hidden max-w-[210px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[180px] xl:max-w-[180px]"
                    >
                      {asset?.contract_address}
                    </p>
                    <p>{asset.burned ? "true" : "false"}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const { name } = params;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UBIQUITY_API_KEY}`,
    },
  };

  const res = await axios.get(
    `https://svc.blockdaemon.com/nft/v1/ethereum/mainnet/assets?collection_name=${name}&page_size=20`,
    config
  );

  const data = res.data.data;

  return {
    props: {
      assets: data,
      name,
    },
  };
}
