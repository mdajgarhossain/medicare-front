const categories =  [
  {
    mainCategory: "Medical equipment",
    subCategories: [
      {
        name: "Nephrology",
        subSubCategories: [
          {
            name: "Dialysis machine",
          },
          {
            name: "Dialysis water Treatment plant",
            subSubSubCategories: [
              {
                name: "Single bed water treatment plant",
                manufacturers: ["China made", "USA made", "German made"],
              },
              {
                name: "Central water treatment plant",
                manufacturers: ["China made", "USA made", "German made"],
              },
            ],
          },
          {
            name: "Dialyzer reprocessing machine",
            manufacturers: ["China made", "USA made"],
          },
          {
            name: "Dialyzer reprocessing chemical",
          },
          {
            name: "Dialysis disposable",
            subSubSubCategories: [
              "Dialyzer",
              "Blood tubing set",
              "Fistula needle",
              "Catheter",
            ],
          },
          {
            name: "Dialysis chair",
            manufacturers: ["China made", "Turkey made"],
          },
          {
            name: "Dialysis wall box",
          },
        ],
      },
      {
        name: "ICU",
        subSubCategories: [
          "ICU Ventilator",
          "Patient monitor",
          "Defibrillator",
          "Infusion pump",
          "Syringe pump",
        ],
      },
      {
        name: "Blood pressure monitoring device",
        manufacturers: ["Japan made", "Korea made"],
      },
      {
        name: "Hospital furniture",
        subSubCategories: ["Bed", "Trolly", "Cabinet"],
      },
      {
        name: "Lab equipment",
        subSubCategories: ["De Ionized Water treatment plant"],
      },
      {
        name: "Disposable items",
        subSubCategories: ["Industrial and commercial water treatment plant"],
      },
    ],
  },
  {
    mainCategory: "Reverse osmosis plant",
    subCategories: ["Commercial", "Industrial"],
  },
  {
    mainCategory: "Iron remove plant",
    subCategories: ["Commercial", "Industrial"],
  },
  {
    mainCategory: "Activated carbon filter",
    subCategories: ["Commercial", "Industrial"],
  },
  {
    mainCategory: "Water softener",
    subCategories: ["Commercial", "Industrial"],
  },
  {
    mainCategory: "DM Water plant",
    subCategories: ["Commercial", "Industrial"],
  },
  {
    mainCategory: "Domestic water treatment plant",
    subCategories: ["House hold water purifier", "Central water purifier"],
  },
  {
    mainCategory: "Small bottle water filling line",
    subCategories: [
      "Washing-Filing-Capping machine",
      "Labeling machine",
      {
        name: "Molding machine",
        subSubCategories: [
          "Injection molding machine",
          "Blow molding machine",
        ],
      },
    ],
  },
  {
    mainCategory: "5 Gallon bottle water filling line",
    subCategories: [
      "Washing-Filling-Capping Machine",
      "Inside and outside brush washing machine",
    ],
  },
  {
    mainCategory: "Filter media",
    subCategories: [
      "Iron remove media",
      "Activated carbon",
      "Cation Resin",
      "Anion Resin",
      "RO antiscalent",
      "PP filter",
      "RO membrane",
    ]
  }
]

export default categories;