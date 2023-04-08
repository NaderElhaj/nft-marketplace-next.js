import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Loader, Button, Input } from '@/components';
import { NFTContext } from '@/context/NFTContext';

const ResellNft = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const router = useRouter();
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);
  const resell = async () => {
    await createSale(tokenURI, price, true, id);
    router.push('/');
  };
  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">

        <Loader />
      </div>
    );
  }
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell NFT</h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}

        />
        {image && <img src={image} className="rounded mt-4 " width={350} />}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}

          />
        </div>
      </div>
    </div>
  );
};

export default ResellNft;
