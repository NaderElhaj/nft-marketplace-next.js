/* eslint-disable import/no-unresolved */
import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard, NftCard } from '@/components';
import images from '../assets';
import { makeId } from '@/utils/makeId';
import { NFTContext } from '@/context/NFTContext';

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);

  const [hideButtons, setHideButtons] = useState(false);
  const [nfts, setNfts] = useState([]);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };
  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
    });
  }, []);
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };
  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });
  return (
    <div className="flex justify-center sm:px-4 px-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          parentStyles="justify-start mb-7 h-72 sm:h-60 p-12 xl:p-4 xs:h-44 rounded-3xl "
          childStyles="md:text-4xl sm:text-2xl xs:text-xl"
          name="Discover,collect,and sell extraordinary NFTs"
        />

        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Top Sellers</h1>
          <div
            className="relative flex-1 max-w-full flex mt-3
        "
            ref={parentRef}
          >
            <div className="  flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}

                />
              ))}
              {!hideButtons && (
              <>

                <div
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  onClick={() => handleScroll('left')}
                >
                  <Image
                    src={images.left}
                    layout="fill"
                    objectFit="contain"
                    alt="Left_Arrow"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <div
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  onClick={() => handleScroll('right')}
                >
                  <Image
                    src={images.right}
                    layout="fill"
                    objectFit="contain"
                    alt="Left_Arrow"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>

              </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10  w-fit  ">
          <div className="  flexBetween  mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className=" flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4 ">Hot Bids</h1>
            <div className="">
              SearchBar
            </div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => <NftCard key={nft.tokenId} nft={nft} />)}
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (

              <NftCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.534).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  desc: 'Cool new NFT on sale',

                }}
              />
            ))} */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
