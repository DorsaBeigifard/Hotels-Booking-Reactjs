import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function HotelsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;

  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  // q searches the whole data

  if (isLoading) return <p>Loading... </p>;

  return (
    <div className="searchList flex flex-col gap-4">
      <h2 className="text-lg font-bold mb-4">Search Result ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem flex gap-4">
              <img
                src={item.thumbnail_url}
                alt={item.name}
                className="rounded-2xl w-24 h-24 object-cover"
              />
              <div className="searchItemDesc">
                <p className="Location font-semibold hover:text-blue-700 transition-all ease-in-out delay-300">
                  {item.smart_location}
                </p>
                <p className="name text-gray-500 mb-2">{item.name}</p>
                <p className="price font-semibold">
                  €&nbsp;{item.price}{" "}
                  <span className="text-gray-500 font-normal text-sm">
                    per night
                  </span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default HotelsPage;
