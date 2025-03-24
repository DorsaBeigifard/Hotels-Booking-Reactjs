import { useHotels } from "../context/HotelsProvider";

function Map() {
  const { isLoading, hotels } = useHotels();
  return <div className="map bg-amber-800 flex-1">map</div>;
}

export default Map;
