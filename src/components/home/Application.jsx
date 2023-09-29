const Application = () => {
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
    <div>
      <div className="text-center max-w-[600px] mx-auto mt-6">
        <h2 className="mb-6 headline text-[#5f27cd]">Application</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 px-3 md:grid-cols-2 md:px-5 lg:px-0 lg:grid-cols-4 justify-justify-between">
        {applicationData.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded shadow">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-auto mb-2"
            />
            <h3 className="text-lg font-bold text-center">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Application;
