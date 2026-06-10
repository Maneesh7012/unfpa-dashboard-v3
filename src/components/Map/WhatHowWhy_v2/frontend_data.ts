// Auto-generated from outputs/<district>/summary.json by
// scripts/generate_frontend_ts.py. DO NOT EDIT BY HAND - rerun the script
// after the pipeline produces new summaries.
//
// New block types (stats / list / meter) extend the existing heading/text/image
// scheme. To render them, add three small branches to the modal-body switch in
// what_how_why.tsx — examples are documented at the bottom of this file.

export type Block =
  | { type: 'heading'; value: string }
  | { type: 'text'; value: string }
  | { type: 'image'; url: string; desc?: string }
  | { type: 'stats'; items: { label: string; value: string; unit?: string }[] }
  | { type: 'list'; title?: string; items: { label: string; sublabel?: string }[] }
  | { type: 'meter'; label: string; value: number; max?: number; color?: string };

export type SettlementType =
  | 'residential' | 'industrial' | 'mining_adjacent'
  | 'transport' | 'mixed' | 'vegetation' | 'unclassified';

export interface TabEntry {
  id: number;
  cord: [number, number];   // [lat, lon]
  district: string;
  place: string;            // e.g. '2016 - 2024'
  category: string;         // 'Urban Sprawl' | 'Industry' | 'Mines' | 'Infrastructure' | 'Build-up' | 'Vegetation'
  settlement_type: SettlementType;
  confidence: number;       // 0..1
  title: string;
  content: Block[];
}

export interface PointEntry {
  id: number;
  cord: [number, number];
  district: string;
  category: string;
  settlement_type: SettlementType;
  score: number;
  new_built_area_ha: number;
  confidence: number;
}

