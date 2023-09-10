const Service = () => {
  const serviceData = [
    { id: 1, img: "images/services/service-1.jpeg" },
    { id: 2, img: "images/services/service-2.jpg" },
    { id: 3, img: "images/services/service-3.png" },
  ];

  return (
    <div className="bg-[#bdc3c7] pb-10">
      <div className="bg-[#bdc3c7]">
        <h2 className="headline text-[#5f27cd] py-3">Service</h2>
      </div>
      <div className="max-w-[1200px] mx-auto">
        <div className="lg:flex px-3 md:px-5">
          <div className="lg:w-1/2 lg:overflow-y-scroll lg:max-h-[850px] lg:mr-14">
            <div className="text-[18px] text-justify lg:pr-2">
              <span className="font-semibold"> 1. Services</span> <br />
              Hasan International Provide Integrated Service Solution.
              <br />
              <br />
              <span className="font-semibold">
                2. Medical Equipment Supply and Setup
              </span>{" "}
              <br />
              <p>
                Hasan International specializes in providing comprehensive
                solutions for medical equipment supply and setup. We offer a
                wide range of high-quality medical equipment, including
                diagnostic instruments, surgical tools, patient monitoring
                systems, imaging devices, and more. Our team of experts ensures
                seamless installation and configuration of the equipment, along
                with training and ongoing support for healthcare professionals.
              </p>
              <br />
              <span className="font-semibold">
                3. Healthcare Facility Design and Construction
              </span>{" "}
              <br />
              <p>
                At Hasan International, we understand the importance of
                well-designed healthcare facilities. We offer consultancy and
                construction services for designing and building hospitals,
                clinics, and medical centers. Our team of architects, engineers,
                and healthcare professionals collaborate to create functional,
                efficient, and patient-friendly spaces that meet international
                standards and regulations.
              </p>
              <br />
              <span className="font-semibold">
                4. Training and Capacity Building
              </span>{" "}
              <br />
              <p>
                We believe in empowering individuals and organizations through
                training and capacity building initiatives. Hasan International
                provides customized training programs in various areas, such as
                healthcare management, medical equipment operation and
                maintenance, infection control practices, and more. Our training
                modules are designed to enhance knowledge, skills, and overall
                performance, contributing to the development of a competent
                workforce.
              </p>
              <br />
              <span className="font-semibold">
                5. Quality Assurance and Compliance
              </span>{" "}
              <br />
              <p>
                Ensuring quality and compliance is crucial in the healthcare
                industry. Hasan International offers consultancy services to
                assist healthcare facilities in implementing robust quality
                assurance systems and complying with regulatory standards. Our
                experts conduct audits, provide guidance on process improvement,
                develop documentation frameworks, and assist in achieving
                accreditation and certification.
              </p>
              <br />
              <span className="font-semibold">
                6. Heamodialysis Unit Setup
              </span>{" "}
              <br />
              We provided world class heamodialysis unit concept with design and
              dialysis machine, dialysis water treatment plant, dialyzer, blood
              line, fistula needle, dialysis catheter, dialyzer reuse machine,
              and dialyzer reprocessing machine supplier.
              <br />
              <br />
              <span className="font-semibold">
                7. Installation and Comission
              </span>{" "}
              <br />
              Hasan International provide quality and quick design, installation
              and commissioning service.
              <br />
              <br />
              <span className="font-semibold">8. Consultancy</span> <br />
              We help make a better country in a best way. Hasan International
              is one of the consulting organizations and providing appropriate
              and sustainable solutions in health care, industrial factory
              setup, training and strengthening of institutional capabilities.
              We mainly emphasis on effective planning, operation and quality
              product management system. Consultancy with Mineral water project,
              Mango juice project, carbonated drinks project, plastic machinery,
              Waste water treatment plant, Industrial water treatment plant,
              Feed mill project, Auto bricks project, Packaging machinery, Solar
              system, Water desalination plant, Hospital equipment setup etc.
              <br />
              <br />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="grid gap-5 mt-3 lg:mt-3">
              {serviceData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white px-4 flex justify-center items-center rounded shadow"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto mb-2 p-4"
                  />
                  <h3 className="text-center text-lg font-bold">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
