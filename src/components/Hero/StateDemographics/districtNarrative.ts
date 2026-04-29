/**
 * Narrative overviews for the 8 target districts of Odisha.
 * Numbers are sourced from MODEL_DATA, MODEL_STATS_DATA and MODEL_URBAN_RURAL_DATA
 * (WorldPop R2025A, calibrated to Census of India 2011, projected 2011-2036).
 *
 * Shape: each district -> ordered array of paragraphs (3-4 each).
 * Render in the frontend by mapping each entry to a <p>.
 */
export const DISTRICT_OVERVIEWS: Record<string, string[]> = {
  Anugul: [
    `Anugul begins the projection window with a 2011 Census population of 1.27 million and is projected to reach 1.52 million by 2036 — an addition of roughly 247,000 people over 25 years at a compound annual growth rate near 0.71%. Spread over 6,375 km², the district carries a moderate population density that climbs from 200 persons per km² in 2011 to about 239 by 2036, below the state average but rising steadily.`,
    `Year-on-year growth tracks Odisha's broader trajectory of decelerating fertility: ~0.83% in the early 2010s eases to roughly 0.65% by the late 2020s. The district's economic base — Mahanadi Coalfields' Talcher complex, NTPC's thermal cluster, NALCO's aluminium smelter and downstream metallurgy — supplies the in-migration that keeps Anugul above the state median rate while still well short of the metropolitan corridors.`,
    `Urbanisation is moderate. From a 2011 urban share of 16.85% (mostly Talcher, Anugul town, and the company-town belts), the share advances ~0.17 pp/yr to about 21.1% by 2036. The urban population grows from ~215,000 in 2011 to ~321,000 in 2036; the rural population continues to grow modestly in mining peripheries before plateauing late in the period. Planning priorities visible in this trajectory: water and AQI services around the thermal cluster, in-migrant housing, and post-extraction land transition rather than headline density management.`,
  ],

  Balangir: [
    `Balangir's population rises from 1.65 million in 2011 to a projected 1.93 million by 2036, a net gain of about 280,000 over the period. Annual growth slows from roughly 0.76% in the early 2010s to 0.55% by the early 2030s — the slowest in this eight-district panel. With 6,575 km², density climbs from 251 to 293 persons per km², still below the state average.`,
    `Agrarian and drought-prone, Balangir lies in the KBK belt and remains one of Odisha's most rural districts. Seasonal out-migration to Andhra Pradesh, Telangana and Chhattisgarh for brick-kiln and construction labour is well documented and is part of why the measured growth here lags the industrial-belt districts. The urban share advances modestly from 9.49% in 2011 to 13.74% by 2036, the second-lowest in the panel after Mayurbhanj.`,
    `The urban population — concentrated in Balangir town, Titilagarh, and Patnagarh — grows from ~157,000 to ~265,000 over 25 years, an increment of about 108,000. Rural population continues to grow but at a much slower pace; the rural-urban absolute gap actually narrows. Investment priorities consistent with this trajectory are irrigation expansion, micro-enterprise around the small towns, and migration-management infrastructure rather than large-scale urban build-out.`,
  ],

  Cuttack: [
    `Cuttack starts the period with the third-highest district population in this panel at 2.62 million in 2011 and reaches 3.09 million by 2036 — about 466,000 additional residents on a relatively compact 3,932 km². Density climbs from 668 persons per km² to roughly 786, second only to neighbouring Khordha and well above the state mean.`,
    `Annual growth holds in the 0.7–0.9% band early in the period and eases to about 0.6% by the mid-2030s. As Odisha's historic capital and second-largest city, Cuttack benefits from the gravitational pull of the Bhubaneswar–Cuttack metropolitan region — a contiguous urban corridor along the Mahanadi delta that draws in regional migrants. The district also hosts judicial and educational institutions, the silver-filigree and textile clusters, and the SCB Medical College anchor.`,
    `Urban share moves from 27.78% in 2011 to 32.03% by 2036, well above the state mean. Urban population grows from ~729,000 in 2011 to ~990,000 by 2036, a gain of roughly 261,000. Rural blocks in the periphery — Salepur, Athagad, Banki — continue to grow but at a much slower pace than the city core.`,
    `The implication is that Cuttack remains a high-density, urbanising district where peri-urban infrastructure pressure (drainage, traffic, land conversion) dominates over headline growth concerns; twin-city coordination with Khordha is the natural planning frame.`,
  ],

  Kendujhar: [
    `Kendujhar (Keonjhar) grows from 1.80 million in 2011 to 2.17 million by 2036, a 372,000-person increase over 8,303 km² of largely undulating terrain. Density rises from 217 to 262 persons per km². Annual growth peaks early at ~0.86% before declining gradually — typical of mining belts where in-migration moderates as extraction industries mature.`,
    `The district is one of India's largest iron-ore producers and also yields manganese, with Joda, Barbil and Champua hosting most mining activity. Historical population growth in Kendujhar has been higher than the state average due to mining-led migration, but the projection captures a normalisation as remote-employment dynamics catch up with declining household size. The substantial Scheduled Tribe share — over 45% of the district total per Census 2011 — keeps fertility patterns somewhat above the urban-corridor districts.`,
    `Urbanisation moves from 13.37% in 2011 to 17.62% by 2036, still well below the state mean. Urban population grows from ~241,000 to ~383,000, with most of the increment accruing in the Barbil–Joda mining-town complex and Kendujhar town itself. Rural population continues to grow in absolute terms — a contrast with several neighbouring districts where rural counts have begun to flatten.`,
    `Planning priorities therefore span mining-town water and air-quality services, post-mining land transition once iron-ore reserves deplete, and infrastructure for the predominantly tribal rural majority.`,
  ],

  Khordha: [
    `Khordha is the most urbanised district in Odisha and contains the state capital Bhubaneswar. Population grows from 2.25 million in 2011 to 2.66 million by 2036, an absolute increase of roughly 411,000. With only 2,888 km² — by far the smallest area in the panel — density is exceptional: 780 persons per km² in 2011, rising to 922 by 2036, almost three times the state average.`,
    `Year-on-year growth runs around 0.8% early in the period, slowing to ~0.55% by the early 2030s. That slowdown reflects a pattern visible in many Tier-II Indian capitals: rapid expansion in the 2000s gives way to steadier, services-driven growth as the city's catchment for in-migration shifts from rural Odisha to inter-state professionals.`,
    `Urbanisation already dominates. The Census 2011 urban share of 48.13% rises to about 52.38% by 2036 — Khordha is the only district in the panel where urban population overtakes rural by 2030. Urban headcount climbs from ~1.08 million to ~1.40 million; rural population stays roughly flat in absolute terms, around 1.17–1.27 million. Bhubaneswar's IT corridor, the Khordha industrial belt, and the Patia–Tomando peri-urban expansion absorb most of the increment.`,
    `The strategic frame for Khordha is metropolitan, not district-rural: master-plan-led infill, transit-oriented development, and BMC–Khordha coordination on water sourcing and waste handling.`,
  ],

  Mayurbhanj: [
    `Mayurbhanj is the largest district in Odisha by area (10,418 km²) and the second-largest in this panel by population. Total residents rise from 2.52 million in 2011 to 3.02 million by 2036, a gain of about 499,000. Density nonetheless remains among the lowest in the panel — 242 persons per km² in 2011, reaching 290 by 2036 — reflecting the dispersed settlement pattern and the Similipal Biosphere Reserve, which occupies a large protected core.`,
    `Year-on-year growth runs ~0.85% in the early years, easing to ~0.65% in the 2030s. The district's tribal share — over 58%, the largest absolute Scheduled Tribe population of any single Indian district — and forest-dependent rural economy keep fertility moderately above the state mean and out-migration limited. Iron-ore extraction in the Suleipat and Badampahar areas is small relative to Kendujhar but provides modest non-agrarian employment.`,
    `Urbanisation is the lowest of the panel: 7.78% in 2011 climbing to 12.03% by 2036. Urban population grows from ~196,000 to ~363,000, concentrated in Baripada (HQ), Rairangpur, and Karanjia. Rural population still adds the bulk of new residents in absolute terms — roughly 332,000 over the period.`,
    `Service-delivery priorities here are tribal-area health and education, forest-fringe livelihoods, and last-mile connectivity rather than urban-system planning. The district is large enough that within-district disparities (Baripada vs. Similipal-fringe blocks) typically dominate over the district aggregate.`,
  ],

  Sambalpur: [
    `Sambalpur, with the smallest population in the panel, grows from 1.04 million in 2011 to 1.23 million by 2036 — about 194,000 additional residents. The 6,624 km² land area gives the lowest density of the eight districts: 157 persons per km² in 2011, climbing to 186 in 2036, well below the state average.`,
    `Annual growth runs around 0.83% in the early years and slows to about 0.61% by the early 2030s. Sambalpur's economy combines the Hirakud Dam–irrigation footprint, a notable higher-education cluster (Sambalpur University, VSSUT Burla, IIM Sambalpur), small-scale industry, and trade serving western Odisha. Distinctively, it carries one of the highest urban shares among non-coastal districts — 31.01% in 2011, projected to reach 35.26% by 2036 — driven by the Sambalpur–Burla–Hirakud agglomeration.`,
    `Urban population grows from ~323,000 to ~436,000, an increase of about 113,000 over 25 years. Rural population grows more slowly (about 80,000 net), continuing the trajectory visible since the 2001 Census. The Hirakud reservoir and surrounding forest tracts limit physical expansion northward, so most growth concentrates along the NH-53 corridor and around the educational institutions.`,
    `Strategic emphases consistent with this trajectory are urban-cluster water and sanitation, university-town economy, and conservation-compatible peripheral growth around Hirakud.`,
  ],

  Sundargarh: [
    `Sundargarh's population grows from 2.09 million in 2011 to 2.49 million by 2036, an increase of about 400,000. The 9,712 km² area — second-largest in the panel — keeps density moderate: 215 persons per km² in 2011, reaching 257 by 2036.`,
    `Year-on-year growth runs ~0.81% early, easing to ~0.59% in the 2030s. The district hosts SAIL's Rourkela Steel Plant, one of India's earliest public-sector steel facilities, alongside iron-ore and manganese mining clusters at Bonai and Birmitrapur. Rourkela itself is a Smart City and the district's largest urban centre, the only town in non-coastal Odisha approaching half-a-million population. The combined pull of steel, mining and rail-junction economies sustains in-migration; tribal communities (over 50% of district total per Census 2011) form a counterweight in the rural blocks.`,
    `Urbanisation is the second-highest in the panel: from 35.34% in 2011 to 39.59% by 2036. Urban population grows from ~740,000 to ~987,000, extending Rourkela's metropolitan footprint into adjoining peri-urban tracts. Rural population grows more slowly — by about 153,000 over 25 years — concentrated in the tribal blocks of Bonai, Lephripara, and Sundargarh sadar.`,
    `Sundargarh sits at the intersection of industrial-corridor and tribal-belt planning: steel-and-mining environment management, peri-urban Rourkela infrastructure, and tribal-block service delivery. Its trajectory more closely resembles Jamshedpur (Jharkhand) than the rest of Odisha, despite the political boundary.`,
  ],
};
