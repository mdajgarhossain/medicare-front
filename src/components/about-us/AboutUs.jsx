import Brand from "../brand/Brand";

const AboutUs = () => {
  const applicationData = [
    { id: 1, img: "images/application/app-1.jpeg", title: "Medical" },
    { id: 2, img: "images/application/app-2.jpeg", title: "Pharmaceuticals" },
    { id: 3, img: "images/application/app-3.jpeg", title: "Beverage" },
    { id: 4, img: "images/application/app-4.jpeg", title: "Agriculture" },
    { id: 5, img: "images/application/app-5.jpeg", title: "Sea-water" },
    {
      id: 6,
      img: "images/application/app-6.jpeg",
      title: "Hotel and Apartment",
    },
    { id: 7, img: "images/application/app-7.jpeg", title: "Industrial" },
    { id: 8, img: "images/application/app-8.jpeg", title: "Boiler" },
  ];

  return (
    <div className="bg-[#bdc3c7] ">
      <div className="pt-3">
        <div className=" bg-[#bdc3c7]">
          <h2 className="headline text-[#5f27cd] py-2">About us</h2>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-3 lg:pb-10">
        <div className="lg:flex">
          <div className="lg:w-3/5 lg:max-h-[750px] lg:overflow-y-scroll lg:mr-14 md:px-5 px-3">
            <p className="text-[18px] text-justify lg:pr-2">
              <span className="font-semibold"> Medicare International</span> as
              a Water treatment plant and medical equipment supplying and
              manufacturing company, also supplying water ¬filtration media,
              water filter, medical disposable and solar panel began as a vision
              in the early 2020 to provide efficient, high grade water treatment
              solutions for people, hospital and places all over the world. From
              its humble beginnings as a one man engineer shop to today’s full
              factory with a team of top engineers, sales and support staff that
              vision has remained the same. <br /> <br /> A water treatment
              supplier and manufacturer and also supply water fi¬ltration media,
              water ¬filter, medical disposable and solar panel that has always
              prided itself on using top of the line components from Dow
              Filmtech membrane, Hydranautics membrane, Toray membrane, GE
              membrane, Koch membrane, Grundfos, CNP, China land, SMA, JFY,
              Outback and many more. A company that has consistently embraced
              ethical business practices at every point in the design, build and
              delivery, and a company that has a well-rounded, multi-lingual
              team of passionate people behind every facet and weld going into
              these industrial / commercial / medical grade water purification
              systems. <br /> <br />
              <span className="font-semibold">Business Scope:</span> Water
              treatment plant, Seawater desalination plant, solar powered water
              treatment plant, Solar Panel, Solar Controller, Solar Inverter,
              medical equipment, medical disposable.
              <br /> <br />
              <span className="font-semibold">Medicare International </span> is
              specialized in designing & manufacturing commercial, industrial,
              medical grade reverse osmosis (RO) water treatment and
              purification systems for over 15 years and also supply Medical
              equipment, medical disposable and solar panel.
              <br /> <br />
              Our engineers design & build customized water treatment plant and
              puri¬fication systems including water softeners, waste water
              treatment, sewage treatment, RO water fi¬ltration, UV water
              purifi¬cation, reverse osmosis plants, brackish and tap water
              reverse osmosis systems, sea water reverse osmosis systems, Nano
              ¬filtration systems, Ultra-fi¬ltration systems, RO cleaning skids,
              cartridge ¬filters housing, Deionizers, containerized equipment,
              electrodeionization (EDI) units, and chemical dosing, Water
              desalination plant, Solar based water treatment plant, Green solar
              desalination plant, solar panel, inverter etc
            </p>
          </div>
          <div className="lg:w-2/5">
            <div className="grid gap-5 px-3 mt-4 md:grid-cols-2 lg:ml-5 lg:h-fit md:px-5 lg:mt-0">
              {applicationData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded shadow"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto mb-2"
                  />
                  <h3 className="text-lg font-bold text-center">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#bdc3c7]">
        <div className="max-w-[1200px] mx-auto">
          <Brand />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
