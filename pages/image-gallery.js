/*
Exercise: import the `useSWR` hook from the swr package. Once it's imported,
you'll need to use it to consume the `/api/gallery` serverless function. Once
that's ready, make sure to display the images using the `CldImage` component.
*/
// make the import here

import CldImage from '../components/CldImage';
import DisplayError from '../components/DisplayError';
import Loading from '../components/Loading';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ImageGallery() {
  // Destructure data and error from the useSWR hook here. The first parameter
  // of useSWR is the serverless function and the second is the custom
  // fetch method (fetcher)
  // Add the destructuring below
  if (error) return <DisplayError error={error.info} />;
  if (!data) return <Loading />;

  return (
    <div className="mx-auto p-8">
      <div className="flex flex-row flex-wrap -mx-2">
        {data.results.map((result, i) => {
          return (
            <div
              className="xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-full sm:w-full w-full mb-4 sm:mb-4 px-2"
              key={i}
            >
              {/* Add the CldImage component here passing the following two props: `publicId` and `gallery`. `publicId` should have the value of `result.public_id` and `gallery` accepts a boolean, set it to `true`*/}
              <CldImage publicId={result.public_id} gallery={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
