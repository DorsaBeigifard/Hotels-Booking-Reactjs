import {
  GlobeAsiaAustraliaIcon,
  StarIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function Features() {
  return (
    <div className="container mx-auto section-spacing">
      <div className=" grid grid-cols-2  md:grid-cols-4 gap-8">
        <div className="featureItem px-2 sm:px-1 flex flex-col items-center justify-start text-center">
          <GlobeAsiaAustraliaIcon className="featureIcon" />

          <h3>Find Your Stay</h3>
          <p>Discover and book top-rated hotels worldwide with ease.</p>
        </div>
        <div className="featureIt px-2 sm:px-1 flex flex-col items-center justify-start text-center">
          <StarIcon className="featureIcon" />
          <h3>Best Deals</h3>
          <p>
            Get the best prices on luxury resorts, budget stays, and everything
            in between.
          </p>
        </div>
        <div className="featureIte px-2 sm:px-1 flex flex-col items-center justify-start text-center">
          <PencilSquareIcon className="featureIcon" />
          <h3>Plan Your Stay</h3>
          <p>
            Customize your hotel experience—solo or group bookings, all at your
            fingertips.
          </p>
        </div>
        <div className="featureIte px-2 sm:px-1 flex flex-col items-center justify-start text-center">
          <CheckCircleIcon className="featureIcon" />
          <h3>Easy Booking</h3>
          <p>
            Enjoy a smooth and secure reservation process with instant
            confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
