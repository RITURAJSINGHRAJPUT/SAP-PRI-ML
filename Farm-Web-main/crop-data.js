const cropData = [
    {
        name: "Wheat",
        icon: "fa-wheat-awn",
        region: "North India",
        season: "Rabi",
        planting: "October - November",
        harvesting: "March - April",
        duration: "120-150 days",
        water: "Moderate",
        soil: "Well-drained loamy soil",
        temperature: "15-25°C",
        sunlight: "Full sun",
        varieties: [
            { name: "HD 2967", region: "Punjab, Haryana" },
            { name: "PBW 343", region: "Uttar Pradesh" },
            { name: "DBW 17", region: "Madhya Pradesh" }
        ],
        pests: [
            { name: "Aphids", solution: "Use neem oil spray" },
            { name: "Rust", solution: "Apply fungicides" }
        ],
        economic: {
            msp: "₹2015/quintal",
            yield: "4-5 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Soil Health Card", details: "Free soil testing" }
        ]
    },
    {
        name: "Rice",
        icon: "fa-rice",
        region: "East India",
        season: "Kharif",
        planting: "June - July",
        harvesting: "September - October",
        duration: "90-120 days",
        water: "High",
        soil: "Clayey loam",
        temperature: "25-35°C",
        sunlight: "Full sun",
        varieties: [
            { name: "Swarna", region: "West Bengal" },
            { name: "Samba Mahsuri", region: "Andhra Pradesh" },
            { name: "Pusa Basmati", region: "Punjab" }
        ],
        pests: [
            { name: "Stem Borer", solution: "Use pheromone traps" },
            { name: "Blast", solution: "Apply tricyclazole" }
        ],
        economic: {
            msp: "₹1940/quintal",
            yield: "3-4 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Pradhan Mantri Fasal Bima Yojana", details: "Crop insurance" }
        ]
    },
    {
        name: "Cotton",
        icon: "fa-shirt",
        region: "West India",
        season: "Kharif",
        planting: "May - June",
        harvesting: "October - November",
        duration: "150-180 days",
        water: "Moderate",
        soil: "Black soil",
        temperature: "25-35°C",
        sunlight: "Full sun",
        varieties: [
            { name: "Bollgard II", region: "Gujarat" },
            { name: "RCH 2", region: "Maharashtra" },
            { name: "NCS 145", region: "Andhra Pradesh" }
        ],
        pests: [
            { name: "Bollworm", solution: "Use Bt cotton" },
            { name: "Whitefly", solution: "Apply neem oil" }
        ],
        economic: {
            msp: "₹5726/quintal",
            yield: "2-3 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Technology Mission on Cotton", details: "Quality improvement" }
        ]
    },
    {
        name: "Sugarcane",
        icon: "fa-candy-cane",
        region: "South India",
        season: "Year-round",
        planting: "February - March",
        harvesting: "November - December",
        duration: "10-12 months",
        water: "High",
        soil: "Deep loamy soil",
        temperature: "20-30°C",
        sunlight: "Full sun",
        varieties: [
            { name: "Co 86032", region: "Tamil Nadu" },
            { name: "Co 0238", region: "Uttar Pradesh" },
            { name: "Co 86032", region: "Maharashtra" }
        ],
        pests: [
            { name: "Top Borer", solution: "Use pheromone traps" },
            { name: "Red Rot", solution: "Apply fungicides" }
        ],
        economic: {
            msp: "₹3150/quintal",
            yield: "70-80 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Sugarcane Development Fund", details: "Subsidy for new varieties" }
        ]
    },
    {
        name: "Maize",
        icon: "fa-corn",
        region: "South India",
        season: "Kharif",
        planting: "June - July",
        harvesting: "September - October",
        duration: "90-100 days",
        water: "Moderate",
        soil: "Well-drained soil",
        temperature: "20-30°C",
        sunlight: "Full sun",
        varieties: [
            { name: "HQPM 1", region: "Karnataka" },
            { name: "Pusa Composite 3", region: "Andhra Pradesh" },
            { name: "Vivek Hybrid 9", region: "Bihar" }
        ],
        pests: [
            { name: "Stem Borer", solution: "Use pheromone traps" },
            { name: "Fall Armyworm", solution: "Apply neem oil" }
        ],
        economic: {
            msp: "₹1870/quintal",
            yield: "3-4 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "National Food Security Mission", details: "Subsidy for seeds" }
        ]
    },
    {
        name: "Groundnut",
        icon: "fa-peanut",
        region: "West India",
        season: "Kharif",
        planting: "June - July",
        harvesting: "September - October",
        duration: "100-120 days",
        water: "Low",
        soil: "Sandy loam",
        temperature: "25-30°C",
        sunlight: "Full sun",
        varieties: [
            { name: "TG 37A", region: "Gujarat" },
            { name: "TMV 2", region: "Andhra Pradesh" },
            { name: "JL 24", region: "Tamil Nadu" }
        ],
        pests: [
            { name: "Leaf Miner", solution: "Use neem oil" },
            { name: "Tikka Disease", solution: "Apply fungicides" }
        ],
        economic: {
            msp: "₹5550/quintal",
            yield: "2-3 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Oilseeds Development Program", details: "Subsidy for seeds" }
        ]
    },
    {
        name: "Soybean",
        icon: "fa-seedling",
        region: "Central India",
        season: "Kharif",
        planting: "June - July",
        harvesting: "September - October",
        duration: "90-100 days",
        water: "Moderate",
        soil: "Well-drained soil",
        temperature: "20-30°C",
        sunlight: "Full sun",
        varieties: [
            { name: "JS 335", region: "Madhya Pradesh" },
            { name: "JS 9560", region: "Maharashtra" },
            { name: "NRC 37", region: "Rajasthan" }
        ],
        pests: [
            { name: "Stem Fly", solution: "Use neem oil" },
            { name: "Yellow Mosaic", solution: "Use resistant varieties" }
        ],
        economic: {
            msp: "₹3950/quintal",
            yield: "2-3 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "National Food Security Mission", details: "Subsidy for seeds" }
        ]
    },
    {
        name: "Mustard",
        icon: "fa-leaf",
        region: "North India",
        season: "Rabi",
        planting: "October - November",
        harvesting: "February - March",
        duration: "90-100 days",
        water: "Low",
        soil: "Well-drained soil",
        temperature: "15-25°C",
        sunlight: "Full sun",
        varieties: [
            { name: "RH 749", region: "Rajasthan" },
            { name: "Pusa Bold", region: "Uttar Pradesh" },
            { name: "Varuna", region: "Haryana" }
        ],
        pests: [
            { name: "Aphids", solution: "Use neem oil" },
            { name: "White Rust", solution: "Apply fungicides" }
        ],
        economic: {
            msp: "₹5050/quintal",
            yield: "2-3 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Oilseeds Development Program", details: "Subsidy for seeds" }
        ]
    },
    {
        name: "Jowar",
        icon: "fa-wheat-awn",
        region: "South India",
        season: "Kharif",
        planting: "June - July",
        harvesting: "September - October",
        duration: "90-100 days",
        water: "Low",
        soil: "Well-drained soil",
        temperature: "25-35°C",
        sunlight: "Full sun",
        varieties: [
            { name: "CSH 16", region: "Maharashtra" },
            { name: "CSV 15", region: "Karnataka" },
            { name: "SPV 462", region: "Andhra Pradesh" }
        ],
        pests: [
            { name: "Shoot Fly", solution: "Use pheromone traps" },
            { name: "Stem Borer", solution: "Apply neem oil" }
        ],
        economic: {
            msp: "₹2640/quintal",
            yield: "2-3 tons/ha",
            market: "Domestic"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "National Food Security Mission", details: "Subsidy for seeds" }
        ]
    },
    {
        name: "Bajra",
        icon: "fa-wheat-awn",
        region: "North India",
        season: "Kharif",
        planting: "June - July",
        harvesting: "September - October",
        duration: "80-90 days",
        water: "Low",
        soil: "Sandy soil",
        temperature: "25-35°C",
        sunlight: "Full sun",
        varieties: [
            { name: "HHB 67", region: "Rajasthan" },
            { name: "GHB 558", region: "Gujarat" },
            { name: "RHB 173", region: "Haryana" }
        ],
        pests: [
            { name: "Shoot Fly", solution: "Use pheromone traps" },
            { name: "Blast", solution: "Apply fungicides" }
        ],
        economic: {
            msp: "₹2350/quintal",
            yield: "2-3 tons/ha",
            market: "Domestic"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "National Food Security Mission", details: "Subsidy for seeds" }
        ]
    },
    {
        name: "Turmeric",
        icon: "fa-spice",
        region: "South India",
        season: "Kharif",
        planting: "May - June",
        harvesting: "January - February",
        duration: "7-8 months",
        water: "Moderate",
        soil: "Well-drained soil",
        temperature: "20-30°C",
        sunlight: "Partial shade",
        varieties: [
            { name: "Prabha", region: "Andhra Pradesh" },
            { name: "Suguna", region: "Tamil Nadu" },
            { name: "Sugandham", region: "Karnataka" }
        ],
        pests: [
            { name: "Rhizome Rot", solution: "Use disease-free seeds" },
            { name: "Leaf Blotch", solution: "Apply fungicides" }
        ],
        economic: {
            msp: "₹6000/quintal",
            yield: "20-25 tons/ha",
            market: "Domestic & Export"
        },
        schemes: [
            { name: "PM-KISAN", details: "₹6000/year direct benefit" },
            { name: "Mission for Integrated Development of Horticulture", details: "Subsidy for cultivation" }
        ]
    }
]; 