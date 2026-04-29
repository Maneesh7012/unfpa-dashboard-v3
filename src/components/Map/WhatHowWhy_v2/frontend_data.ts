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
  | {
      type: 'list';
      title?: string;
      items: { label: string; sublabel?: string }[];
    }
  | {
      type: 'meter';
      label: string;
      value: number;
      max?: number;
      color?: string;
    };

export type SettlementType =
  | 'residential'
  | 'industrial'
  | 'mining_adjacent'
  | 'transport'
  | 'mixed'
  | 'unclassified';

export interface TabEntry {
  id: number;
  cord: [number, number]; // [lat, lon]
  district: string;
  place: string; // e.g. '2016 - 2024'
  category: string; // 'Urban Sprawl' | 'Industry' | 'Mines' | 'Infrastructure' | 'Build-up' | 'Vegetation'
  settlement_type: SettlementType;
  confidence: number; // 0..1
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

export const TAB_CONTENT: {
  What: TabEntry[];
  How: TabEntry[];
  Why: TabEntry[];
} = {
  What: [
    {
      id: 1,
      cord: [20.9443, 85.0133],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.95,
      title: 'Angul District : What changed',
      content: [
        { type: 'heading', value: 'NTPC Talcher Super Thermal approach' },
        {
          type: 'text',
          value:
            '20.9 ha of new built-up area appeared between 2016 and 2024 (18.4 ha from Trees, 2.5 ha from Rangeland). Nearest landmark: NTPC Talcher Super Thermal (thermal power plant, ~1.27 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/chips/hotspot_01.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '20.9', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '18.4 ha',
            },
            { label: 'From Trees', value: '18.4', unit: 'ha' },
            { label: 'From Rangeland', value: '2.5', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 2,
      cord: [20.9188, 85.1579],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.95,
      title: 'Angul District : What changed',
      content: [
        { type: 'heading', value: 'NTPC Kaniha Super Thermal approach' },
        {
          type: 'text',
          value:
            '33.8 ha of new built-up area appeared between 2016 and 2024 (22.3 ha from Trees, 11.2 ha from Rangeland, 0.4 ha from Crops). Nearest landmark: NTPC Kaniha Super Thermal (thermal power plant, ~3.0 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/chips/hotspot_02.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '33.8', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '22.3 ha',
            },
            { label: 'From Trees', value: '22.3', unit: 'ha' },
            { label: 'From Rangeland', value: '11.2', unit: 'ha' },
            { label: 'From Crops', value: '0.4', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 3,
      cord: [20.7647, 85.1117],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Angul District : What changed',
      content: [
        { type: 'heading', value: 'Angul railway station rail corridor' },
        {
          type: 'text',
          value:
            '33.1 ha of new built-up area appeared between 2016 and 2024 (18.7 ha from Trees, 13.7 ha from Crops, 0.7 ha from Rangeland). Nearest landmark: Angul railway station (railway station, ~8.46 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/chips/hotspot_03.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '33.1', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '18.7 ha',
            },
            { label: 'From Trees', value: '18.7', unit: 'ha' },
            { label: 'From Crops', value: '13.7', unit: 'ha' },
            { label: 'From Rangeland', value: '0.7', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 4,
      cord: [20.7653, 85.1597],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.9,
      title: 'Angul District : What changed',
      content: [
        { type: 'heading', value: 'NALCO Angul Smelter approach' },
        {
          type: 'text',
          value:
            '30.6 ha of new built-up area appeared between 2016 and 2024 (16.2 ha from Rangeland, 13.3 ha from Trees, 1.1 ha from Crops). Nearest landmark: NALCO Angul Smelter (aluminium smelter, ~9.81 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/chips/hotspot_04.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '30.6', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Rangeland → Built',
              unit: '16.2 ha',
            },
            { label: 'From Rangeland', value: '16.2', unit: 'ha' },
            { label: 'From Trees', value: '13.3', unit: 'ha' },
            { label: 'From Crops', value: '1.1', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 5,
      cord: [21.0415, 84.8389],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Angul District : What changed',
      content: [
        { type: 'heading', value: 'Chhendipada periphery' },
        {
          type: 'text',
          value:
            '25.2 ha of new built-up area appeared between 2016 and 2024 (23.0 ha from Crops, 2.2 ha from Trees). Nearest landmark: Chhendipada (urban center, ~3.23 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/chips/hotspot_05.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '25.2', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Crops → Built',
              unit: '23.0 ha',
            },
            { label: 'From Crops', value: '23.0', unit: 'ha' },
            { label: 'From Trees', value: '2.2', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 6,
      cord: [20.7189, 83.4724],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Balangir District : What changed',
      content: [
        { type: 'heading', value: 'Balangir town periphery' },
        {
          type: 'text',
          value:
            '50.0 ha of new built-up area appeared between 2016 and 2024 (47.2 ha from Crops, 2.5 ha from Trees, 0.4 ha from Water). Nearest landmark: Balangir town (urban center, ~2.03 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/chips/hotspot_01.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '50.0', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Crops → Built',
              unit: '47.2 ha',
            },
            { label: 'From Crops', value: '47.2', unit: 'ha' },
            { label: 'From Trees', value: '2.5', unit: 'ha' },
            { label: 'From Water', value: '0.4', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 7,
      cord: [20.4628, 82.9039],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.75,
      title: 'Balangir District : What changed',
      content: [
        { type: 'heading', value: 'Kantabanji railway station rail corridor' },
        {
          type: 'text',
          value:
            '33.5 ha of new built-up area appeared between 2016 and 2024 (32.0 ha from Rangeland, 1.4 ha from Crops). Nearest landmark: Kantabanji railway station (railway station, ~3.34 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/chips/hotspot_02.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '33.5', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Rangeland → Built',
              unit: '32.0 ha',
            },
            { label: 'From Rangeland', value: '32.0', unit: 'ha' },
            { label: 'From Crops', value: '1.4', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 8,
      cord: [20.7392, 83.587],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.7,
      title: 'Balangir District : What changed',
      content: [
        { type: 'heading', value: 'Transport-Corridor Development' },
        {
          type: 'text',
          value:
            '27.0 ha of new built-up area appeared between 2016 and 2024 (26.6 ha from Rangeland, 0.4 ha from Water). Nearest landmark: (unnamed railway) (railway, ~0.51 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/chips/hotspot_03.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '27.0', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Rangeland → Built',
              unit: '26.6 ha',
            },
            { label: 'From Rangeland', value: '26.6', unit: 'ha' },
            { label: 'From Water', value: '0.4', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 9,
      cord: [20.4634, 82.9326],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Balangir District : What changed',
      content: [
        { type: 'heading', value: 'Kantabanji railway station rail corridor' },
        {
          type: 'text',
          value:
            '25.6 ha of new built-up area appeared between 2016 and 2024 (24.8 ha from Crops, 0.7 ha from Trees). Nearest landmark: Kantabanji railway station (railway station, ~6.25 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/chips/hotspot_04.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '25.6', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Crops → Built',
              unit: '24.8 ha',
            },
            { label: 'From Crops', value: '24.8', unit: 'ha' },
            { label: 'From Trees', value: '0.7', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 10,
      cord: [20.711, 83.5301],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.75,
      title: 'Balangir District : What changed',
      content: [
        { type: 'heading', value: 'Balangir railway station rail corridor' },
        {
          type: 'text',
          value:
            '27.7 ha of new built-up area appeared between 2016 and 2024 (19.4 ha from Rangeland, 8.3 ha from Crops). Nearest landmark: Balangir railway station (railway station, ~3.71 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/chips/hotspot_05.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '27.7', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Rangeland → Built',
              unit: '19.4 ha',
            },
            { label: 'From Rangeland', value: '19.4', unit: 'ha' },
            { label: 'From Crops', value: '8.3', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 11,
      cord: [20.4964, 86.0485],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Cuttack District : What changed',
      content: [
        { type: 'heading', value: 'Salipur periphery' },
        {
          type: 'text',
          value:
            '46.4 ha of new built-up area appeared between 2016 and 2024 (38.5 ha from Trees, 7.9 ha from Crops). Nearest landmark: Salipur (urban center, ~9.06 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/chips/hotspot_01.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '46.4', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '38.5 ha',
            },
            { label: 'From Trees', value: '38.5', unit: 'ha' },
            { label: 'From Crops', value: '7.9', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 12,
      cord: [20.4405, 85.7805],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Cuttack District : What changed',
      content: [
        { type: 'heading', value: 'Cuttack railway station rail corridor' },
        {
          type: 'text',
          value:
            '62.6 ha of new built-up area appeared between 2016 and 2024 (31.3 ha from Crops, 26.6 ha from Rangeland, 4.7 ha from Trees). Nearest landmark: Cuttack railway station (railway station, ~9.77 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/chips/hotspot_02.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '62.6', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Crops → Built',
              unit: '31.3 ha',
            },
            { label: 'From Crops', value: '31.3', unit: 'ha' },
            { label: 'From Rangeland', value: '26.6', unit: 'ha' },
            { label: 'From Trees', value: '4.7', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 13,
      cord: [20.5149, 86.1443],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Cuttack District : What changed',
      content: [
        { type: 'heading', value: 'Salipur periphery' },
        {
          type: 'text',
          value:
            '53.3 ha of new built-up area appeared between 2016 and 2024 (46.8 ha from Trees, 6.5 ha from Crops). Nearest landmark: Salipur (urban center, ~6.32 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/chips/hotspot_03.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '53.3', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '46.8 ha',
            },
            { label: 'From Trees', value: '46.8', unit: 'ha' },
            { label: 'From Crops', value: '6.5', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 14,
      cord: [20.5879, 85.0982],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.3,
      title: 'Cuttack District : What changed',
      content: [
        { type: 'heading', value: 'Angul - Narasinghpur Road corridor' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by unchanged → unchanged (0.0 ha). Nearest landmark: Angul - Narasinghpur Road (road, ~5.73 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/chips/hotspot_04.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'unchanged → unchanged',
              unit: '0.0 ha',
            },
          ],
        },
      ],
    },
    {
      id: 15,
      cord: [20.4959, 85.9718],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Cuttack District : What changed',
      content: [
        { type: 'heading', value: 'Choudwar Industrial Area approach' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by Trees → Built (25.6 ha). Nearest landmark: Choudwar Industrial Area (industrial, ~8.54 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/chips/hotspot_05.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '25.6 ha',
            },
          ],
        },
      ],
    },
    {
      id: 16,
      cord: [21.875, 85.4255],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.7,
      title: 'Kendujhar District : What changed',
      content: [
        { type: 'heading', value: 'Mixed Industrial + Residential Footprint' },
        {
          type: 'text',
          value:
            '46.4 ha of new built-up area appeared between 2016 and 2024 (33.8 ha from Rangeland, 10.8 ha from Trees, 1.8 ha from Crops). Nearest landmark: no registered driver within 10 km.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/chips/hotspot_01.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '46.4', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Rangeland → Built',
              unit: '33.8 ha',
            },
            { label: 'From Rangeland', value: '33.8', unit: 'ha' },
            { label: 'From Trees', value: '10.8', unit: 'ha' },
            { label: 'From Crops', value: '1.8', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 17,
      cord: [21.9559, 85.3859],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.65,
      title: 'Kendujhar District : What changed',
      content: [
        { type: 'heading', value: 'Thakurani iron-ore mine surrounds' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (27.0 ha). Nearest landmark: Thakurani iron-ore mine (iron ore mine, ~6.14 km).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/chips/hotspot_02.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'Trees → Rangeland',
              unit: '27.0 ha',
            },
          ],
        },
      ],
    },
    {
      id: 18,
      cord: [22.119, 85.4422],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.65,
      title: 'Kendujhar District : What changed',
      content: [
        { type: 'heading', value: 'Barbil periphery' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (4.7 ha). Nearest landmark: Barbil (urban center, ~6.69 km).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/chips/hotspot_03.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'Trees → Rangeland',
              unit: '4.7 ha',
            },
          ],
        },
      ],
    },
    {
      id: 19,
      cord: [22.1178, 85.3259],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.35,
      title: 'Kendujhar District : What changed',
      content: [
        { type: 'heading', value: 'Barbil periphery' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by Rangeland → Trees (4.3 ha). Nearest landmark: Barbil (urban center, ~5.86 km).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/chips/hotspot_04.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'Rangeland → Trees',
              unit: '4.3 ha',
            },
          ],
        },
      ],
    },
    {
      id: 20,
      cord: [22.0825, 85.4038],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.35,
      title: 'Kendujhar District : What changed',
      content: [
        { type: 'heading', value: 'Joda-Barbil iron-ore cluster surrounds' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by Rangeland → Trees (0.7 ha). Nearest landmark: Joda-Barbil iron-ore cluster (iron ore mine, ~1.44 km).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/chips/hotspot_05.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'Rangeland → Trees',
              unit: '0.7 ha',
            },
          ],
        },
      ],
    },
    {
      id: 21,
      cord: [20.228, 85.7335],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Khordha District : What changed',
      content: [
        { type: 'heading', value: 'Tamando periphery' },
        {
          type: 'text',
          value:
            '72.0 ha of new built-up area appeared between 2016 and 2024 (58.7 ha from Crops, 13.3 ha from Rangeland). Nearest landmark: Tamando (urban center, ~5.91 km).',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/chips/hotspot_01.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '72.0', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Crops → Built',
              unit: '58.7 ha',
            },
            { label: 'From Crops', value: '58.7', unit: 'ha' },
            { label: 'From Rangeland', value: '13.3', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 22,
      cord: [20.3274, 85.7327],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.9,
      title: 'Khordha District : What changed',
      content: [
        { type: 'heading', value: 'Tamando periphery' },
        {
          type: 'text',
          value:
            '56.9 ha of new built-up area appeared between 2016 and 2024 (52.2 ha from Rangeland, 4.0 ha from Trees, 0.7 ha from Crops). Nearest landmark: Tamando (urban center, ~6.49 km).',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/chips/hotspot_02.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '56.9', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Rangeland → Built',
              unit: '52.2 ha',
            },
            { label: 'From Rangeland', value: '52.2', unit: 'ha' },
            { label: 'From Trees', value: '4.0', unit: 'ha' },
            { label: 'From Crops', value: '0.7', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 23,
      cord: [20.2286, 85.8101],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.95,
      title: 'Khordha District : What changed',
      content: [
        {
          type: 'heading',
          value: 'Biju Patnaik International Airport approach',
        },
        {
          type: 'text',
          value:
            '42.5 ha of new built-up area appeared between 2016 and 2024 (42.1 ha from Crops, 0.4 ha from Rangeland). Nearest landmark: Biju Patnaik International Airport (airport, ~2.52 km).',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/chips/hotspot_03.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '42.5', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Crops → Built',
              unit: '42.1 ha',
            },
            { label: 'From Crops', value: '42.1', unit: 'ha' },
            { label: 'From Rangeland', value: '0.4', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 24,
      cord: [20.2024, 85.9634],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.75,
      title: 'Khordha District : What changed',
      content: [
        { type: 'heading', value: 'Industrial Build-Out' },
        {
          type: 'text',
          value:
            '35.6 ha of new built-up area appeared between 2016 and 2024 (28.1 ha from Trees, 7.2 ha from Crops, 0.4 ha from Rangeland). Nearest landmark: no registered driver within 10 km.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/chips/hotspot_04.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            { label: 'New built-up', value: '35.6', unit: 'ha' },
            {
              label: 'Dominant transition',
              value: 'Trees → Built',
              unit: '28.1 ha',
            },
            { label: 'From Trees', value: '28.1', unit: 'ha' },
            { label: 'From Crops', value: '7.2', unit: 'ha' },
            { label: 'From Rangeland', value: '0.4', unit: 'ha' },
          ],
        },
      ],
    },
    {
      id: 25,
      cord: [19.8882, 85.1059],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Vegetation',
      settlement_type: 'unclassified',
      confidence: 0.6,
      title: 'Khordha District : What changed',
      content: [
        { type: 'heading', value: 'Non-Built Land-Cover Change' },
        {
          type: 'text',
          value:
            'No net new built-up area inside this hotspot, but the change score is dominated by Trees → Rangeland (24.5 ha). Nearest landmark: no registered driver within 10 km.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/chips/hotspot_05.png',
          desc: 'Sentinel-2 RGB before / after — 2016 vs 2024',
        },
        {
          type: 'stats',
          items: [
            {
              label: 'Dominant transition',
              value: 'Trees → Rangeland',
              unit: '24.5 ha',
            },
          ],
        },
      ],
    },
  ],

  How: [
    {
      id: 1,
      cord: [20.9443, 85.0133],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.95,
      title: 'Angul District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 18.4 ha trees, 2.5 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Angul/gifs/hotspot_01.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Trees → Built', sublabel: '18.4 ha (51 pixels)' },
            { label: 'Rangeland → Built', sublabel: '2.5 ha (7 pixels)' },
          ],
        },
      ],
    },
    {
      id: 2,
      cord: [20.9188, 85.1579],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.95,
      title: 'Angul District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 22.3 ha trees, 11.2 ha rangeland, 0.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Angul/gifs/hotspot_02.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Trees → Built', sublabel: '22.3 ha (62 pixels)' },
            { label: 'Rangeland → Built', sublabel: '11.2 ha (31 pixels)' },
            { label: 'Crops → Built', sublabel: '0.4 ha (1 pixels)' },
          ],
        },
      ],
    },
    {
      id: 3,
      cord: [20.7647, 85.1117],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Angul District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 18.7 ha trees, 13.7 ha crops, 0.7 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Angul/gifs/hotspot_03.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Trees → Built', sublabel: '18.7 ha (52 pixels)' },
            { label: 'Crops → Built', sublabel: '13.7 ha (38 pixels)' },
            { label: 'Rangeland → Built', sublabel: '0.7 ha (2 pixels)' },
          ],
        },
      ],
    },
    {
      id: 4,
      cord: [20.7653, 85.1597],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.9,
      title: 'Angul District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 16.2 ha rangeland, 13.3 ha trees, 1.1 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Angul/gifs/hotspot_04.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Rangeland → Built', sublabel: '16.2 ha (45 pixels)' },
            { label: 'Trees → Built', sublabel: '13.3 ha (37 pixels)' },
            { label: 'Crops → Built', sublabel: '1.1 ha (3 pixels)' },
          ],
        },
      ],
    },
    {
      id: 5,
      cord: [21.0415, 84.8389],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Angul District : How it changed',
      content: [
        { type: 'heading', value: 'Crops → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 23.0 ha crops, 2.2 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Angul/gifs/hotspot_05.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Crops → Built', sublabel: '23.0 ha (64 pixels)' },
            { label: 'Trees → Built', sublabel: '2.2 ha (6 pixels)' },
          ],
        },
      ],
    },
    {
      id: 6,
      cord: [20.7189, 83.4724],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Balangir District : How it changed',
      content: [
        { type: 'heading', value: 'Crops → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 47.2 ha crops, 2.5 ha trees, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/gifs/hotspot_01.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Crops → Built', sublabel: '47.2 ha (131 pixels)' },
            { label: 'Trees → Built', sublabel: '2.5 ha (7 pixels)' },
            { label: 'Water → Built', sublabel: '0.4 ha (1 pixels)' },
          ],
        },
      ],
    },
    {
      id: 7,
      cord: [20.4628, 82.9039],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.75,
      title: 'Balangir District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 32.0 ha rangeland, 1.4 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/gifs/hotspot_02.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Rangeland → Built', sublabel: '32.0 ha (89 pixels)' },
            { label: 'Crops → Built', sublabel: '1.4 ha (4 pixels)' },
          ],
        },
      ],
    },
    {
      id: 8,
      cord: [20.7392, 83.587],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.7,
      title: 'Balangir District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 26.6 ha rangeland, 0.4 ha water were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/gifs/hotspot_03.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Rangeland → Built', sublabel: '26.6 ha (74 pixels)' },
            { label: 'Water → Built', sublabel: '0.4 ha (1 pixels)' },
          ],
        },
      ],
    },
    {
      id: 9,
      cord: [20.4634, 82.9326],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Balangir District : How it changed',
      content: [
        { type: 'heading', value: 'Crops → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 24.8 ha crops, 0.7 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/gifs/hotspot_04.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Crops → Built', sublabel: '24.8 ha (69 pixels)' },
            { label: 'Trees → Built', sublabel: '0.7 ha (2 pixels)' },
          ],
        },
      ],
    },
    {
      id: 10,
      cord: [20.711, 83.5301],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.75,
      title: 'Balangir District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 19.4 ha rangeland, 8.3 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/gifs/hotspot_05.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Rangeland → Built', sublabel: '19.4 ha (54 pixels)' },
            { label: 'Crops → Built', sublabel: '8.3 ha (23 pixels)' },
          ],
        },
      ],
    },
    {
      id: 11,
      cord: [20.4964, 86.0485],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Cuttack District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 38.5 ha trees, 7.9 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/gifs/hotspot_01.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Trees → Built', sublabel: '38.5 ha (107 pixels)' },
            { label: 'Crops → Built', sublabel: '7.9 ha (22 pixels)' },
          ],
        },
      ],
    },
    {
      id: 12,
      cord: [20.4405, 85.7805],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Cuttack District : How it changed',
      content: [
        { type: 'heading', value: 'Crops → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 31.3 ha crops, 26.6 ha rangeland, 4.7 ha trees were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/gifs/hotspot_02.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Crops → Built', sublabel: '31.3 ha (87 pixels)' },
            { label: 'Rangeland → Built', sublabel: '26.6 ha (74 pixels)' },
            { label: 'Trees → Built', sublabel: '4.7 ha (13 pixels)' },
          ],
        },
      ],
    },
    {
      id: 13,
      cord: [20.5149, 86.1443],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Cuttack District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 46.8 ha trees, 6.5 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/gifs/hotspot_03.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Trees → Built', sublabel: '46.8 ha (130 pixels)' },
            { label: 'Crops → Built', sublabel: '6.5 ha (18 pixels)' },
          ],
        },
      ],
    },
    {
      id: 14,
      cord: [20.5879, 85.0982],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.3,
      title: 'Cuttack District : How it changed',
      content: [
        {
          type: 'heading',
          value: 'unchanged → unchanged (no Built-class pixels)',
        },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 0.0 ha shifted from unchanged to unchanged. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/gifs/hotspot_04.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
    {
      id: 15,
      cord: [20.4959, 85.9718],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Cuttack District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (no Built-class pixels)' },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 25.6 ha shifted from Trees to Built. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/gifs/hotspot_05.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
    {
      id: 16,
      cord: [21.875, 85.4255],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.7,
      title: 'Kendujhar District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 33.8 ha rangeland, 10.8 ha trees, 1.8 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/gifs/hotspot_01.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Rangeland → Built', sublabel: '33.8 ha (94 pixels)' },
            { label: 'Trees → Built', sublabel: '10.8 ha (30 pixels)' },
            { label: 'Crops → Built', sublabel: '1.8 ha (5 pixels)' },
          ],
        },
      ],
    },
    {
      id: 17,
      cord: [21.9559, 85.3859],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.65,
      title: 'Kendujhar District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Rangeland (no Built-class pixels)' },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 27.0 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/gifs/hotspot_02.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
    {
      id: 18,
      cord: [22.119, 85.4422],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.65,
      title: 'Kendujhar District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Rangeland (no Built-class pixels)' },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 4.7 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/gifs/hotspot_03.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
    {
      id: 19,
      cord: [22.1178, 85.3259],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.35,
      title: 'Kendujhar District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Trees (no Built-class pixels)' },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 4.3 ha shifted from Rangeland to Trees. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/gifs/hotspot_04.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
    {
      id: 20,
      cord: [22.0825, 85.4038],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.35,
      title: 'Kendujhar District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Trees (no Built-class pixels)' },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 0.7 ha shifted from Rangeland to Trees. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/gifs/hotspot_05.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
    {
      id: 21,
      cord: [20.228, 85.7335],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Khordha District : How it changed',
      content: [
        { type: 'heading', value: 'Crops → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 58.7 ha crops, 13.3 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/gifs/hotspot_01.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Crops → Built', sublabel: '58.7 ha (163 pixels)' },
            { label: 'Rangeland → Built', sublabel: '13.3 ha (37 pixels)' },
          ],
        },
      ],
    },
    {
      id: 22,
      cord: [20.3274, 85.7327],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.9,
      title: 'Khordha District : How it changed',
      content: [
        { type: 'heading', value: 'Rangeland → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 52.2 ha rangeland, 4.0 ha trees, 0.7 ha crops were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/gifs/hotspot_02.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Rangeland → Built', sublabel: '52.2 ha (145 pixels)' },
            { label: 'Trees → Built', sublabel: '4.0 ha (11 pixels)' },
            { label: 'Crops → Built', sublabel: '0.7 ha (2 pixels)' },
          ],
        },
      ],
    },
    {
      id: 23,
      cord: [20.2286, 85.8101],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.95,
      title: 'Khordha District : How it changed',
      content: [
        { type: 'heading', value: 'Crops → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 42.1 ha crops, 0.4 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/gifs/hotspot_03.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Crops → Built', sublabel: '42.1 ha (117 pixels)' },
            { label: 'Rangeland → Built', sublabel: '0.4 ha (1 pixels)' },
          ],
        },
      ],
    },
    {
      id: 24,
      cord: [20.2024, 85.9634],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.75,
      title: 'Khordha District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Built (dominant pathway)' },
        {
          type: 'text',
          value:
            'The hotspot reveals a clear conversion pathway: 28.1 ha trees, 7.2 ha crops, 0.4 ha rangeland were absorbed into Built-class pixels. Use the GIF to flip between 2016 and 2024 imagery and watch the change emerge in place.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/gifs/hotspot_04.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
        {
          type: 'list',
          title: 'Conversion sources',
          items: [
            { label: 'Trees → Built', sublabel: '28.1 ha (78 pixels)' },
            { label: 'Crops → Built', sublabel: '7.2 ha (20 pixels)' },
            { label: 'Rangeland → Built', sublabel: '0.4 ha (1 pixels)' },
          ],
        },
      ],
    },
    {
      id: 25,
      cord: [19.8882, 85.1059],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Vegetation',
      settlement_type: 'unclassified',
      confidence: 0.6,
      title: 'Khordha District : How it changed',
      content: [
        { type: 'heading', value: 'Trees → Rangeland (no Built-class pixels)' },
        {
          type: 'text',
          value:
            'Spectral signature change without Built-class conversion — 24.5 ha shifted from Trees to Rangeland. This is the signature of intensification or canopy thinning, not new settlement footprint.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/gifs/hotspot_05.gif',
          desc: 'Animated change — Sentinel-2 2016 ↔ 2024',
        },
      ],
    },
  ],

  Why: [
    {
      id: 1,
      cord: [20.9443, 85.0133],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.95,
      title: 'Angul District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. mining_adjacent/industrial drivers overlap (MCL Balaram OCP (5.77 km), MCL Hingula OCP (6.79 km); NTPC Talcher Super Thermal (1.27 km)).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 1 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'NTPC Talcher Super Thermal',
              sublabel: 'thermal power plant • 1.27 km • district_context',
            },
            {
              label: 'MCL Balaram OCP',
              sublabel: 'coal mine • 5.77 km • district_context',
            },
            {
              label: 'MCL Hingula OCP',
              sublabel: 'coal mine • 6.79 km • district_context',
            },
            {
              label: 'MCL Bharatpur OCP',
              sublabel: 'coal mine • 8.06 km • district_context',
            },
            {
              label: 'MCL Lingaraj OCP',
              sublabel: 'coal mine • 9.55 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 2,
      cord: [20.9188, 85.1579],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.95,
      title: 'Angul District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): NTPC Kaniha Super Thermal (3.0 km), Talcher Fertilizers Ltd (4.64 km), NTPC Talcher Thermal (7.03 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 2 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'NTPC Kaniha Super Thermal',
              sublabel: 'thermal power plant • 3.0 km • district_context',
            },
            {
              label: 'Banarpal',
              sublabel: 'urban center • 3.21 km • district_context',
            },
            {
              label: 'Talcher Fertilizers Ltd',
              sublabel: 'fertiliser plant • 4.64 km • district_context',
            },
            {
              label: 'MCL Kaniha OCP',
              sublabel: 'coal mine • 6.47 km • district_context',
            },
            {
              label: 'NTPC Talcher Thermal',
              sublabel: 'thermal power plant • 7.03 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 3,
      cord: [20.7647, 85.1117],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Angul District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Angul railway station (8.46 km), Angul - Narasinghpur Road (2.54 km), Angul - Narasinghpur Road (3.49 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 3 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Angul railway station',
              sublabel: 'railway station • 8.46 km • district_context',
            },
            {
              label: 'Angul town',
              sublabel: 'urban center • 8.92 km • district_context',
            },
            {
              label: 'NALCO Angul Smelter',
              sublabel: 'aluminium smelter • 9.74 km • district_context',
            },
            {
              label: 'Angul - Narasinghpur Road',
              sublabel: 'road • 2.54 km • osm',
            },
            {
              label: 'Angul - Narasinghpur Road',
              sublabel: 'road • 3.49 km • osm',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.8,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 4,
      cord: [20.7653, 85.1597],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.9,
      title: 'Angul District : Why it changed',
      content: [
        { type: 'heading', value: 'Urban/industrial expansion onto rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. transport/residential/industrial drivers overlap (Angul - Narasinghpur Road (1.68 km), Angul - Narasinghpur Road (2.46 km); (unnamed urban) (2.97 km), (unnamed urban) (3.14 km)).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 4 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'NALCO Angul Smelter',
              sublabel: 'aluminium smelter • 9.81 km • district_context',
            },
            {
              label: 'Angul - Narasinghpur Road',
              sublabel: 'road • 1.68 km • osm',
            },
            {
              label: 'Angul - Narasinghpur Road',
              sublabel: 'road • 2.46 km • osm',
            },
            { label: '(unnamed urban)', sublabel: 'urban • 2.97 km • osm' },
            { label: '(unnamed urban)', sublabel: 'urban • 3.14 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.9,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 5,
      cord: [21.0415, 84.8389],
      district: 'Angul',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Angul District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Urban or industrial expansion onto farmland',
        },
        {
          type: 'text',
          value:
            'Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Chhendipada (3.23 km), Chhendipada (5.93 km), (unnamed settlement) (8.09 km).',
        },
        {
          type: 'image',
          url: 'outputs/Angul/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 5 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Chhendipada',
              sublabel: 'urban center • 3.23 km • district_context',
            },
            { label: 'Angul - Deogarh Road', sublabel: 'road • 5.92 km • osm' },
            { label: 'Chhendipada', sublabel: 'settlement • 5.93 km • osm' },
            { label: 'Angul - Deogarh Road', sublabel: 'road • 6.94 km • osm' },
            {
              label: '(unnamed settlement)',
              sublabel: 'settlement • 8.09 km • osm',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 6,
      cord: [20.7189, 83.4724],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Balangir District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Urban or industrial expansion onto farmland',
        },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Balangir railway station (2.81 km), (unnamed road) (0.54 km), Patnagarh Road (1.29 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 1 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Balangir town',
              sublabel: 'urban center • 2.03 km • district_context',
            },
            {
              label: 'Balangir railway station',
              sublabel: 'railway station • 2.81 km • district_context',
            },
            { label: '(unnamed road)', sublabel: 'road • 0.54 km • osm' },
            { label: 'Patnagarh Road', sublabel: 'road • 1.29 km • osm' },
            { label: 'Patnagarh Road', sublabel: 'road • 1.3 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 7,
      cord: [20.4628, 82.9039],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.75,
      title: 'Balangir District : Why it changed',
      content: [
        { type: 'heading', value: 'Urban/industrial expansion onto rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Kantabanji railway station (3.34 km), Ashram Pada Road (0.87 km), Ashram Pada Road (1.16 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 2 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Kantabanji railway station',
              sublabel: 'railway station • 3.34 km • district_context',
            },
            {
              label: 'Kantabanji',
              sublabel: 'urban center • 3.63 km • district_context',
            },
            { label: 'Ashram Pada Road', sublabel: 'road • 0.87 km • osm' },
            { label: 'Ashram Pada Road', sublabel: 'road • 1.16 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 1.23 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.75,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 8,
      cord: [20.7392, 83.587],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.7,
      title: 'Balangir District : Why it changed',
      content: [
        { type: 'heading', value: 'Urban/industrial expansion onto rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): (unnamed railway) (0.51 km), (unnamed railway) (0.66 km), (unnamed railway) (0.67 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 3 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            { label: '(unnamed railway)', sublabel: 'railway • 0.51 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 0.66 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 0.67 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 0.95 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 1.41 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.7,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 9,
      cord: [20.4634, 82.9326],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Balangir District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Urban or industrial expansion onto farmland',
        },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Kantabanji railway station (6.25 km), (unnamed road) (1.37 km), Underbridge Road (1.71 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 4 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Kantabanji railway station',
              sublabel: 'railway station • 6.25 km • district_context',
            },
            {
              label: 'Kantabanji',
              sublabel: 'urban center • 6.57 km • district_context',
            },
            { label: '(unnamed road)', sublabel: 'road • 1.37 km • osm' },
            { label: 'Kantabanji', sublabel: 'settlement • 1.43 km • osm' },
            { label: 'Underbridge Road', sublabel: 'road • 1.71 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.8,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 10,
      cord: [20.711, 83.5301],
      district: 'Balangir',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.75,
      title: 'Balangir District : Why it changed',
      content: [
        { type: 'heading', value: 'Urban/industrial expansion onto rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Balangir railway station (3.71 km), (unnamed railway) (0.26 km), (unnamed railway) (0.93 km).',
        },
        {
          type: 'image',
          url: 'outputs/Balangir/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 5 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Balangir railway station',
              sublabel: 'railway station • 3.71 km • district_context',
            },
            {
              label: 'Balangir town',
              sublabel: 'urban center • 4.74 km • district_context',
            },
            { label: '(unnamed railway)', sublabel: 'railway • 0.26 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 0.93 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 1.04 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.75,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 11,
      cord: [20.4964, 86.0485],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Cuttack District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): (unnamed road) (1.71 km), (unnamed road) (2.66 km), (unnamed road) (3.36 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 1 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Salipur',
              sublabel: 'urban center • 9.06 km • district_context',
            },
            { label: '(unnamed road)', sublabel: 'road • 1.71 km • osm' },
            { label: '(unnamed road)', sublabel: 'road • 2.66 km • osm' },
            { label: '(unnamed road)', sublabel: 'road • 3.36 km • osm' },
            { label: '(unnamed road)', sublabel: 'road • 3.98 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 12,
      cord: [20.4405, 85.7805],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.8,
      title: 'Cuttack District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Urban or industrial expansion onto farmland',
        },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): Cuttack railway station (9.77 km), (unnamed road) (1.45 km), (unnamed road) (1.83 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 2 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Cuttack railway station',
              sublabel: 'railway station • 9.77 km • district_context',
            },
            { label: '(unnamed road)', sublabel: 'road • 1.45 km • osm' },
            { label: '(unnamed road)', sublabel: 'road • 1.83 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 2.04 km • osm' },
            { label: '(unnamed railway)', sublabel: 'railway • 2.04 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.8,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 13,
      cord: [20.5149, 86.1443],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Cuttack District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Salipur (6.32 km), Salepur (5.78 km), Mahanga (5.8 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 3 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Salipur',
              sublabel: 'urban center • 6.32 km • district_context',
            },
            { label: '(unnamed road)', sublabel: 'road • 4.77 km • osm' },
            {
              label: '(unnamed power_plant)',
              sublabel: 'power plant • 5.47 km • osm',
            },
            { label: 'Salepur', sublabel: 'settlement • 5.78 km • osm' },
            { label: 'Mahanga', sublabel: 'settlement • 5.8 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 14,
      cord: [20.5879, 85.0982],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.3,
      title: 'Cuttack District : Why it changed',
      content: [
        { type: 'heading', value: 'Unclassified land-cover change' },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. residential/transport drivers overlap (Bhurukund (8.39 km), Hindol (10.68 km); Angul - Narasinghpur Road (5.73 km), Angul - Narasinghpur Road (10.51 km)).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 4 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Angul - Narasinghpur Road',
              sublabel: 'road • 5.73 km • osm',
            },
            { label: 'Bhurukund', sublabel: 'settlement • 8.39 km • osm' },
            {
              label: 'Angul - Narasinghpur Road',
              sublabel: 'road • 10.51 km • osm',
            },
            { label: 'Hindol', sublabel: 'urban • 10.68 km • osm' },
            { label: 'Kanagudi', sublabel: 'settlement • 12.78 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.3,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 15,
      cord: [20.4959, 85.9718],
      district: 'Cuttack',
      place: '2016 - 2024',
      category: 'Infrastructure',
      settlement_type: 'transport',
      confidence: 0.95,
      title: 'Cuttack District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: transport-corridor development — station / road-led commercial growth. dominated by transport driver(s): (unnamed road) (0.27 km).',
        },
        {
          type: 'image',
          url: 'outputs/Cuttack/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 5 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Choudwar Industrial Area',
              sublabel: 'industrial • 8.54 km • district_context',
            },
            {
              label: 'Choudwar',
              sublabel: 'urban center • 9.38 km • district_context',
            },
            {
              label: 'SAIL Kalinga Nagar (approach)',
              sublabel: 'steel plant • 9.59 km • district_context',
            },
            {
              label: 'Cuttack city',
              sublabel: 'urban center • 9.99 km • district_context',
            },
            { label: '(unnamed road)', sublabel: 'road • 0.27 km • osm' },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 16,
      cord: [21.875, 85.4255],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.7,
      title: 'Kendujhar District : Why it changed',
      content: [
        { type: 'heading', value: 'Urban/industrial expansion onto rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. no registered driver nearby; Rangeland→Built transition could be rural settlement or industrial expansion.',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 1 of 5',
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.7,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 17,
      cord: [21.9559, 85.3859],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.65,
      title: 'Kendujhar District : Why it changed',
      content: [
        { type: 'heading', value: 'Forest degradation to open rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. mining_adjacent/transport drivers overlap (Thakurani iron-ore mine (6.14 km); Banspani railway junction (8.96 km)).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 2 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Thakurani iron-ore mine',
              sublabel: 'iron ore mine • 6.14 km • district_context',
            },
            {
              label: 'Banspani railway junction',
              sublabel: 'railway station • 8.96 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.65,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 18,
      cord: [22.119, 85.4422],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.65,
      title: 'Kendujhar District : Why it changed',
      content: [
        { type: 'heading', value: 'Forest degradation to open rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Barbil (6.69 km), Joda (9.06 km).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 3 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Barbil',
              sublabel: 'urban center • 6.69 km • district_context',
            },
            {
              label: 'Joda-Barbil iron-ore cluster',
              sublabel: 'iron ore mine • 6.97 km • district_context',
            },
            {
              label: 'Joda',
              sublabel: 'urban center • 9.06 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.65,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 19,
      cord: [22.1178, 85.3259],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.35,
      title: 'Kendujhar District : Why it changed',
      content: [
        { type: 'heading', value: 'Unclassified land-cover change' },
        {
          type: 'text',
          value:
            'Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Barbil (5.86 km).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 4 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Barbil',
              sublabel: 'urban center • 5.86 km • district_context',
            },
            {
              label: 'Joda-Barbil iron-ore cluster',
              sublabel: 'iron ore mine • 9.31 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.35,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 20,
      cord: [22.0825, 85.4038],
      district: 'Kendujhar',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.35,
      title: 'Kendujhar District : Why it changed',
      content: [
        { type: 'heading', value: 'Unclassified land-cover change' },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. mining_adjacent/residential/transport drivers overlap (Joda-Barbil iron-ore cluster (1.44 km); Barbil (3.25 km), Joda (5.35 km)).',
        },
        {
          type: 'image',
          url: 'outputs/Kendujhar/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 5 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Joda-Barbil iron-ore cluster',
              sublabel: 'iron ore mine • 1.44 km • district_context',
            },
            {
              label: 'Barbil',
              sublabel: 'urban center • 3.25 km • district_context',
            },
            {
              label: 'Joda',
              sublabel: 'urban center • 5.35 km • district_context',
            },
            {
              label: 'Banspani railway junction',
              sublabel: 'railway station • 6.07 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.35,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 21,
      cord: [20.228, 85.7335],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Urban Sprawl',
      settlement_type: 'residential',
      confidence: 0.95,
      title: 'Khordha District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Urban or industrial expansion onto farmland',
        },
        {
          type: 'text',
          value:
            'Demographic signal: settlement / peri-urban growth — housing, population inflow. dominated by residential driver(s): Tamando (5.91 km), Jatni (7.34 km).',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 1 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Tamando',
              sublabel: 'urban center • 5.91 km • district_context',
            },
            {
              label: 'Jatni',
              sublabel: 'urban center • 7.34 km • district_context',
            },
            {
              label: 'Biju Patnaik International Airport',
              sublabel: 'airport • 9.13 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 22,
      cord: [20.3274, 85.7327],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.9,
      title: 'Khordha District : Why it changed',
      content: [
        { type: 'heading', value: 'Urban/industrial expansion onto rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: industrial build-out — plant expansion, workforce housing likely. dominated by industrial driver(s): Chandaka Industrial Estate (7.03 km), Infocity IT hub (9.44 km).',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 2 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Tamando',
              sublabel: 'urban center • 6.49 km • district_context',
            },
            {
              label: 'Chandaka Industrial Estate',
              sublabel: 'industrial • 7.03 km • district_context',
            },
            {
              label: 'Infocity IT hub',
              sublabel: 'industrial • 9.44 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.9,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 23,
      cord: [20.2286, 85.8101],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Build-up',
      settlement_type: 'mixed',
      confidence: 0.95,
      title: 'Khordha District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Urban or industrial expansion onto farmland',
        },
        {
          type: 'text',
          value:
            'Demographic signal: mixed industrial + residential footprint. industrial/residential/transport drivers overlap (Biju Patnaik International Airport (2.52 km); Tamando (7.34 km), Bhubaneswar (7.66 km)).',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 3 of 5',
        },
        {
          type: 'list',
          title: 'Nearest known drivers',
          items: [
            {
              label: 'Biju Patnaik International Airport',
              sublabel: 'airport • 2.52 km • district_context',
            },
            {
              label: 'Bhubaneswar railway station',
              sublabel: 'railway station • 5.12 km • district_context',
            },
            {
              label: 'Tamando',
              sublabel: 'urban center • 7.34 km • district_context',
            },
            {
              label: 'Bhubaneswar',
              sublabel: 'urban center • 7.66 km • district_context',
            },
          ],
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.95,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 24,
      cord: [20.2024, 85.9634],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Industry',
      settlement_type: 'industrial',
      confidence: 0.75,
      title: 'Khordha District : Why it changed',
      content: [
        {
          type: 'heading',
          value: 'Forest cleared for urban or industrial development',
        },
        {
          type: 'text',
          value:
            'Demographic signal: industrial build-out — plant expansion, workforce housing likely. no registered driver nearby; Trees→Built transition in a forest-dominated district suggests frontier industrial/mining clearance.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 4 of 5',
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.75,
          max: 1,
          color: '#F76000',
        },
      ],
    },
    {
      id: 25,
      cord: [19.8882, 85.1059],
      district: 'Khordha',
      place: '2016 - 2024',
      category: 'Vegetation',
      settlement_type: 'unclassified',
      confidence: 0.6,
      title: 'Khordha District : Why it changed',
      content: [
        { type: 'heading', value: 'Forest degradation to open rangeland' },
        {
          type: 'text',
          value:
            'Demographic signal: non-built land-cover change — needs ground-truth. no nearby driver and no built-up transition.',
        },
        {
          type: 'image',
          url: 'outputs/Khordha/maps/change_heatmap.png',
          desc: 'District-wide change heatmap — this hotspot is rank 5 of 5',
        },
        {
          type: 'meter',
          label: 'Confidence',
          value: 0.6,
          max: 1,
          color: '#F76000',
        },
      ],
    },
  ],
};

export const Points_Data: PointEntry[] = [
  {
    id: 1,
    cord: [20.9443, 85.0133],
    district: 'Angul',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 713.41,
    new_built_area_ha: 20.88,
    confidence: 0.95,
  },
  {
    id: 2,
    cord: [20.9188, 85.1579],
    district: 'Angul',
    category: 'Industry',
    settlement_type: 'industrial',
    score: 626.12,
    new_built_area_ha: 33.84,
    confidence: 0.95,
  },
  {
    id: 3,
    cord: [20.7647, 85.1117],
    district: 'Angul',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 593.94,
    new_built_area_ha: 33.12,
    confidence: 0.8,
  },
  {
    id: 4,
    cord: [20.7653, 85.1597],
    district: 'Angul',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 579.39,
    new_built_area_ha: 30.6,
    confidence: 0.9,
  },
  {
    id: 5,
    cord: [21.0415, 84.8389],
    district: 'Angul',
    category: 'Urban Sprawl',
    settlement_type: 'residential',
    score: 510.35,
    new_built_area_ha: 25.2,
    confidence: 0.95,
  },
  {
    id: 6,
    cord: [20.7189, 83.4724],
    district: 'Balangir',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 711.95,
    new_built_area_ha: 50.04,
    confidence: 0.95,
  },
  {
    id: 7,
    cord: [20.4628, 82.9039],
    district: 'Balangir',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 510.23,
    new_built_area_ha: 33.48,
    confidence: 0.75,
  },
  {
    id: 8,
    cord: [20.7392, 83.587],
    district: 'Balangir',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 497.45,
    new_built_area_ha: 27,
    confidence: 0.7,
  },
  {
    id: 9,
    cord: [20.4634, 82.9326],
    district: 'Balangir',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 443.66,
    new_built_area_ha: 25.56,
    confidence: 0.8,
  },
  {
    id: 10,
    cord: [20.711, 83.5301],
    district: 'Balangir',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 442.96,
    new_built_area_ha: 27.72,
    confidence: 0.75,
  },
  {
    id: 11,
    cord: [20.4964, 86.0485],
    district: 'Cuttack',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 780.9,
    new_built_area_ha: 46.44,
    confidence: 0.95,
  },
  {
    id: 12,
    cord: [20.4405, 85.7805],
    district: 'Cuttack',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 768.22,
    new_built_area_ha: 62.64,
    confidence: 0.8,
  },
  {
    id: 13,
    cord: [20.5149, 86.1443],
    district: 'Cuttack',
    category: 'Urban Sprawl',
    settlement_type: 'residential',
    score: 677.36,
    new_built_area_ha: 53.28,
    confidence: 0.95,
  },
  {
    id: 14,
    cord: [20.5879, 85.0982],
    district: 'Cuttack',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 648.19,
    new_built_area_ha: 0,
    confidence: 0.3,
  },
  {
    id: 15,
    cord: [20.4959, 85.9718],
    district: 'Cuttack',
    category: 'Infrastructure',
    settlement_type: 'transport',
    score: 631.62,
    new_built_area_ha: 0,
    confidence: 0.95,
  },
  {
    id: 16,
    cord: [21.875, 85.4255],
    district: 'Kendujhar',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 860.09,
    new_built_area_ha: 46.44,
    confidence: 0.7,
  },
  {
    id: 17,
    cord: [21.9559, 85.3859],
    district: 'Kendujhar',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 821.08,
    new_built_area_ha: 0,
    confidence: 0.65,
  },
  {
    id: 18,
    cord: [22.119, 85.4422],
    district: 'Kendujhar',
    category: 'Urban Sprawl',
    settlement_type: 'residential',
    score: 736.46,
    new_built_area_ha: 0,
    confidence: 0.65,
  },
  {
    id: 19,
    cord: [22.1178, 85.3259],
    district: 'Kendujhar',
    category: 'Urban Sprawl',
    settlement_type: 'residential',
    score: 706.4,
    new_built_area_ha: 0,
    confidence: 0.35,
  },
  {
    id: 20,
    cord: [22.0825, 85.4038],
    district: 'Kendujhar',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 689.51,
    new_built_area_ha: 0,
    confidence: 0.35,
  },
  {
    id: 21,
    cord: [20.228, 85.7335],
    district: 'Khordha',
    category: 'Urban Sprawl',
    settlement_type: 'residential',
    score: 902.53,
    new_built_area_ha: 72,
    confidence: 0.95,
  },
  {
    id: 22,
    cord: [20.3274, 85.7327],
    district: 'Khordha',
    category: 'Industry',
    settlement_type: 'industrial',
    score: 779.75,
    new_built_area_ha: 56.88,
    confidence: 0.9,
  },
  {
    id: 23,
    cord: [20.2286, 85.8101],
    district: 'Khordha',
    category: 'Build-up',
    settlement_type: 'mixed',
    score: 658.62,
    new_built_area_ha: 42.48,
    confidence: 0.95,
  },
  {
    id: 24,
    cord: [20.2024, 85.9634],
    district: 'Khordha',
    category: 'Industry',
    settlement_type: 'industrial',
    score: 636.7,
    new_built_area_ha: 35.64,
    confidence: 0.75,
  },
  {
    id: 25,
    cord: [19.8882, 85.1059],
    district: 'Khordha',
    category: 'Vegetation',
    settlement_type: 'unclassified',
    score: 626.97,
    new_built_area_ha: 0,
    confidence: 0.6,
  },
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