export const TAB_CONTENT: { What: TabEntry[]; How: TabEntry[]; Why: TabEntry[] } = {
  What: [
    {
      id: 1,
      cord: [20.9443, 85.0133],
      district: "Angul",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.95,
      title: "Angul District : What changed",
      content: [
        {type: 'heading', value: "NTPC Talcher Super Thermal approach"},
        {type: 'text', value: "20.9 ha of new built-up area appeared between 2016 and 2024 (18.4 ha from Trees, 2.5 ha from Rangeland). Nearest landmark: NTPC Talcher Super Thermal (thermal power plant, ~1.27 km)."},
        {type: 'image', url: "frontend_assets/Angul/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "20.9", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "18.4 ha"}, {label: "From Trees", value: "18.4", unit: "ha"}, {label: "From Rangeland", value: "2.5", unit: "ha"}]}
      ],
    },
    {
      id: 2,
      cord: [20.9188, 85.1579],
      district: "Angul",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Angul District : What changed",
      content: [
        {type: 'heading', value: "NTPC Kaniha Super Thermal approach"},
        {type: 'text', value: "33.8 ha of new built-up area appeared between 2016 and 2024 (22.3 ha from Trees, 11.2 ha from Rangeland, 0.4 ha from Crops). Nearest landmark: NTPC Kaniha Super Thermal (thermal power plant, ~3.0 km)."},
        {type: 'image', url: "frontend_assets/Angul/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "33.8", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "22.3 ha"}, {label: "From Trees", value: "22.3", unit: "ha"}, {label: "From Rangeland", value: "11.2", unit: "ha"}, {label: "From Crops", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 3,
      cord: [20.7647, 85.1117],
      district: "Angul",
      place: "2016 - 2024",
      category: "Infrastructure",
      settlement_type: "transport",
      confidence: 0.8,
      title: "Angul District : What changed",
      content: [
        {type: 'heading', value: "Angul railway station rail corridor"},
        {type: 'text', value: "33.1 ha of new built-up area appeared between 2016 and 2024 (18.7 ha from Trees, 13.7 ha from Crops, 0.7 ha from Rangeland). Nearest landmark: Angul railway station (railway station, ~8.46 km)."},
        {type: 'image', url: "frontend_assets/Angul/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "33.1", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "18.7 ha"}, {label: "From Trees", value: "18.7", unit: "ha"}, {label: "From Crops", value: "13.7", unit: "ha"}, {label: "From Rangeland", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 4,
      cord: [20.7653, 85.1597],
      district: "Angul",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Angul District : What changed",
      content: [
        {type: 'heading', value: "NALCO Angul Smelter approach"},
        {type: 'text', value: "30.6 ha of new built-up area appeared between 2016 and 2024 (16.2 ha from Rangeland, 13.3 ha from Trees, 1.1 ha from Crops). Nearest landmark: NALCO Angul Smelter (aluminium smelter, ~9.81 km)."},
        {type: 'image', url: "frontend_assets/Angul/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "30.6", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "16.2 ha"}, {label: "From Rangeland", value: "16.2", unit: "ha"}, {label: "From Trees", value: "13.3", unit: "ha"}, {label: "From Crops", value: "1.1", unit: "ha"}]}
      ],
    },
    {
      id: 5,
      cord: [21.0415, 84.8389],
      district: "Angul",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Angul District : What changed",
      content: [
        {type: 'heading', value: "Chhendipada periphery"},
        {type: 'text', value: "25.2 ha of new built-up area appeared between 2016 and 2024 (23.0 ha from Crops, 2.2 ha from Trees). Nearest landmark: Chhendipada (urban center, ~3.23 km)."},
        {type: 'image', url: "frontend_assets/Angul/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "25.2", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "23.0 ha"}, {label: "From Crops", value: "23.0", unit: "ha"}, {label: "From Trees", value: "2.2", unit: "ha"}]}
      ],
    },
    {
      id: 6,
      cord: [20.7189, 83.4724],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Balangir District : What changed",
      content: [
        {type: 'heading', value: "Balangir town periphery"},
        {type: 'text', value: "50.0 ha of new built-up area appeared between 2016 and 2024 (47.2 ha from Crops, 2.5 ha from Trees, 0.4 ha from Water). Nearest landmark: Balangir town (urban center, ~2.03 km)."},
        {type: 'image', url: "frontend_assets/Balangir/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "50.0", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "47.2 ha"}, {label: "From Crops", value: "47.2", unit: "ha"}, {label: "From Trees", value: "2.5", unit: "ha"}, {label: "From Water", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 7,
      cord: [20.4628, 82.9039],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Balangir District : What changed",
      content: [
        {type: 'heading', value: "Kantabanji railway station rail corridor"},
        {type: 'text', value: "33.5 ha of new built-up area appeared between 2016 and 2024 (32.0 ha from Rangeland, 1.4 ha from Crops). Nearest landmark: Kantabanji railway station (railway station, ~3.34 km)."},
        {type: 'image', url: "frontend_assets/Balangir/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "33.5", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "32.0 ha"}, {label: "From Rangeland", value: "32.0", unit: "ha"}, {label: "From Crops", value: "1.4", unit: "ha"}]}
      ],
    },
    {
      id: 8,
      cord: [20.7392, 83.587],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Balangir District : What changed",
      content: [
        {type: 'heading', value: "Mixed Industrial + Residential Footprint"},
        {type: 'text', value: "27.0 ha of new built-up area appeared between 2016 and 2024 (26.6 ha from Rangeland, 0.4 ha from Water). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Balangir/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "27.0", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "26.6 ha"}, {label: "From Rangeland", value: "26.6", unit: "ha"}, {label: "From Water", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 9,
      cord: [20.4634, 82.9326],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Balangir District : What changed",
      content: [
        {type: 'heading', value: "Kantabanji railway station rail corridor"},
        {type: 'text', value: "25.6 ha of new built-up area appeared between 2016 and 2024 (24.8 ha from Crops, 0.7 ha from Trees). Nearest landmark: Kantabanji railway station (railway station, ~6.25 km)."},
        {type: 'image', url: "frontend_assets/Balangir/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "25.6", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "24.8 ha"}, {label: "From Crops", value: "24.8", unit: "ha"}, {label: "From Trees", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 10,
      cord: [20.711, 83.5301],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Balangir District : What changed",
      content: [
        {type: 'heading', value: "Balangir railway station rail corridor"},
        {type: 'text', value: "27.7 ha of new built-up area appeared between 2016 and 2024 (19.4 ha from Rangeland, 8.3 ha from Crops). Nearest landmark: Balangir railway station (railway station, ~3.71 km)."},
        {type: 'image', url: "frontend_assets/Balangir/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "27.7", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "19.4 ha"}, {label: "From Rangeland", value: "19.4", unit: "ha"}, {label: "From Crops", value: "8.3", unit: "ha"}]}
      ],
    },
    {
      id: 11,
      cord: [20.4964, 86.0485],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Cuttack District : What changed",
      content: [
        {type: 'heading', value: "Salipur periphery"},
        {type: 'text', value: "46.4 ha of new built-up area appeared between 2016 and 2024 (38.5 ha from Trees, 7.9 ha from Crops). Nearest landmark: Salipur (urban center, ~9.06 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "46.4", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "38.5 ha"}, {label: "From Trees", value: "38.5", unit: "ha"}, {label: "From Crops", value: "7.9", unit: "ha"}]}
      ],
    },
    {
      id: 12,
      cord: [20.4405, 85.7805],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Infrastructure",
      settlement_type: "transport",
      confidence: 0.8,
      title: "Cuttack District : What changed",
      content: [
        {type: 'heading', value: "Cuttack railway station rail corridor"},
        {type: 'text', value: "62.6 ha of new built-up area appeared between 2016 and 2024 (31.3 ha from Crops, 26.6 ha from Rangeland, 4.7 ha from Trees). Nearest landmark: Cuttack railway station (railway station, ~9.77 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "62.6", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "31.3 ha"}, {label: "From Crops", value: "31.3", unit: "ha"}, {label: "From Rangeland", value: "26.6", unit: "ha"}, {label: "From Trees", value: "4.7", unit: "ha"}]}
      ],
    },
    {
      id: 13,
      cord: [20.5149, 86.1443],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Cuttack District : What changed",
      content: [
        {type: 'heading', value: "Salipur periphery"},
        {type: 'text', value: "53.3 ha of new built-up area appeared between 2016 and 2024 (46.8 ha from Trees, 6.5 ha from Crops). Nearest landmark: Salipur (urban center, ~6.32 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "53.3", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "46.8 ha"}, {label: "From Trees", value: "46.8", unit: "ha"}, {label: "From Crops", value: "6.5", unit: "ha"}]}
      ],
    },
    {
      id: 14,
      cord: [20.5879, 85.0982],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Cuttack District : What changed",
      content: [
        {type: 'heading', value: "Non-Built Land-Cover Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by unchanged → unchanged (0.0 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Cuttack/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "unchanged → unchanged", unit: "0.0 ha"}]}
      ],
    },
    {
      id: 15,
      cord: [20.4959, 85.9718],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.95,
      title: "Cuttack District : What changed",
      content: [
        {type: 'heading', value: "Choudwar Industrial Area approach"},
        {type: 'text', value: "49.7 ha of new built-up area appeared between 2016 and 2024 (25.6 ha from Trees, 23.8 ha from Crops, 0.4 ha from Water). Nearest landmark: Choudwar Industrial Area (industrial, ~8.54 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "49.7", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "25.6 ha"}, {label: "From Trees", value: "25.6", unit: "ha"}, {label: "From Crops", value: "23.8", unit: "ha"}, {label: "From Water", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 16,
      cord: [21.875, 85.4255],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.9,
      title: "Kendujhar District : What changed",
      content: [
        {type: 'heading', value: "Banspani workforce settlement"},
        {type: 'text', value: "46.4 ha of new built-up area appeared between 2016 and 2024 (33.8 ha from Rangeland, 10.8 ha from Trees, 1.8 ha from Crops). Nearest landmark: Banspani workforce settlement (urban center, ~0.8 km)."},
        {type: 'image', url: "frontend_assets/Kendujhar/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "46.4", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "33.8 ha"}, {label: "From Rangeland", value: "33.8", unit: "ha"}, {label: "From Trees", value: "10.8", unit: "ha"}, {label: "From Crops", value: "1.8", unit: "ha"}]}
      ],
    },
    {
      id: 17,
      cord: [21.9559, 85.3859],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Kendujhar District : What changed",
      content: [
        {type: 'heading', value: "Banspani-Joda iron-ore corridor surrounds"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (27.0 ha). Nearest landmark: Banspani-Joda iron-ore corridor (iron ore mine, ~6.05 km)."},
        {type: 'image', url: "frontend_assets/Kendujhar/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "27.0 ha"}]}
      ],
    },
    {
      id: 18,
      cord: [22.119, 85.4422],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Kendujhar District : What changed",
      content: [
        {type: 'heading', value: "Barbil periphery"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (4.7 ha). Nearest landmark: Barbil (urban center, ~6.69 km)."},
        {type: 'image', url: "frontend_assets/Kendujhar/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "4.7 ha"}]}
      ],
    },
    {
      id: 19,
      cord: [22.1178, 85.3259],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.35,
      title: "Kendujhar District : What changed",
      content: [
        {type: 'heading', value: "Barbil periphery"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Rangeland → Trees (4.3 ha). Nearest landmark: Barbil (urban center, ~5.86 km)."},
        {type: 'image', url: "frontend_assets/Kendujhar/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Rangeland → Trees", unit: "4.3 ha"}]}
      ],
    },
    {
      id: 20,
      cord: [22.0825, 85.4038],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.35,
      title: "Kendujhar District : What changed",
      content: [
        {type: 'heading', value: "Joda-Barbil iron-ore cluster surrounds"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Rangeland → Trees (0.7 ha). Nearest landmark: Joda-Barbil iron-ore cluster (iron ore mine, ~1.44 km)."},
        {type: 'image', url: "frontend_assets/Kendujhar/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Rangeland → Trees", unit: "0.7 ha"}]}
      ],
    },
    {
      id: 21,
      cord: [20.228, 85.7335],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Khordha District : What changed",
      content: [
        {type: 'heading', value: "Tamando periphery"},
        {type: 'text', value: "72.0 ha of new built-up area appeared between 2016 and 2024 (58.7 ha from Crops, 13.3 ha from Rangeland). Nearest landmark: Tamando (urban center, ~5.91 km)."},
        {type: 'image', url: "frontend_assets/Khordha/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "72.0", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "58.7 ha"}, {label: "From Crops", value: "58.7", unit: "ha"}, {label: "From Rangeland", value: "13.3", unit: "ha"}]}
      ],
    },
    {
      id: 22,
      cord: [20.3274, 85.7327],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Khordha District : What changed",
      content: [
        {type: 'heading', value: "Tamando periphery"},
        {type: 'text', value: "56.9 ha of new built-up area appeared between 2016 and 2024 (52.2 ha from Rangeland, 4.0 ha from Trees, 0.7 ha from Crops). Nearest landmark: Tamando (urban center, ~6.49 km)."},
        {type: 'image', url: "frontend_assets/Khordha/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "56.9", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "52.2 ha"}, {label: "From Rangeland", value: "52.2", unit: "ha"}, {label: "From Trees", value: "4.0", unit: "ha"}, {label: "From Crops", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 23,
      cord: [20.2286, 85.8101],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Khordha District : What changed",
      content: [
        {type: 'heading', value: "Biju Patnaik International Airport approach"},
        {type: 'text', value: "42.5 ha of new built-up area appeared between 2016 and 2024 (42.1 ha from Crops, 0.4 ha from Rangeland). Nearest landmark: Biju Patnaik International Airport (airport, ~2.52 km)."},
        {type: 'image', url: "frontend_assets/Khordha/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "42.5", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "42.1 ha"}, {label: "From Crops", value: "42.1", unit: "ha"}, {label: "From Rangeland", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 24,
      cord: [20.2024, 85.9634],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Khordha District : What changed",
      content: [
        {type: 'heading', value: "Khordha NH-16 SE corridor approach"},
        {type: 'text', value: "35.6 ha of new built-up area appeared between 2016 and 2024 (28.1 ha from Trees, 7.2 ha from Crops, 0.4 ha from Rangeland). Nearest landmark: Khordha NH-16 SE corridor (industrial, ~0.74 km)."},
        {type: 'image', url: "frontend_assets/Khordha/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "35.6", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "28.1 ha"}, {label: "From Trees", value: "28.1", unit: "ha"}, {label: "From Crops", value: "7.2", unit: "ha"}, {label: "From Rangeland", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 25,
      cord: [19.8882, 85.1059],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Khordha District : What changed",
      content: [
        {type: 'heading', value: "Vegetation Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (24.5 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Khordha/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "24.5 ha"}]}
      ],
    },
    {
      id: 26,
      cord: [21.7883, 86.1197],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Mayurbhanj District : What changed",
      content: [
        {type: 'heading', value: "Vegetation Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (14.0 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "14.0 ha"}]}
      ],
    },
    {
      id: 27,
      cord: [21.6731, 86.826],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Mayurbhanj District : What changed",
      content: [
        {type: 'heading', value: "Baripada eastern fringe"},
        {type: 'text', value: "33.5 ha of new built-up area appeared between 2016 and 2024 (30.2 ha from Trees, 3.2 ha from Crops). Nearest landmark: Baripada eastern fringe (urban center, ~0.71 km)."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "33.5", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "30.2 ha"}, {label: "From Trees", value: "30.2", unit: "ha"}, {label: "From Crops", value: "3.2", unit: "ha"}]}
      ],
    },
    {
      id: 28,
      cord: [21.69, 86.333],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : What changed",
      content: [
        {type: 'heading', value: "Non-Built Land-Cover Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by unchanged → unchanged (0.0 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "unchanged → unchanged", unit: "0.0 ha"}]}
      ],
    },
    {
      id: 29,
      cord: [21.8245, 86.1195],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : What changed",
      content: [
        {type: 'heading', value: "Non-Built Land-Cover Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by unchanged → unchanged (0.0 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "unchanged → unchanged", unit: "0.0 ha"}]}
      ],
    },
    {
      id: 30,
      cord: [21.9342, 86.4093],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : What changed",
      content: [
        {type: 'heading', value: "Non-Built Land-Cover Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by unchanged → unchanged (0.0 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "unchanged → unchanged", unit: "0.0 ha"}]}
      ],
    },
    {
      id: 31,
      cord: [21.4675, 83.8967],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Sambalpur District : What changed",
      content: [
        {type: 'heading', value: "Burla periphery"},
        {type: 'text', value: "35.3 ha of new built-up area appeared between 2016 and 2024 (33.1 ha from Crops, 2.2 ha from Rangeland). Nearest landmark: Burla (urban center, ~6.13 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "35.3", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "33.1 ha"}, {label: "From Crops", value: "33.1", unit: "ha"}, {label: "From Rangeland", value: "2.2", unit: "ha"}]}
      ],
    },
    {
      id: 32,
      cord: [21.6688, 84.0469],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Sambalpur District : What changed",
      content: [
        {type: 'heading', value: "Aditya Aluminium Lapanga approach"},
        {type: 'text', value: "33.8 ha of new built-up area appeared between 2016 and 2024 (22.3 ha from Crops, 9.4 ha from Rangeland, 2.2 ha from Flooded vegetation). Nearest landmark: Aditya Aluminium Lapanga (aluminium smelter, ~9.41 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "33.8", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "22.3 ha"}, {label: "From Crops", value: "22.3", unit: "ha"}, {label: "From Rangeland", value: "9.4", unit: "ha"}, {label: "From Flooded vegetation", value: "2.2", unit: "ha"}]}
      ],
    },
    {
      id: 33,
      cord: [21.069, 84.3475],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Sambalpur District : What changed",
      content: [
        {type: 'heading', value: "Redhakhol periphery"},
        {type: 'text', value: "28.4 ha of new built-up area appeared between 2016 and 2024 (24.5 ha from Crops, 2.5 ha from Rangeland, 1.4 ha from Trees). Nearest landmark: Redhakhol (urban center, ~1.61 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "28.4", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "24.5 ha"}, {label: "From Crops", value: "24.5", unit: "ha"}, {label: "From Rangeland", value: "2.5", unit: "ha"}, {label: "From Trees", value: "1.4", unit: "ha"}]}
      ],
    },
    {
      id: 34,
      cord: [21.5422, 84.0302],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Sambalpur District : What changed",
      content: [
        {type: 'heading', value: "Aditya Aluminium Lapanga approach"},
        {type: 'text', value: "17.6 ha of new built-up area appeared between 2016 and 2024 (17.6 ha from Crops). Nearest landmark: Aditya Aluminium Lapanga (aluminium smelter, ~9.67 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "17.6", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "17.6 ha"}, {label: "From Crops", value: "17.6", unit: "ha"}]}
      ],
    },
    {
      id: 35,
      cord: [21.4137, 83.9171],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Sambalpur District : What changed",
      content: [
        {type: 'heading', value: "Sambalpur railway junction rail corridor"},
        {type: 'text', value: "27.7 ha of new built-up area appeared between 2016 and 2024 (27.7 ha from Crops). Nearest landmark: Sambalpur railway junction (railway station, ~6.75 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "27.7", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "27.7 ha"}, {label: "From Crops", value: "27.7", unit: "ha"}]}
      ],
    },
    {
      id: 36,
      cord: [21.9075, 85.2528],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Mines",
      settlement_type: "mining_adjacent",
      confidence: 0.75,
      title: "Sundargarh District : What changed",
      content: [
        {type: 'heading', value: "Koira mining range (north) surrounds"},
        {type: 'text', value: "77.4 ha of new built-up area appeared between 2016 and 2024 (77.0 ha from Rangeland, 0.4 ha from Crops). Nearest landmark: Koira mining range (north) (iron ore mine, ~7.21 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "77.4", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "77.0 ha"}, {label: "From Rangeland", value: "77.0", unit: "ha"}, {label: "From Crops", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 37,
      cord: [21.9669, 83.8003],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Sundargarh District : What changed",
      content: [
        {type: 'heading', value: "MCL Basundhara coal mine surrounds"},
        {type: 'text', value: "25.6 ha of new built-up area appeared between 2016 and 2024 (19.8 ha from Trees, 5.0 ha from Rangeland, 0.7 ha from Water). Nearest landmark: MCL Basundhara coal mine (coal mine, ~5.2 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "25.6", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "19.8 ha"}, {label: "From Trees", value: "19.8", unit: "ha"}, {label: "From Rangeland", value: "5.0", unit: "ha"}, {label: "From Water", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 38,
      cord: [21.8756, 83.7443],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Sundargarh District : What changed",
      content: [
        {type: 'heading', value: "MCL Garjanbahal coal mine surrounds"},
        {type: 'text', value: "39.2 ha of new built-up area appeared between 2016 and 2024 (23.8 ha from Rangeland, 15.1 ha from Trees, 0.4 ha from Crops). Nearest landmark: MCL Garjanbahal coal mine (coal mine, ~5.32 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "39.2", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "23.8 ha"}, {label: "From Rangeland", value: "23.8", unit: "ha"}, {label: "From Trees", value: "15.1", unit: "ha"}, {label: "From Crops", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 39,
      cord: [21.9496, 83.8394],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.9,
      title: "Sundargarh District : What changed",
      content: [
        {type: 'heading', value: "Lephripara periphery"},
        {type: 'text', value: "33.5 ha of new built-up area appeared between 2016 and 2024 (27.0 ha from Rangeland, 5.4 ha from Trees, 1.1 ha from Crops). Nearest landmark: Lephripara (urban center, ~5.63 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "33.5", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "27.0 ha"}, {label: "From Rangeland", value: "27.0", unit: "ha"}, {label: "From Trees", value: "5.4", unit: "ha"}, {label: "From Crops", value: "1.1", unit: "ha"}]}
      ],
    },
    {
      id: 40,
      cord: [21.9253, 85.2236],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Mines",
      settlement_type: "mining_adjacent",
      confidence: 0.75,
      title: "Sundargarh District : What changed",
      content: [
        {type: 'heading', value: "Koira mining range (north) surrounds"},
        {type: 'text', value: "35.3 ha of new built-up area appeared between 2016 and 2024 (31.0 ha from Rangeland, 4.3 ha from Crops). Nearest landmark: Koira mining range (north) (iron ore mine, ~3.67 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "35.3", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "31.0 ha"}, {label: "From Rangeland", value: "31.0", unit: "ha"}, {label: "From Crops", value: "4.3", unit: "ha"}]}
      ],
    },
    {
      id: 41,
      cord: [18.3682, 81.8985],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Malkangiri District : What changed",
      content: [
        {type: 'heading', value: "Malkangiri town periphery"},
        {type: 'text', value: "32.4 ha of new built-up area appeared between 2016 and 2024 (26.3 ha from Crops, 5.4 ha from Rangeland, 0.7 ha from Water). Nearest landmark: Malkangiri town (urban center, ~2.81 km)."},
        {type: 'image', url: "frontend_assets/Malkangiri/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "32.4", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "26.3 ha"}, {label: "From Crops", value: "26.3", unit: "ha"}, {label: "From Rangeland", value: "5.4", unit: "ha"}, {label: "From Water", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 42,
      cord: [17.9274, 81.5914],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Malkangiri District : What changed",
      content: [
        {type: 'heading', value: "Industrial Build-Out"},
        {type: 'text', value: "40.0 ha of new built-up area appeared between 2016 and 2024 (35.3 ha from Trees, 4.0 ha from Rangeland, 0.7 ha from Crops). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Malkangiri/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "40.0", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "35.3 ha"}, {label: "From Trees", value: "35.3", unit: "ha"}, {label: "From Rangeland", value: "4.0", unit: "ha"}, {label: "From Crops", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 43,
      cord: [17.9636, 81.5997],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Malkangiri District : What changed",
      content: [
        {type: 'heading', value: "Mixed Industrial + Residential Footprint"},
        {type: 'text', value: "24.8 ha of new built-up area appeared between 2016 and 2024 (16.9 ha from Rangeland, 6.1 ha from Crops, 1.8 ha from Trees). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Malkangiri/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "24.8", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "16.9 ha"}, {label: "From Rangeland", value: "16.9", unit: "ha"}, {label: "From Crops", value: "6.1", unit: "ha"}, {label: "From Trees", value: "1.8", unit: "ha"}]}
      ],
    },
    {
      id: 44,
      cord: [17.9893, 81.5518],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Malkangiri District : What changed",
      content: [
        {type: 'heading', value: "Mixed Industrial + Residential Footprint"},
        {type: 'text', value: "21.6 ha of new built-up area appeared between 2016 and 2024 (21.6 ha from Rangeland). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Malkangiri/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "21.6", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "21.6 ha"}, {label: "From Rangeland", value: "21.6", unit: "ha"}]}
      ],
    },
    {
      id: 45,
      cord: [17.8805, 81.527],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Malkangiri District : What changed",
      content: [
        {type: 'heading', value: "Industrial Build-Out"},
        {type: 'text', value: "15.5 ha of new built-up area appeared between 2016 and 2024 (7.9 ha from Trees, 5.8 ha from Crops, 1.8 ha from Rangeland). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Malkangiri/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "15.5", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "7.9 ha"}, {label: "From Trees", value: "7.9", unit: "ha"}, {label: "From Crops", value: "5.8", unit: "ha"}, {label: "From Rangeland", value: "1.8", unit: "ha"}]}
      ],
    },
    {
      id: 46,
      cord: [18.7941, 82.7196],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Koraput District : What changed",
      content: [
        {type: 'heading', value: "Koraput town periphery"},
        {type: 'text', value: "29.9 ha of new built-up area appeared between 2016 and 2024 (24.5 ha from Rangeland, 3.2 ha from Crops, 2.2 ha from Trees). Nearest landmark: Koraput town (urban center, ~2.04 km)."},
        {type: 'image', url: "frontend_assets/Koraput/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "29.9", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "24.5 ha"}, {label: "From Rangeland", value: "24.5", unit: "ha"}, {label: "From Crops", value: "3.2", unit: "ha"}, {label: "From Trees", value: "2.2", unit: "ha"}]}
      ],
    },
    {
      id: 47,
      cord: [18.8921, 82.6697],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Koraput District : What changed",
      content: [
        {type: 'heading', value: "Mixed Industrial + Residential Footprint"},
        {type: 'text', value: "20.2 ha of new built-up area appeared between 2016 and 2024 (12.6 ha from Rangeland, 7.6 ha from Trees). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Koraput/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "20.2", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "12.6 ha"}, {label: "From Rangeland", value: "12.6", unit: "ha"}, {label: "From Trees", value: "7.6", unit: "ha"}]}
      ],
    },
    {
      id: 48,
      cord: [18.845, 82.5857],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Koraput District : What changed",
      content: [
        {type: 'heading', value: "Jeypore periphery"},
        {type: 'text', value: "22.0 ha of new built-up area appeared between 2016 and 2024 (16.9 ha from Rangeland, 4.3 ha from Crops, 0.7 ha from Trees). Nearest landmark: Jeypore (urban center, ~2.34 km)."},
        {type: 'image', url: "frontend_assets/Koraput/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "22.0", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "16.9 ha"}, {label: "From Rangeland", value: "16.9", unit: "ha"}, {label: "From Crops", value: "4.3", unit: "ha"}, {label: "From Trees", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 49,
      cord: [18.9378, 82.697],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Koraput District : What changed",
      content: [
        {type: 'heading', value: "Vegetation Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (19.4 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Koraput/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "19.4 ha"}]}
      ],
    },
    {
      id: 50,
      cord: [18.6249, 82.4307],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Koraput District : What changed",
      content: [
        {type: 'heading', value: "Lamtaput periphery"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (32.8 ha). Nearest landmark: Lamtaput (urban center, ~9.56 km)."},
        {type: 'image', url: "frontend_assets/Koraput/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "32.8 ha"}]}
      ],
    },
    {
      id: 51,
      cord: [20.0045, 81.8687],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Nabarangpur District : What changed",
      content: [
        {type: 'heading', value: "Mixed Industrial + Residential Footprint"},
        {type: 'text', value: "32.4 ha of new built-up area appeared between 2016 and 2024 (16.9 ha from Rangeland, 14.8 ha from Trees, 0.7 ha from Crops). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Nabarangpur/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "32.4", unit: "ha"}, {label: "Dominant transition", value: "Rangeland → Built", unit: "16.9 ha"}, {label: "From Rangeland", value: "16.9", unit: "ha"}, {label: "From Trees", value: "14.8", unit: "ha"}, {label: "From Crops", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 52,
      cord: [19.6068, 82.1477],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Nabarangpur District : What changed",
      content: [
        {type: 'heading', value: "Umerkote periphery"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (8.3 ha). Nearest landmark: Umerkote (urban center, ~8.91 km)."},
        {type: 'image', url: "frontend_assets/Nabarangpur/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "8.3 ha"}]}
      ],
    },
    {
      id: 53,
      cord: [19.9826, 82.0505],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Nabarangpur District : What changed",
      content: [
        {type: 'heading', value: "Vegetation Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (25.6 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Nabarangpur/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "25.6 ha"}]}
      ],
    },
    {
      id: 54,
      cord: [19.9075, 82.272],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Nabarangpur District : What changed",
      content: [
        {type: 'heading', value: "Vegetation Change"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (33.5 ha). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Nabarangpur/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Trees → Rangeland", unit: "33.5 ha"}]}
      ],
    },
    {
      id: 55,
      cord: [19.6799, 82.1835],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.55,
      title: "Nabarangpur District : What changed",
      content: [
        {type: 'heading', value: "Umerkote periphery"},
        {type: 'text', value: "No net new built-up area inside this hotspot, but the change score is dominated by Rangeland → Crops (2.2 ha). Nearest landmark: Umerkote (urban center, ~2.04 km)."},
        {type: 'image', url: "frontend_assets/Nabarangpur/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "Dominant transition", value: "Rangeland → Crops", unit: "2.2 ha"}]}
      ],
    },
    {
      id: 56,
      cord: [19.9423, 85.8883],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : What changed",
      content: [
        {type: 'heading', value: "Satyabadi periphery"},
        {type: 'text', value: "40.0 ha of new built-up area appeared between 2016 and 2024 (38.5 ha from Trees, 1.1 ha from Crops, 0.4 ha from Water). Nearest landmark: Satyabadi (urban center, ~5.34 km)."},
        {type: 'image', url: "frontend_assets/Puri/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "40.0", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "38.5 ha"}, {label: "From Trees", value: "38.5", unit: "ha"}, {label: "From Crops", value: "1.1", unit: "ha"}, {label: "From Water", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 57,
      cord: [19.7599, 85.651],
      district: "Puri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Puri District : What changed",
      content: [
        {type: 'heading', value: "Industrial Build-Out"},
        {type: 'text', value: "41.0 ha of new built-up area appeared between 2016 and 2024 (40.7 ha from Trees, 0.4 ha from Crops). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Puri/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "41.0", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "40.7 ha"}, {label: "From Trees", value: "40.7", unit: "ha"}, {label: "From Crops", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 58,
      cord: [19.8061, 85.7842],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : What changed",
      content: [
        {type: 'heading', value: "Brahmagiri periphery"},
        {type: 'text', value: "51.5 ha of new built-up area appeared between 2016 and 2024 (26.3 ha from Trees, 24.8 ha from Crops, 0.4 ha from Rangeland). Nearest landmark: Brahmagiri (urban center, ~3.82 km)."},
        {type: 'image', url: "frontend_assets/Puri/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "51.5", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "26.3 ha"}, {label: "From Trees", value: "26.3", unit: "ha"}, {label: "From Crops", value: "24.8", unit: "ha"}, {label: "From Rangeland", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 59,
      cord: [20.1589, 85.858],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : What changed",
      content: [
        {type: 'heading', value: "Pipli periphery"},
        {type: 'text', value: "44.6 ha of new built-up area appeared between 2016 and 2024 (23.4 ha from Crops, 21.2 ha from Trees). Nearest landmark: Pipli (urban center, ~5.35 km)."},
        {type: 'image', url: "frontend_assets/Puri/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "44.6", unit: "ha"}, {label: "Dominant transition", value: "Crops → Built", unit: "23.4 ha"}, {label: "From Crops", value: "23.4", unit: "ha"}, {label: "From Trees", value: "21.2", unit: "ha"}]}
      ],
    },
    {
      id: 60,
      cord: [19.9961, 85.821],
      district: "Puri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Puri District : What changed",
      content: [
        {type: 'heading', value: "Industrial Build-Out"},
        {type: 'text', value: "42.5 ha of new built-up area appeared between 2016 and 2024 (39.2 ha from Trees, 3.2 ha from Crops). Nearest landmark: no registered driver within 10 km."},
        {type: 'image', url: "frontend_assets/Puri/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "42.5", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "39.2 ha"}, {label: "From Trees", value: "39.2", unit: "ha"}, {label: "From Crops", value: "3.2", unit: "ha"}]}
      ],
    },
    {
      id: 61,
      cord: [21.6287, 87.4665],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : What changed",
      content: [
        {type: 'heading', value: "Bhograi periphery"},
        {type: 'text', value: "40.0 ha of new built-up area appeared between 2016 and 2024 (39.2 ha from Trees, 0.7 ha from Rangeland). Nearest landmark: Bhograi (urban center, ~6.8 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/chips/hotspot_01.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "40.0", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "39.2 ha"}, {label: "From Trees", value: "39.2", unit: "ha"}, {label: "From Rangeland", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 62,
      cord: [21.683, 87.4377],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : What changed",
      content: [
        {type: 'heading', value: "Bhograi periphery"},
        {type: 'text', value: "41.8 ha of new built-up area appeared between 2016 and 2024 (38.9 ha from Trees, 1.8 ha from Crops, 0.7 ha from Rangeland). Nearest landmark: Bhograi (urban center, ~3.84 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/chips/hotspot_02.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "41.8", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "38.9 ha"}, {label: "From Trees", value: "38.9", unit: "ha"}, {label: "From Crops", value: "1.8", unit: "ha"}, {label: "From Rangeland", value: "0.7", unit: "ha"}]}
      ],
    },
    {
      id: 63,
      cord: [21.6831, 87.3894],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : What changed",
      content: [
        {type: 'heading', value: "Bhograi periphery"},
        {type: 'text', value: "57.2 ha of new built-up area appeared between 2016 and 2024 (51.1 ha from Trees, 5.8 ha from Crops, 0.4 ha from Flooded vegetation). Nearest landmark: Bhograi (urban center, ~3.34 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/chips/hotspot_03.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "57.2", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "51.1 ha"}, {label: "From Trees", value: "51.1", unit: "ha"}, {label: "From Crops", value: "5.8", unit: "ha"}, {label: "From Flooded vegetation", value: "0.4", unit: "ha"}]}
      ],
    },
    {
      id: 64,
      cord: [21.6468, 87.4376],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : What changed",
      content: [
        {type: 'heading', value: "Bhograi periphery"},
        {type: 'text', value: "38.5 ha of new built-up area appeared between 2016 and 2024 (38.5 ha from Trees). Nearest landmark: Bhograi (urban center, ~3.21 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/chips/hotspot_04.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "38.5", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "38.5 ha"}, {label: "From Trees", value: "38.5", unit: "ha"}]}
      ],
    },
    {
      id: 65,
      cord: [21.7372, 87.4185],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : What changed",
      content: [
        {type: 'heading', value: "Bhograi periphery"},
        {type: 'text', value: "51.5 ha of new built-up area appeared between 2016 and 2024 (51.1 ha from Trees, 0.4 ha from Water). Nearest landmark: Bhograi (urban center, ~8.63 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/chips/hotspot_05.png", desc: "Sentinel-2 RGB before / after — 2016 vs 2024"},
        {type: 'stats', items: [{label: "New built-up", value: "51.5", unit: "ha"}, {label: "Dominant transition", value: "Trees → Built", unit: "51.1 ha"}, {label: "From Trees", value: "51.1", unit: "ha"}, {label: "From Water", value: "0.4", unit: "ha"}]}
      ],
    },
  ],

  How: [
    {
      id: 1,
      cord: [20.9443, 85.0133],
      district: "Angul",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.95,
      title: "Angul District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 18.4 ha trees, 2.5 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Angul/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "18.4 ha (51 pixels)"}, {label: "Rangeland → Built", sublabel: "2.5 ha (7 pixels)"}]}
      ],
    },
    {
      id: 2,
      cord: [20.9188, 85.1579],
      district: "Angul",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Angul District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 22.3 ha trees, 11.2 ha rangeland, 0.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Angul/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "22.3 ha (62 pixels)"}, {label: "Rangeland → Built", sublabel: "11.2 ha (31 pixels)"}, {label: "Crops → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 3,
      cord: [20.7647, 85.1117],
      district: "Angul",
      place: "2016 - 2024",
      category: "Infrastructure",
      settlement_type: "transport",
      confidence: 0.8,
      title: "Angul District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 18.7 ha trees, 13.7 ha crops, 0.7 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Angul/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "18.7 ha (52 pixels)"}, {label: "Crops → Built", sublabel: "13.7 ha (38 pixels)"}, {label: "Rangeland → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 4,
      cord: [20.7653, 85.1597],
      district: "Angul",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Angul District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 16.2 ha rangeland, 13.3 ha trees, 1.1 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Angul/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "16.2 ha (45 pixels)"}, {label: "Trees → Built", sublabel: "13.3 ha (37 pixels)"}, {label: "Crops → Built", sublabel: "1.1 ha (3 pixels)"}]}
      ],
    },
    {
      id: 5,
      cord: [21.0415, 84.8389],
      district: "Angul",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Angul District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 23.0 ha crops, 2.2 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Angul/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "23.0 ha (64 pixels)"}, {label: "Trees → Built", sublabel: "2.2 ha (6 pixels)"}]}
      ],
    },
    {
      id: 6,
      cord: [20.7189, 83.4724],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Balangir District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 47.2 ha crops, 2.5 ha trees, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Balangir/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "47.2 ha (131 pixels)"}, {label: "Trees → Built", sublabel: "2.5 ha (7 pixels)"}, {label: "Water → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 7,
      cord: [20.4628, 82.9039],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Balangir District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 32.0 ha rangeland, 1.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Balangir/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "32.0 ha (89 pixels)"}, {label: "Crops → Built", sublabel: "1.4 ha (4 pixels)"}]}
      ],
    },
    {
      id: 8,
      cord: [20.7392, 83.587],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Balangir District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 26.6 ha rangeland, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Balangir/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "26.6 ha (74 pixels)"}, {label: "Water → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 9,
      cord: [20.4634, 82.9326],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Balangir District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 24.8 ha crops, 0.7 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Balangir/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "24.8 ha (69 pixels)"}, {label: "Trees → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 10,
      cord: [20.711, 83.5301],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Balangir District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 19.4 ha rangeland, 8.3 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Balangir/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "19.4 ha (54 pixels)"}, {label: "Crops → Built", sublabel: "8.3 ha (23 pixels)"}]}
      ],
    },
    {
      id: 11,
      cord: [20.4964, 86.0485],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Cuttack District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 38.5 ha trees, 7.9 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Cuttack/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "38.5 ha (107 pixels)"}, {label: "Crops → Built", sublabel: "7.9 ha (22 pixels)"}]}
      ],
    },
    {
      id: 12,
      cord: [20.4405, 85.7805],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Infrastructure",
      settlement_type: "transport",
      confidence: 0.8,
      title: "Cuttack District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 31.3 ha crops, 26.6 ha rangeland, 4.7 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Cuttack/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "31.3 ha (87 pixels)"}, {label: "Rangeland → Built", sublabel: "26.6 ha (74 pixels)"}, {label: "Trees → Built", sublabel: "4.7 ha (13 pixels)"}]}
      ],
    },
    {
      id: 13,
      cord: [20.5149, 86.1443],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Cuttack District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 46.8 ha trees, 6.5 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Cuttack/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "46.8 ha (130 pixels)"}, {label: "Crops → Built", sublabel: "6.5 ha (18 pixels)"}]}
      ],
    },
    {
      id: 14,
      cord: [20.5879, 85.0982],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Cuttack District : How it changed",
      content: [
        {type: 'heading', value: "unchanged → unchanged (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 0.0 ha shifted from unchanged to unchanged. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Cuttack/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 15,
      cord: [20.4959, 85.9718],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.95,
      title: "Cuttack District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 25.6 ha trees, 23.8 ha crops, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Cuttack/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "25.6 ha (71 pixels)"}, {label: "Crops → Built", sublabel: "23.8 ha (66 pixels)"}, {label: "Water → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 16,
      cord: [21.875, 85.4255],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.9,
      title: "Kendujhar District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 33.8 ha rangeland, 10.8 ha trees, 1.8 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Kendujhar/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "33.8 ha (94 pixels)"}, {label: "Trees → Built", sublabel: "10.8 ha (30 pixels)"}, {label: "Crops → Built", sublabel: "1.8 ha (5 pixels)"}]}
      ],
    },
    {
      id: 17,
      cord: [21.9559, 85.3859],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Kendujhar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 27.0 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Kendujhar/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 18,
      cord: [22.119, 85.4422],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Kendujhar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 4.7 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Kendujhar/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 19,
      cord: [22.1178, 85.3259],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.35,
      title: "Kendujhar District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Trees (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 4.3 ha shifted from Rangeland to Trees. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Kendujhar/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 20,
      cord: [22.0825, 85.4038],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.35,
      title: "Kendujhar District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Trees (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 0.7 ha shifted from Rangeland to Trees. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Kendujhar/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 21,
      cord: [20.228, 85.7335],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Khordha District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 58.7 ha crops, 13.3 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Khordha/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "58.7 ha (163 pixels)"}, {label: "Rangeland → Built", sublabel: "13.3 ha (37 pixels)"}]}
      ],
    },
    {
      id: 22,
      cord: [20.3274, 85.7327],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Khordha District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 52.2 ha rangeland, 4.0 ha trees, 0.7 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Khordha/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "52.2 ha (145 pixels)"}, {label: "Trees → Built", sublabel: "4.0 ha (11 pixels)"}, {label: "Crops → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 23,
      cord: [20.2286, 85.8101],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Khordha District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 42.1 ha crops, 0.4 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Khordha/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "42.1 ha (117 pixels)"}, {label: "Rangeland → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 24,
      cord: [20.2024, 85.9634],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Khordha District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 28.1 ha trees, 7.2 ha crops, 0.4 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Khordha/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "28.1 ha (78 pixels)"}, {label: "Crops → Built", sublabel: "7.2 ha (20 pixels)"}, {label: "Rangeland → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 25,
      cord: [19.8882, 85.1059],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Khordha District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 24.5 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Khordha/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 26,
      cord: [21.7883, 86.1197],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Mayurbhanj District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 14.0 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 27,
      cord: [21.6731, 86.826],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Mayurbhanj District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 30.2 ha trees, 3.2 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "30.2 ha (84 pixels)"}, {label: "Crops → Built", sublabel: "3.2 ha (9 pixels)"}]}
      ],
    },
    {
      id: 28,
      cord: [21.69, 86.333],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : How it changed",
      content: [
        {type: 'heading', value: "unchanged → unchanged (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 0.0 ha shifted from unchanged to unchanged. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 29,
      cord: [21.8245, 86.1195],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : How it changed",
      content: [
        {type: 'heading', value: "unchanged → unchanged (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 0.0 ha shifted from unchanged to unchanged. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 30,
      cord: [21.9342, 86.4093],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : How it changed",
      content: [
        {type: 'heading', value: "unchanged → unchanged (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 0.0 ha shifted from unchanged to unchanged. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 31,
      cord: [21.4675, 83.8967],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Sambalpur District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 33.1 ha crops, 2.2 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sambalpur/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "33.1 ha (92 pixels)"}, {label: "Rangeland → Built", sublabel: "2.2 ha (6 pixels)"}]}
      ],
    },
    {
      id: 32,
      cord: [21.6688, 84.0469],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Sambalpur District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 22.3 ha crops, 9.4 ha rangeland, 2.2 ha flooded vegetation were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sambalpur/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "22.3 ha (62 pixels)"}, {label: "Rangeland → Built", sublabel: "9.4 ha (26 pixels)"}, {label: "Flooded vegetation → Built", sublabel: "2.2 ha (6 pixels)"}]}
      ],
    },
    {
      id: 33,
      cord: [21.069, 84.3475],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Sambalpur District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 24.5 ha crops, 2.5 ha rangeland, 1.4 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sambalpur/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "24.5 ha (68 pixels)"}, {label: "Rangeland → Built", sublabel: "2.5 ha (7 pixels)"}, {label: "Trees → Built", sublabel: "1.4 ha (4 pixels)"}]}
      ],
    },
    {
      id: 34,
      cord: [21.5422, 84.0302],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Sambalpur District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 17.6 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sambalpur/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "17.6 ha (49 pixels)"}]}
      ],
    },
    {
      id: 35,
      cord: [21.4137, 83.9171],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Sambalpur District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 27.7 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sambalpur/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "27.7 ha (77 pixels)"}]}
      ],
    },
    {
      id: 36,
      cord: [21.9075, 85.2528],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Mines",
      settlement_type: "mining_adjacent",
      confidence: 0.75,
      title: "Sundargarh District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 77.0 ha rangeland, 0.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sundargarh/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "77.0 ha (214 pixels)"}, {label: "Crops → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 37,
      cord: [21.9669, 83.8003],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Sundargarh District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 19.8 ha trees, 5.0 ha rangeland, 0.7 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sundargarh/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "19.8 ha (55 pixels)"}, {label: "Rangeland → Built", sublabel: "5.0 ha (14 pixels)"}, {label: "Water → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 38,
      cord: [21.8756, 83.7443],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Sundargarh District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 23.8 ha rangeland, 15.1 ha trees, 0.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sundargarh/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "23.8 ha (66 pixels)"}, {label: "Trees → Built", sublabel: "15.1 ha (42 pixels)"}, {label: "Crops → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 39,
      cord: [21.9496, 83.8394],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.9,
      title: "Sundargarh District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 27.0 ha rangeland, 5.4 ha trees, 1.1 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sundargarh/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "27.0 ha (75 pixels)"}, {label: "Trees → Built", sublabel: "5.4 ha (15 pixels)"}, {label: "Crops → Built", sublabel: "1.1 ha (3 pixels)"}]}
      ],
    },
    {
      id: 40,
      cord: [21.9253, 85.2236],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Mines",
      settlement_type: "mining_adjacent",
      confidence: 0.75,
      title: "Sundargarh District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 31.0 ha rangeland, 4.3 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Sundargarh/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "31.0 ha (86 pixels)"}, {label: "Crops → Built", sublabel: "4.3 ha (12 pixels)"}]}
      ],
    },
    {
      id: 41,
      cord: [18.3682, 81.8985],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Malkangiri District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 26.3 ha crops, 5.4 ha rangeland, 0.7 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Malkangiri/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "26.3 ha (73 pixels)"}, {label: "Rangeland → Built", sublabel: "5.4 ha (15 pixels)"}, {label: "Water → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 42,
      cord: [17.9274, 81.5914],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Malkangiri District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 35.3 ha trees, 4.0 ha rangeland, 0.7 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Malkangiri/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "35.3 ha (98 pixels)"}, {label: "Rangeland → Built", sublabel: "4.0 ha (11 pixels)"}, {label: "Crops → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 43,
      cord: [17.9636, 81.5997],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Malkangiri District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 16.9 ha rangeland, 6.1 ha crops, 1.8 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Malkangiri/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "16.9 ha (47 pixels)"}, {label: "Crops → Built", sublabel: "6.1 ha (17 pixels)"}, {label: "Trees → Built", sublabel: "1.8 ha (5 pixels)"}]}
      ],
    },
    {
      id: 44,
      cord: [17.9893, 81.5518],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Malkangiri District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 21.6 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Malkangiri/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "21.6 ha (60 pixels)"}]}
      ],
    },
    {
      id: 45,
      cord: [17.8805, 81.527],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Malkangiri District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 7.9 ha trees, 5.8 ha crops, 1.8 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Malkangiri/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "7.9 ha (22 pixels)"}, {label: "Crops → Built", sublabel: "5.8 ha (16 pixels)"}, {label: "Rangeland → Built", sublabel: "1.8 ha (5 pixels)"}]}
      ],
    },
    {
      id: 46,
      cord: [18.7941, 82.7196],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Koraput District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 24.5 ha rangeland, 3.2 ha crops, 2.2 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Koraput/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "24.5 ha (68 pixels)"}, {label: "Crops → Built", sublabel: "3.2 ha (9 pixels)"}, {label: "Trees → Built", sublabel: "2.2 ha (6 pixels)"}]}
      ],
    },
    {
      id: 47,
      cord: [18.8921, 82.6697],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Koraput District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 12.6 ha rangeland, 7.6 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Koraput/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "12.6 ha (35 pixels)"}, {label: "Trees → Built", sublabel: "7.6 ha (21 pixels)"}]}
      ],
    },
    {
      id: 48,
      cord: [18.845, 82.5857],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Koraput District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 16.9 ha rangeland, 4.3 ha crops, 0.7 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Koraput/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "16.9 ha (47 pixels)"}, {label: "Crops → Built", sublabel: "4.3 ha (12 pixels)"}, {label: "Trees → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 49,
      cord: [18.9378, 82.697],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Koraput District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 19.4 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Koraput/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 50,
      cord: [18.6249, 82.4307],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Koraput District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 32.8 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Koraput/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 51,
      cord: [20.0045, 81.8687],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Nabarangpur District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 16.9 ha rangeland, 14.8 ha trees, 0.7 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Nabarangpur/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Rangeland → Built", sublabel: "16.9 ha (47 pixels)"}, {label: "Trees → Built", sublabel: "14.8 ha (41 pixels)"}, {label: "Crops → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 52,
      cord: [19.6068, 82.1477],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Nabarangpur District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 8.3 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Nabarangpur/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 53,
      cord: [19.9826, 82.0505],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Nabarangpur District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 25.6 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Nabarangpur/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 54,
      cord: [19.9075, 82.272],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Nabarangpur District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Rangeland (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 33.5 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Nabarangpur/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 55,
      cord: [19.6799, 82.1835],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.55,
      title: "Nabarangpur District : How it changed",
      content: [
        {type: 'heading', value: "Rangeland → Crops (no Built-class pixels)"},
        {type: 'text', value: "Spectral signature change without Built-class conversion — 2.2 ha shifted from Rangeland to Crops. This is the signature of intensification or canopy thinning, not new settlement footprint."},
        {type: 'image', url: "frontend_assets/Nabarangpur/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"}
      ],
    },
    {
      id: 56,
      cord: [19.9423, 85.8883],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 38.5 ha trees, 1.1 ha crops, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Puri/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "38.5 ha (107 pixels)"}, {label: "Crops → Built", sublabel: "1.1 ha (3 pixels)"}, {label: "Water → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 57,
      cord: [19.7599, 85.651],
      district: "Puri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Puri District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 40.7 ha trees, 0.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Puri/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "40.7 ha (113 pixels)"}, {label: "Crops → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 58,
      cord: [19.8061, 85.7842],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 26.3 ha trees, 24.8 ha crops, 0.4 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Puri/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "26.3 ha (73 pixels)"}, {label: "Crops → Built", sublabel: "24.8 ha (69 pixels)"}, {label: "Rangeland → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 59,
      cord: [20.1589, 85.858],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : How it changed",
      content: [
        {type: 'heading', value: "Crops → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 23.4 ha crops, 21.2 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Puri/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Crops → Built", sublabel: "23.4 ha (65 pixels)"}, {label: "Trees → Built", sublabel: "21.2 ha (59 pixels)"}]}
      ],
    },
    {
      id: 60,
      cord: [19.9961, 85.821],
      district: "Puri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Puri District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 39.2 ha trees, 3.2 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Puri/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "39.2 ha (109 pixels)"}, {label: "Crops → Built", sublabel: "3.2 ha (9 pixels)"}]}
      ],
    },
    {
      id: 61,
      cord: [21.6287, 87.4665],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 39.2 ha trees, 0.7 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Baleshwar/gifs/hotspot_01.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "39.2 ha (109 pixels)"}, {label: "Rangeland → Built", sublabel: "0.7 ha (2 pixels)"}]}
      ],
    },
    {
      id: 62,
      cord: [21.683, 87.4377],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 38.9 ha trees, 1.8 ha crops, 0.7 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Baleshwar/gifs/hotspot_02.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "38.9 ha (108 pixels)"}, {label: "Crops → Built", sublabel: "1.8 ha (5 pixels)"}, {label: "Rangeland → Built", sublabel: "0.7 ha (2 pixels)"}, {label: "Water → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 63,
      cord: [21.6831, 87.3894],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 51.1 ha trees, 5.8 ha crops, 0.4 ha flooded vegetation were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Baleshwar/gifs/hotspot_03.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "51.1 ha (142 pixels)"}, {label: "Crops → Built", sublabel: "5.8 ha (16 pixels)"}, {label: "Flooded vegetation → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
    {
      id: 64,
      cord: [21.6468, 87.4376],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 38.5 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Baleshwar/gifs/hotspot_04.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "38.5 ha (107 pixels)"}]}
      ],
    },
    {
      id: 65,
      cord: [21.7372, 87.4185],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : How it changed",
      content: [
        {type: 'heading', value: "Trees → Built (dominant pathway)"},
        {type: 'text', value: "The hotspot reveals a clear conversion pathway: 51.1 ha trees, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place."},
        {type: 'image', url: "frontend_assets/Baleshwar/gifs/hotspot_05.gif", desc: "Animated change — Sentinel-2 2016 ↔ 2024"},
        {type: 'list', title: "Conversion sources", items: [{label: "Trees → Built", sublabel: "51.1 ha (142 pixels)"}, {label: "Water → Built", sublabel: "0.4 ha (1 pixels)"}]}
      ],
    },
  ],

  Why: [
    {
      id: 1,
      cord: [20.9443, 85.0133],
      district: "Angul",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.95,
      title: "Angul District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. mining_adjacent/industrial drivers overlap (MCL Balaram OCP (5.77 km), MCL Hingula OCP (6.79 km); NTPC Talcher Super Thermal (1.27 km))."},
        {type: 'image', url: "frontend_assets/Angul/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "NTPC Talcher Super Thermal", sublabel: "thermal power plant • 1.27 km • district_context"}, {label: "MCL Balaram OCP", sublabel: "coal mine • 5.77 km • district_context"}, {label: "MCL Hingula OCP", sublabel: "coal mine • 6.79 km • district_context"}, {label: "MCL Bharatpur OCP", sublabel: "coal mine • 8.06 km • district_context"}, {label: "MCL Lingaraj OCP", sublabel: "coal mine • 9.55 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 2,
      cord: [20.9188, 85.1579],
      district: "Angul",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Angul District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): NTPC Kaniha Super Thermal (3.0 km), Talcher Fertilizers Ltd (4.64 km), NTPC Talcher Thermal (7.03 km)."},
        {type: 'image', url: "frontend_assets/Angul/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "NTPC Kaniha Super Thermal", sublabel: "thermal power plant • 3.0 km • district_context"}, {label: "Banarpal", sublabel: "urban center • 3.21 km • district_context"}, {label: "Talcher Fertilizers Ltd", sublabel: "fertiliser plant • 4.64 km • district_context"}, {label: "MCL Kaniha OCP", sublabel: "coal mine • 6.47 km • district_context"}, {label: "NTPC Talcher Thermal", sublabel: "thermal power plant • 7.03 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 3,
      cord: [20.7647, 85.1117],
      district: "Angul",
      place: "2016 - 2024",
      category: "Infrastructure",
      settlement_type: "transport",
      confidence: 0.8,
      title: "Angul District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Angul railway station (8.46 km), Angul - Narasinghpur Road (2.54 km), Angul - Narasinghpur Road (3.49 km)."},
        {type: 'image', url: "frontend_assets/Angul/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Angul railway station", sublabel: "railway station • 8.46 km • district_context"}, {label: "Angul town", sublabel: "urban center • 8.92 km • district_context"}, {label: "NALCO Angul Smelter", sublabel: "aluminium smelter • 9.74 km • district_context"}, {label: "Angul - Narasinghpur Road", sublabel: "road • 2.54 km • osm"}, {label: "Angul - Narasinghpur Road", sublabel: "road • 3.49 km • osm"}]},
        {type: 'meter', label: "Confidence", value: 0.8, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 4,
      cord: [20.7653, 85.1597],
      district: "Angul",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Angul District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. transport/residential/industrial drivers overlap (Angul - Narasinghpur Road (1.68 km), Angul - Narasinghpur Road (2.46 km); (unnamed urban) (2.97 km), (unnamed urban) (3.14 km))."},
        {type: 'image', url: "frontend_assets/Angul/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "NALCO Angul Smelter", sublabel: "aluminium smelter • 9.81 km • district_context"}, {label: "Angul - Narasinghpur Road", sublabel: "road • 1.68 km • osm"}, {label: "Angul - Narasinghpur Road", sublabel: "road • 2.46 km • osm"}, {label: "(unnamed urban)", sublabel: "urban • 2.97 km • osm"}, {label: "(unnamed urban)", sublabel: "urban • 3.14 km • osm"}]},
        {type: 'meter', label: "Confidence", value: 0.9, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 5,
      cord: [21.0415, 84.8389],
      district: "Angul",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Angul District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Chhendipada (3.23 km), Chhendipada (5.93 km), (unnamed settlement) (8.09 km)."},
        {type: 'image', url: "frontend_assets/Angul/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Chhendipada", sublabel: "urban center • 3.23 km • district_context"}, {label: "Angul - Deogarh Road", sublabel: "road • 5.92 km • osm"}, {label: "Chhendipada", sublabel: "settlement • 5.93 km • osm"}, {label: "Angul - Deogarh Road", sublabel: "road • 6.94 km • osm"}, {label: "(unnamed settlement)", sublabel: "settlement • 8.09 km • osm"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 6,
      cord: [20.7189, 83.4724],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Balangir District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Balangir town (2.03 km)."},
        {type: 'image', url: "frontend_assets/Balangir/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Balangir town", sublabel: "urban center • 2.03 km • district_context"}, {label: "Balangir railway station", sublabel: "railway station • 2.81 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 7,
      cord: [20.4628, 82.9039],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Balangir District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. residential/transport drivers overlap (Kantabanji (3.63 km); Kantabanji railway station (3.34 km))."},
        {type: 'image', url: "frontend_assets/Balangir/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Kantabanji railway station", sublabel: "railway station • 3.34 km • district_context"}, {label: "Kantabanji", sublabel: "urban center • 3.63 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 8,
      cord: [20.7392, 83.587],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Balangir District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. no registered driver nearby; Rangeland→Built transition could be rural settlement or industrial expansion."},
        {type: 'image', url: "frontend_assets/Balangir/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.7, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 9,
      cord: [20.4634, 82.9326],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Balangir District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. residential/transport drivers overlap (Kantabanji (6.57 km); Kantabanji railway station (6.25 km))."},
        {type: 'image', url: "frontend_assets/Balangir/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Kantabanji railway station", sublabel: "railway station • 6.25 km • district_context"}, {label: "Kantabanji", sublabel: "urban center • 6.57 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.8, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 10,
      cord: [20.711, 83.5301],
      district: "Balangir",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Balangir District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. residential/transport drivers overlap (Balangir town (4.74 km); Balangir railway station (3.71 km))."},
        {type: 'image', url: "frontend_assets/Balangir/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Balangir railway station", sublabel: "railway station • 3.71 km • district_context"}, {label: "Balangir town", sublabel: "urban center • 4.74 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 11,
      cord: [20.4964, 86.0485],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Cuttack District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Salipur (9.06 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Salipur", sublabel: "urban center • 9.06 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 12,
      cord: [20.4405, 85.7805],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Infrastructure",
      settlement_type: "transport",
      confidence: 0.8,
      title: "Cuttack District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Cuttack railway station (9.77 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Cuttack railway station", sublabel: "railway station • 9.77 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.8, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 13,
      cord: [20.5149, 86.1443],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Cuttack District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Salipur (6.32 km)."},
        {type: 'image', url: "frontend_assets/Cuttack/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Salipur", sublabel: "urban center • 6.32 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 14,
      cord: [20.5879, 85.0982],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Cuttack District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — unchanged → unchanged"},
        {type: 'text', value: "Demographic signal: non-built land-cover change — needs ground-truth. no Built-class conversion inside hotspot; spectral change without a clear land-cover flip."},
        {type: 'image', url: "frontend_assets/Cuttack/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.3, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 15,
      cord: [20.4959, 85.9718],
      district: "Cuttack",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.95,
      title: "Cuttack District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. industrial/residential drivers overlap (Choudwar Industrial Area (8.54 km); Choudwar (9.38 km))."},
        {type: 'image', url: "frontend_assets/Cuttack/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Choudwar Industrial Area", sublabel: "industrial • 8.54 km • district_context"}, {label: "Choudwar", sublabel: "urban center • 9.38 km • district_context"}, {label: "SAIL Kalinga Nagar (approach)", sublabel: "steel plant • 9.59 km • district_context"}, {label: "Cuttack city", sublabel: "urban center • 9.99 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 16,
      cord: [21.875, 85.4255],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.9,
      title: "Kendujhar District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Banspani workforce settlement (0.8 km)."},
        {type: 'image', url: "frontend_assets/Kendujhar/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Banspani workforce settlement", sublabel: "urban center • 0.8 km • district_context"}, {label: "Banspani-Joda iron-ore corridor", sublabel: "iron ore mine • 5.03 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.9, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 17,
      cord: [21.9559, 85.3859],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Kendujhar District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Kendujhar/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Banspani-Joda iron-ore corridor", sublabel: "iron ore mine • 6.05 km • district_context"}, {label: "Thakurani iron-ore mine", sublabel: "iron ore mine • 6.14 km • district_context"}, {label: "Banspani railway junction", sublabel: "railway station • 8.96 km • district_context"}, {label: "Banspani workforce settlement", sublabel: "urban center • 9.14 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.65, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 18,
      cord: [22.119, 85.4422],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Kendujhar District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Kendujhar/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Barbil", sublabel: "urban center • 6.69 km • district_context"}, {label: "Joda-Barbil iron-ore cluster", sublabel: "iron ore mine • 6.97 km • district_context"}, {label: "Joda", sublabel: "urban center • 9.06 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.65, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 19,
      cord: [22.1178, 85.3259],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.35,
      title: "Kendujhar District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Rangeland → Trees"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Rangeland → Trees is canopy regrowth / reclamation, not settlement."},
        {type: 'image', url: "frontend_assets/Kendujhar/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Barbil", sublabel: "urban center • 5.86 km • district_context"}, {label: "Joda-Barbil iron-ore cluster", sublabel: "iron ore mine • 9.31 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.35, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 20,
      cord: [22.0825, 85.4038],
      district: "Kendujhar",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.35,
      title: "Kendujhar District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Rangeland → Trees"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Rangeland → Trees is canopy regrowth / reclamation, not settlement."},
        {type: 'image', url: "frontend_assets/Kendujhar/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Joda-Barbil iron-ore cluster", sublabel: "iron ore mine • 1.44 km • district_context"}, {label: "Barbil", sublabel: "urban center • 3.25 km • district_context"}, {label: "Joda", sublabel: "urban center • 5.35 km • district_context"}, {label: "Banspani railway junction", sublabel: "railway station • 6.07 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.35, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 21,
      cord: [20.228, 85.7335],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Khordha District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Tamando (5.91 km)."},
        {type: 'image', url: "frontend_assets/Khordha/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Tamando", sublabel: "urban center • 5.91 km • district_context"}, {label: "Jatni", sublabel: "urban center • 7.34 km • district_context"}, {label: "Biju Patnaik International Airport", sublabel: "airport • 9.13 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 22,
      cord: [20.3274, 85.7327],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Khordha District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. residential/industrial drivers overlap (Tamando (6.49 km); Chandaka Industrial Estate (7.03 km))."},
        {type: 'image', url: "frontend_assets/Khordha/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Tamando", sublabel: "urban center • 6.49 km • district_context"}, {label: "Chandaka Industrial Estate", sublabel: "industrial • 7.03 km • district_context"}, {label: "Infocity IT hub", sublabel: "industrial • 9.44 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.9, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 23,
      cord: [20.2286, 85.8101],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Khordha District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): Biju Patnaik International Airport (2.52 km)."},
        {type: 'image', url: "frontend_assets/Khordha/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Biju Patnaik International Airport", sublabel: "airport • 2.52 km • district_context"}, {label: "Bhubaneswar railway station", sublabel: "railway station • 5.12 km • district_context"}, {label: "Tamando", sublabel: "urban center • 7.34 km • district_context"}, {label: "Bhubaneswar", sublabel: "urban center • 7.66 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 24,
      cord: [20.2024, 85.9634],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Khordha District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): Khordha NH-16 SE corridor (0.74 km)."},
        {type: 'image', url: "frontend_assets/Khordha/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Khordha NH-16 SE corridor", sublabel: "industrial • 0.74 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 25,
      cord: [19.8882, 85.1059],
      district: "Khordha",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Khordha District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Khordha/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.6, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 26,
      cord: [21.7883, 86.1197],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Mayurbhanj District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.6, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 27,
      cord: [21.6731, 86.826],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Mayurbhanj District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Baripada eastern fringe (0.71 km)."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Baripada eastern fringe", sublabel: "urban center • 0.71 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 28,
      cord: [21.69, 86.333],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — unchanged → unchanged"},
        {type: 'text', value: "Demographic signal: non-built land-cover change — needs ground-truth. no Built-class conversion inside hotspot; spectral change without a clear land-cover flip."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.3, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 29,
      cord: [21.8245, 86.1195],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — unchanged → unchanged"},
        {type: 'text', value: "Demographic signal: non-built land-cover change — needs ground-truth. no Built-class conversion inside hotspot; spectral change without a clear land-cover flip."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.3, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 30,
      cord: [21.9342, 86.4093],
      district: "Mayurbhanj",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.3,
      title: "Mayurbhanj District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — unchanged → unchanged"},
        {type: 'text', value: "Demographic signal: non-built land-cover change — needs ground-truth. no Built-class conversion inside hotspot; spectral change without a clear land-cover flip."},
        {type: 'image', url: "frontend_assets/Mayurbhanj/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.3, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 31,
      cord: [21.4675, 83.8967],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Sambalpur District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Burla (6.13 km), Hirakud town (7.18 km), Sambalpur city (8.1 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Burla", sublabel: "urban center • 6.13 km • district_context"}, {label: "Hirakud town", sublabel: "urban center • 7.18 km • district_context"}, {label: "OHPC Hirakud Power Station", sublabel: "hydro power plant • 7.48 km • district_context"}, {label: "Sambalpur city", sublabel: "urban center • 8.1 km • district_context"}, {label: "Sambalpur railway junction", sublabel: "railway station • 9.57 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 32,
      cord: [21.6688, 84.0469],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Sambalpur District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): Aditya Aluminium Lapanga (9.41 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Aditya Aluminium Lapanga", sublabel: "aluminium smelter • 9.41 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 33,
      cord: [21.069, 84.3475],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Sambalpur District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Redhakhol (1.61 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Redhakhol", sublabel: "urban center • 1.61 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 34,
      cord: [21.5422, 84.0302],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.95,
      title: "Sambalpur District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): Aditya Aluminium Lapanga (9.67 km)."},
        {type: 'image', url: "frontend_assets/Sambalpur/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Aditya Aluminium Lapanga", sublabel: "aluminium smelter • 9.67 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 35,
      cord: [21.4137, 83.9171],
      district: "Sambalpur",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Sambalpur District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. transport/residential drivers overlap (Sambalpur railway junction (6.75 km); Sambalpur city (8.4 km))."},
        {type: 'image', url: "frontend_assets/Sambalpur/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Sambalpur railway junction", sublabel: "railway station • 6.75 km • district_context"}, {label: "Sambalpur city", sublabel: "urban center • 8.4 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.8, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 36,
      cord: [21.9075, 85.2528],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Mines",
      settlement_type: "mining_adjacent",
      confidence: 0.75,
      title: "Sundargarh District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mining-adjacent footprint — pit, haul roads, workforce colonies. dominated by mining_adjacent driver(s): Koira mining range (north) (7.21 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Koira mining range (north)", sublabel: "iron ore mine • 7.21 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 37,
      cord: [21.9669, 83.8003],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.8,
      title: "Sundargarh District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. mining_adjacent/residential drivers overlap (MCL Basundhara coal mine (5.2 km); Hemgir (6.39 km))."},
        {type: 'image', url: "frontend_assets/Sundargarh/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "MCL Basundhara coal mine", sublabel: "coal mine • 5.2 km • district_context"}, {label: "Hemgir", sublabel: "urban center • 6.39 km • district_context"}, {label: "Lephripara", sublabel: "urban center • 9.04 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.8, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 38,
      cord: [21.8756, 83.7443],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.75,
      title: "Sundargarh District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. mining_adjacent/residential drivers overlap (MCL Garjanbahal coal mine (5.32 km); Hemgir (6.45 km))."},
        {type: 'image', url: "frontend_assets/Sundargarh/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "MCL Garjanbahal coal mine", sublabel: "coal mine • 5.32 km • district_context"}, {label: "Hemgir", sublabel: "urban center • 6.45 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 39,
      cord: [21.9496, 83.8394],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.9,
      title: "Sundargarh District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Lephripara (5.63 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Lephripara", sublabel: "urban center • 5.63 km • district_context"}, {label: "Hemgir", sublabel: "urban center • 9.39 km • district_context"}, {label: "MCL Basundhara coal mine", sublabel: "coal mine • 9.49 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.9, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 40,
      cord: [21.9253, 85.2236],
      district: "Sundargarh",
      place: "2016 - 2024",
      category: "Mines",
      settlement_type: "mining_adjacent",
      confidence: 0.75,
      title: "Sundargarh District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mining-adjacent footprint — pit, haul roads, workforce colonies. dominated by mining_adjacent driver(s): Koira mining range (north) (3.67 km)."},
        {type: 'image', url: "frontend_assets/Sundargarh/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Koira mining range (north)", sublabel: "iron ore mine • 3.67 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 41,
      cord: [18.3682, 81.8985],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Malkangiri District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Malkangiri town (2.81 km)."},
        {type: 'image', url: "frontend_assets/Malkangiri/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Malkangiri town", sublabel: "urban center • 2.81 km • district_context"}, {label: "Kalimela", sublabel: "urban center • 7.41 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 42,
      cord: [17.9274, 81.5914],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Malkangiri District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. no registered driver nearby; Trees→Built transition in a forest-dominated district suggests frontier industrial/mining clearance."},
        {type: 'image', url: "frontend_assets/Malkangiri/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 43,
      cord: [17.9636, 81.5997],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Malkangiri District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. no registered driver nearby; Rangeland→Built transition could be rural settlement or industrial expansion."},
        {type: 'image', url: "frontend_assets/Malkangiri/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.7, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 44,
      cord: [17.9893, 81.5518],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Malkangiri District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. no registered driver nearby; Rangeland→Built transition could be rural settlement or industrial expansion."},
        {type: 'image', url: "frontend_assets/Malkangiri/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.7, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 45,
      cord: [17.8805, 81.527],
      district: "Malkangiri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Malkangiri District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. no registered driver nearby; Trees→Built transition in a forest-dominated district suggests frontier industrial/mining clearance."},
        {type: 'image', url: "frontend_assets/Malkangiri/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 46,
      cord: [18.7941, 82.7196],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Koraput District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. residential/transport drivers overlap (Koraput town (2.04 km); Koraput railway station (2.04 km))."},
        {type: 'image', url: "frontend_assets/Koraput/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Koraput town", sublabel: "urban center • 2.04 km • district_context"}, {label: "Koraput railway station", sublabel: "railway station • 2.04 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.9, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 47,
      cord: [18.8921, 82.6697],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Koraput District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. no registered driver nearby; Rangeland→Built transition could be rural settlement or industrial expansion."},
        {type: 'image', url: "frontend_assets/Koraput/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.7, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 48,
      cord: [18.845, 82.5857],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.9,
      title: "Koraput District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. residential/transport drivers overlap (Jeypore (2.34 km); Jeypore railway station (2.34 km))."},
        {type: 'image', url: "frontend_assets/Koraput/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Jeypore", sublabel: "urban center • 2.34 km • district_context"}, {label: "Jeypore railway station", sublabel: "railway station • 2.34 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.9, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 49,
      cord: [18.9378, 82.697],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Koraput District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Koraput/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.6, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 50,
      cord: [18.6249, 82.4307],
      district: "Koraput",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Koraput District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Koraput/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Lamtaput", sublabel: "urban center • 9.56 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.65, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 51,
      cord: [20.0045, 81.8687],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Build-up",
      settlement_type: "mixed",
      confidence: 0.7,
      title: "Nabarangpur District : Why it changed",
      content: [
        {type: 'heading', value: "Urban/industrial expansion onto rangeland"},
        {type: 'text', value: "Demographic signal: mixed industrial + residential footprint. no registered driver nearby; Rangeland→Built transition could be rural settlement or industrial expansion."},
        {type: 'image', url: "frontend_assets/Nabarangpur/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.7, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 52,
      cord: [19.6068, 82.1477],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.65,
      title: "Nabarangpur District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Nabarangpur/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Umerkote", sublabel: "urban center • 8.91 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.65, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 53,
      cord: [19.9826, 82.0505],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Nabarangpur District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Nabarangpur/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.6, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 54,
      cord: [19.9075, 82.272],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "vegetation",
      confidence: 0.6,
      title: "Nabarangpur District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Trees → Rangeland"},
        {type: 'text', value: "Demographic signal: vegetation change — canopy loss / regrowth / mining footprint, not settlement. no new Built-class pixels; Trees → Rangeland indicates canopy loss / mining-pit advance, not settlement."},
        {type: 'image', url: "frontend_assets/Nabarangpur/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.6, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 55,
      cord: [19.6799, 82.1835],
      district: "Nabarangpur",
      place: "2016 - 2024",
      category: "Vegetation",
      settlement_type: "unclassified",
      confidence: 0.55,
      title: "Nabarangpur District : Why it changed",
      content: [
        {type: 'heading', value: "Spectral / vegetation change without new Built footprint — Rangeland → Crops"},
        {type: 'text', value: "Demographic signal: non-built land-cover change — needs ground-truth. no Built-class conversion inside hotspot; spectral change without a clear land-cover flip."},
        {type: 'image', url: "frontend_assets/Nabarangpur/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Umerkote", sublabel: "urban center • 2.04 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.55, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 56,
      cord: [19.9423, 85.8883],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Satyabadi (5.34 km)."},
        {type: 'image', url: "frontend_assets/Puri/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Satyabadi", sublabel: "urban center • 5.34 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 57,
      cord: [19.7599, 85.651],
      district: "Puri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Puri District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. no registered driver nearby; Trees→Built transition in a forest-dominated district suggests frontier industrial/mining clearance."},
        {type: 'image', url: "frontend_assets/Puri/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 58,
      cord: [19.8061, 85.7842],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Brahmagiri (3.82 km)."},
        {type: 'image', url: "frontend_assets/Puri/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Brahmagiri", sublabel: "urban center • 3.82 km • district_context"}, {label: "Puri railway station", sublabel: "railway station • 4.81 km • district_context"}, {label: "Puri town", sublabel: "urban center • 5.0 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 59,
      cord: [20.1589, 85.858],
      district: "Puri",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Puri District : Why it changed",
      content: [
        {type: 'heading', value: "Urban or industrial expansion onto farmland"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Pipli (5.35 km)."},
        {type: 'image', url: "frontend_assets/Puri/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Pipli", sublabel: "urban center • 5.35 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 60,
      cord: [19.9961, 85.821],
      district: "Puri",
      place: "2016 - 2024",
      category: "Industry",
      settlement_type: "industrial",
      confidence: 0.75,
      title: "Puri District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: industrial build-out — plant expansion, workforce housing likely. no registered driver nearby; Trees→Built transition in a forest-dominated district suggests frontier industrial/mining clearance."},
        {type: 'image', url: "frontend_assets/Puri/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'meter', label: "Confidence", value: 0.75, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 61,
      cord: [21.6287, 87.4665],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Bhograi (6.8 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/context_maps/hotspot_01.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Bhograi", sublabel: "urban center • 6.8 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 62,
      cord: [21.683, 87.4377],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Bhograi (3.84 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/context_maps/hotspot_02.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Bhograi", sublabel: "urban center • 3.84 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 63,
      cord: [21.6831, 87.3894],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Bhograi (3.34 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/context_maps/hotspot_03.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Bhograi", sublabel: "urban center • 3.34 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 64,
      cord: [21.6468, 87.4376],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Bhograi (3.21 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/context_maps/hotspot_04.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Bhograi", sublabel: "urban center • 3.21 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
    {
      id: 65,
      cord: [21.7372, 87.4185],
      district: "Baleshwar",
      place: "2016 - 2024",
      category: "Urban Sprawl",
      settlement_type: "residential",
      confidence: 0.95,
      title: "Baleshwar District : Why it changed",
      content: [
        {type: 'heading', value: "Forest cleared for urban or industrial development"},
        {type: 'text', value: "Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Bhograi (8.63 km)."},
        {type: 'image', url: "frontend_assets/Baleshwar/context_maps/hotspot_05.png", desc: "Drivers within 10 km of the hotspot — registered industrial / mining / urban features within the proximity buffer"},
        {type: 'list', title: "Nearest known drivers", items: [{label: "Bhograi", sublabel: "urban center • 8.63 km • district_context"}]},
        {type: 'meter', label: "Confidence", value: 0.95, max: 1, color: "#F76000"}
      ],
    },
  ],
};

export const Points_Data: PointEntry[] = [
  {id: 1, cord: [20.9443, 85.0133], district: "Angul", category: "Build-up", settlement_type: "mixed", score: 713.41, new_built_area_ha: 20.88, confidence: 0.95},
  {id: 2, cord: [20.9188, 85.1579], district: "Angul", category: "Industry", settlement_type: "industrial", score: 626.12, new_built_area_ha: 33.84, confidence: 0.95},
  {id: 3, cord: [20.7647, 85.1117], district: "Angul", category: "Infrastructure", settlement_type: "transport", score: 593.94, new_built_area_ha: 33.12, confidence: 0.8},
  {id: 4, cord: [20.7653, 85.1597], district: "Angul", category: "Build-up", settlement_type: "mixed", score: 579.39, new_built_area_ha: 30.6, confidence: 0.9},
  {id: 5, cord: [21.0415, 84.8389], district: "Angul", category: "Urban Sprawl", settlement_type: "residential", score: 510.35, new_built_area_ha: 25.2, confidence: 0.95},
  {id: 6, cord: [20.7189, 83.4724], district: "Balangir", category: "Urban Sprawl", settlement_type: "residential", score: 711.95, new_built_area_ha: 50.04, confidence: 0.95},
  {id: 7, cord: [20.4628, 82.9039], district: "Balangir", category: "Build-up", settlement_type: "mixed", score: 510.23, new_built_area_ha: 33.48, confidence: 0.75},
  {id: 8, cord: [20.7392, 83.587], district: "Balangir", category: "Build-up", settlement_type: "mixed", score: 497.45, new_built_area_ha: 27, confidence: 0.7},
  {id: 9, cord: [20.4634, 82.9326], district: "Balangir", category: "Build-up", settlement_type: "mixed", score: 443.66, new_built_area_ha: 25.56, confidence: 0.8},
  {id: 10, cord: [20.711, 83.5301], district: "Balangir", category: "Build-up", settlement_type: "mixed", score: 442.96, new_built_area_ha: 27.72, confidence: 0.75},
  {id: 11, cord: [20.4964, 86.0485], district: "Cuttack", category: "Urban Sprawl", settlement_type: "residential", score: 780.9, new_built_area_ha: 46.44, confidence: 0.95},
  {id: 12, cord: [20.4405, 85.7805], district: "Cuttack", category: "Infrastructure", settlement_type: "transport", score: 768.22, new_built_area_ha: 62.64, confidence: 0.8},
  {id: 13, cord: [20.5149, 86.1443], district: "Cuttack", category: "Urban Sprawl", settlement_type: "residential", score: 677.36, new_built_area_ha: 53.28, confidence: 0.95},
  {id: 14, cord: [20.5879, 85.0982], district: "Cuttack", category: "Vegetation", settlement_type: "unclassified", score: 648.19, new_built_area_ha: 0, confidence: 0.3},
  {id: 15, cord: [20.4959, 85.9718], district: "Cuttack", category: "Build-up", settlement_type: "mixed", score: 631.62, new_built_area_ha: 49.68, confidence: 0.95},
  {id: 16, cord: [21.875, 85.4255], district: "Kendujhar", category: "Urban Sprawl", settlement_type: "residential", score: 860.09, new_built_area_ha: 46.44, confidence: 0.9},
  {id: 17, cord: [21.9559, 85.3859], district: "Kendujhar", category: "Vegetation", settlement_type: "vegetation", score: 821.08, new_built_area_ha: 0, confidence: 0.65},
  {id: 18, cord: [22.119, 85.4422], district: "Kendujhar", category: "Vegetation", settlement_type: "vegetation", score: 736.46, new_built_area_ha: 0, confidence: 0.65},
  {id: 19, cord: [22.1178, 85.3259], district: "Kendujhar", category: "Vegetation", settlement_type: "vegetation", score: 706.4, new_built_area_ha: 0, confidence: 0.35},
  {id: 20, cord: [22.0825, 85.4038], district: "Kendujhar", category: "Vegetation", settlement_type: "vegetation", score: 689.51, new_built_area_ha: 0, confidence: 0.35},
  {id: 21, cord: [20.228, 85.7335], district: "Khordha", category: "Urban Sprawl", settlement_type: "residential", score: 902.53, new_built_area_ha: 72, confidence: 0.95},
  {id: 22, cord: [20.3274, 85.7327], district: "Khordha", category: "Build-up", settlement_type: "mixed", score: 779.75, new_built_area_ha: 56.88, confidence: 0.9},
  {id: 23, cord: [20.2286, 85.8101], district: "Khordha", category: "Industry", settlement_type: "industrial", score: 658.62, new_built_area_ha: 42.48, confidence: 0.95},
  {id: 24, cord: [20.2024, 85.9634], district: "Khordha", category: "Industry", settlement_type: "industrial", score: 636.7, new_built_area_ha: 35.64, confidence: 0.95},
  {id: 25, cord: [19.8882, 85.1059], district: "Khordha", category: "Vegetation", settlement_type: "vegetation", score: 626.97, new_built_area_ha: 0, confidence: 0.6},
  {id: 26, cord: [21.7883, 86.1197], district: "Mayurbhanj", category: "Vegetation", settlement_type: "vegetation", score: 699.15, new_built_area_ha: 0, confidence: 0.6},
  {id: 27, cord: [21.6731, 86.826], district: "Mayurbhanj", category: "Urban Sprawl", settlement_type: "residential", score: 649.58, new_built_area_ha: 33.48, confidence: 0.95},
  {id: 28, cord: [21.69, 86.333], district: "Mayurbhanj", category: "Vegetation", settlement_type: "unclassified", score: 577.9, new_built_area_ha: 0, confidence: 0.3},
  {id: 29, cord: [21.8245, 86.1195], district: "Mayurbhanj", category: "Vegetation", settlement_type: "unclassified", score: 577.14, new_built_area_ha: 0, confidence: 0.3},
  {id: 30, cord: [21.9342, 86.4093], district: "Mayurbhanj", category: "Vegetation", settlement_type: "unclassified", score: 571.96, new_built_area_ha: 0, confidence: 0.3},
  {id: 31, cord: [21.4675, 83.8967], district: "Sambalpur", category: "Urban Sprawl", settlement_type: "residential", score: 732.44, new_built_area_ha: 35.28, confidence: 0.95},
  {id: 32, cord: [21.6688, 84.0469], district: "Sambalpur", category: "Industry", settlement_type: "industrial", score: 707.23, new_built_area_ha: 33.84, confidence: 0.95},
  {id: 33, cord: [21.069, 84.3475], district: "Sambalpur", category: "Urban Sprawl", settlement_type: "residential", score: 695.66, new_built_area_ha: 28.44, confidence: 0.95},
  {id: 34, cord: [21.5422, 84.0302], district: "Sambalpur", category: "Industry", settlement_type: "industrial", score: 652.01, new_built_area_ha: 17.64, confidence: 0.95},
  {id: 35, cord: [21.4137, 83.9171], district: "Sambalpur", category: "Build-up", settlement_type: "mixed", score: 643.47, new_built_area_ha: 27.72, confidence: 0.8},
  {id: 36, cord: [21.9075, 85.2528], district: "Sundargarh", category: "Mines", settlement_type: "mining_adjacent", score: 1281.34, new_built_area_ha: 77.4, confidence: 0.75},
  {id: 37, cord: [21.9669, 83.8003], district: "Sundargarh", category: "Build-up", settlement_type: "mixed", score: 763.24, new_built_area_ha: 25.56, confidence: 0.8},
  {id: 38, cord: [21.8756, 83.7443], district: "Sundargarh", category: "Build-up", settlement_type: "mixed", score: 760.28, new_built_area_ha: 39.24, confidence: 0.75},
  {id: 39, cord: [21.9496, 83.8394], district: "Sundargarh", category: "Urban Sprawl", settlement_type: "residential", score: 672.52, new_built_area_ha: 33.48, confidence: 0.9},
  {id: 40, cord: [21.9253, 85.2236], district: "Sundargarh", category: "Mines", settlement_type: "mining_adjacent", score: 656.23, new_built_area_ha: 35.28, confidence: 0.75},
  {id: 41, cord: [18.3682, 81.8985], district: "Malkangiri", category: "Urban Sprawl", settlement_type: "residential", score: 894.88, new_built_area_ha: 32.4, confidence: 0.95},
  {id: 42, cord: [17.9274, 81.5914], district: "Malkangiri", category: "Industry", settlement_type: "industrial", score: 846.35, new_built_area_ha: 39.96, confidence: 0.75},
  {id: 43, cord: [17.9636, 81.5997], district: "Malkangiri", category: "Build-up", settlement_type: "mixed", score: 700.91, new_built_area_ha: 24.84, confidence: 0.7},
  {id: 44, cord: [17.9893, 81.5518], district: "Malkangiri", category: "Build-up", settlement_type: "mixed", score: 670.56, new_built_area_ha: 21.6, confidence: 0.7},
  {id: 45, cord: [17.8805, 81.527], district: "Malkangiri", category: "Industry", settlement_type: "industrial", score: 600.92, new_built_area_ha: 15.48, confidence: 0.75},
  {id: 46, cord: [18.7941, 82.7196], district: "Koraput", category: "Build-up", settlement_type: "mixed", score: 859.45, new_built_area_ha: 29.88, confidence: 0.9},
  {id: 47, cord: [18.8921, 82.6697], district: "Koraput", category: "Build-up", settlement_type: "mixed", score: 851.43, new_built_area_ha: 20.16, confidence: 0.7},
  {id: 48, cord: [18.845, 82.5857], district: "Koraput", category: "Build-up", settlement_type: "mixed", score: 721.2, new_built_area_ha: 21.96, confidence: 0.9},
  {id: 49, cord: [18.9378, 82.697], district: "Koraput", category: "Vegetation", settlement_type: "vegetation", score: 683.36, new_built_area_ha: 0, confidence: 0.6},
  {id: 50, cord: [18.6249, 82.4307], district: "Koraput", category: "Vegetation", settlement_type: "vegetation", score: 657.73, new_built_area_ha: 0, confidence: 0.65},
  {id: 51, cord: [20.0045, 81.8687], district: "Nabarangpur", category: "Build-up", settlement_type: "mixed", score: 616.48, new_built_area_ha: 32.4, confidence: 0.7},
  {id: 52, cord: [19.6068, 82.1477], district: "Nabarangpur", category: "Vegetation", settlement_type: "vegetation", score: 509.86, new_built_area_ha: 0, confidence: 0.65},
  {id: 53, cord: [19.9826, 82.0505], district: "Nabarangpur", category: "Vegetation", settlement_type: "vegetation", score: 505.3, new_built_area_ha: 0, confidence: 0.6},
  {id: 54, cord: [19.9075, 82.272], district: "Nabarangpur", category: "Vegetation", settlement_type: "vegetation", score: 501.95, new_built_area_ha: 0, confidence: 0.6},
  {id: 55, cord: [19.6799, 82.1835], district: "Nabarangpur", category: "Vegetation", settlement_type: "unclassified", score: 492.81, new_built_area_ha: 0, confidence: 0.55},
  {id: 56, cord: [19.9423, 85.8883], district: "Puri", category: "Urban Sprawl", settlement_type: "residential", score: 672.17, new_built_area_ha: 39.96, confidence: 0.95},
  {id: 57, cord: [19.7599, 85.651], district: "Puri", category: "Industry", settlement_type: "industrial", score: 637.46, new_built_area_ha: 41.04, confidence: 0.75},
  {id: 58, cord: [19.8061, 85.7842], district: "Puri", category: "Urban Sprawl", settlement_type: "residential", score: 618.4, new_built_area_ha: 51.48, confidence: 0.95},
  {id: 59, cord: [20.1589, 85.858], district: "Puri", category: "Urban Sprawl", settlement_type: "residential", score: 583.62, new_built_area_ha: 44.64, confidence: 0.95},
  {id: 60, cord: [19.9961, 85.821], district: "Puri", category: "Industry", settlement_type: "industrial", score: 571.53, new_built_area_ha: 42.48, confidence: 0.75},
  {id: 61, cord: [21.6287, 87.4665], district: "Baleshwar", category: "Urban Sprawl", settlement_type: "residential", score: 855.74, new_built_area_ha: 39.96, confidence: 0.95},
  {id: 62, cord: [21.683, 87.4377], district: "Baleshwar", category: "Urban Sprawl", settlement_type: "residential", score: 812.2, new_built_area_ha: 41.76, confidence: 0.95},
  {id: 63, cord: [21.6831, 87.3894], district: "Baleshwar", category: "Urban Sprawl", settlement_type: "residential", score: 767.45, new_built_area_ha: 57.24, confidence: 0.95},
  {id: 64, cord: [21.6468, 87.4376], district: "Baleshwar", category: "Urban Sprawl", settlement_type: "residential", score: 754.57, new_built_area_ha: 38.52, confidence: 0.95},
  {id: 65, cord: [21.7372, 87.4185], district: "Baleshwar", category: "Urban Sprawl", settlement_type: "residential", score: 732.94, new_built_area_ha: 51.48, confidence: 0.95},
];

/* ---------------------------------------------------------------
 * Frontend integration notes
 * ---------------------------------------------------------------
 *
 * Drop-in: replace
 *     import { TAB_CONTENT, Points_Data } from '../MapCompare/pointData';
 * with
 *     import { TAB_CONTENT, Points_Data } from '../data/frontend_data';
 *
 * The existing heading / text / image branches keep working unchanged.
 *
 * To render the new block types, add three branches to your switch
 * inside the modal body (in what_how_why.tsx):
 *
 *   } else if (block.type === 'stats') {
 *     return (
 *       <div key={idx} className="grid grid-cols-2 gap-2 mb-6">
 *         {block.items.map((s, i) => (
 *           <div key={i} className="rounded-lg border border-gray-100 p-3 bg-gray-50/50">
 *             <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{s.label}</div>
 *             <div className="text-sm font-black text-gray-900 mt-1">
 *               {s.value}{s.unit ? <span className="text-[10px] font-bold text-gray-400 ml-1">{s.unit}</span> : null}
 *             </div>
 *           </div>
 *         ))}
 *       </div>
 *     );
 *   } else if (block.type === 'list') {
 *     return (
 *       <div key={idx} className="mb-6">
 *         {block.title && <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{block.title}</div>}
 *         <ul className="flex flex-col gap-1.5">
 *           {block.items.map((it, i) => (
 *             <li key={i} className="flex justify-between text-[12px] text-gray-700 border-b border-gray-100 pb-1.5">
 *               <span className="font-bold">{it.label}</span>
 *               {it.sublabel && <span className="text-gray-400 font-mono">{it.sublabel}</span>}
 *             </li>
 *           ))}
 *         </ul>
 *       </div>
 *     );
 *   } else if (block.type === 'meter') {
 *     const pct = Math.round((block.value / (block.max || 1)) * 100);
 *     return (
 *       <div key={idx} className="mb-6">
 *         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
 *           <span>{block.label}</span><span>{pct}%</span>
 *         </div>
 *         <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
 *           <div className="h-full" style={{ width: pct + '%', background: block.color || '#F76000' }} />
 *         </div>
 *       </div>
 *     );
 *   }
 *
 * The chip / GIF / heatmap PNG paths in `image.url` are relative paths
 * (outputs/<district>/chips/hotspot_NN.png etc). Configure your dev server
 * (or build pipeline) to serve `outputs/` as a static directory, or copy
 * the chips into your `public/` folder.
 */
