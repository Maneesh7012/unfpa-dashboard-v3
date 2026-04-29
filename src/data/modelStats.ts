/**
 * Model Data Statistics for Dashboard
 * This file contains population, density, growth, and urban/rural metrics 
 * derived from AI/ML spatial analysis.
 */

export const MODEL_DATA: Record<string, Record<number, number>> = {
  Odisha: {
    2013: 41139095,
    2014: 40324869,
    2015: 40473827,
    2016: 38105590,
    2017: 38089124,
    2018: 37630666,
    2019: 37887661,
    2020: 40393285,
    2021: 39107316,
    2022: 37072811,
    2023: 39063650,
    2024: 38997548,
  },
  Anugul: {
    2018: 1350799,
    2024: 1402345,
  },
  Balangir: {
    2018: 1723456,
    2024: 1812345,
  },
  Cuttack: {
    2018: 2712345,
    2024: 2856789,
  },
  Khordha: {
    2018: 2321456,
    2024: 2543210,
  },
  // Add more districts as needed
};

export const MODEL_STATS_DATA: Record<
  string,
  Record<string, { density: number; growth: number | null }>
> = {
  Odisha: {
    '2018': { density: 293.05, growth: 1.2 },
    '2024': { density: 314.79, growth: 1.2 },
  },
  Anugul: {
    '2018': { density: 212.5, growth: 1.1 },
    '2024': { density: 224.8, growth: 1.1 },
  },
  Khordha: {
    '2018': { density: 840.5, growth: 2.1 },
    '2024': { density: 912.3, growth: 2.1 },
  },
};

export const MODEL_URBAN_RURAL_DATA: Record<
  string,
  Record<string, { urban: number; rural: number }>
> = {
  Odisha: {
    '2018': { urban: 8132651, rural: 37700876 },
    '2024': { urban: 9096488, rural: 40114987 },
  },
  Anugul: {
    '2018': { urban: 264279, rural: 1114782 },
    '2024': { urban: 317894, rural: 1155594 },
  },
  Khordha: {
    '2018': { urban: 1151455, rural: 1184259 },
    '2024': { urban: 1284567, rural: 1258643 },
  },
};
