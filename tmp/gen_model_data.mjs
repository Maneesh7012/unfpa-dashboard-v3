import fs from 'fs';

const BASE_POP = {
    "Odisha": 41974218,
    "Angul": 1273821,
    "Balangir": 1648997,
    "Balasore": 2320529,
    "Bargarh": 1481255,
    "Bhadrak": 1506523,
    "Boudh": 441162,
    "Cuttack": 2624470,
    "Deogarh": 312520,
    "Dhenkanal": 1192891,
    "Gajapati": 577817,
    "Ganjam": 3529031,
    "Jagatsinghpur": 1136971,
    "Jajapur": 1827192,
    "Jharsuguda": 579505,
    "Kalahandi": 1576869,
    "Kandhamal": 733110,
    "Kendrapara": 1440361,
    "Kendujhar": 1801733,
    "Khordha": 3451511,
    "Koraput": 1379647,
    "Malkangiri": 613192,
    "Mayurbhanj": 2519738,
    "Nabarangpur": 1220946,
    "Nayagarh": 962789,
    "Nuapada": 610382,
    "Puri": 1698730,
    "Rayagada": 967911,
    "Sambalpur": 1041099,
    "Subarnapur": 592911,
    "Sundargarh": 2093437
};

const years = Array.from({ length: 26 }, (_, i) => 2011 + i); // 2011 to 2036

let code = 'export const MODEL_PROJECTION_DATA: Record<string, Record<number, number>> = {\n';

Object.entries(BASE_POP).forEach(([name, base]) => {
    code += `    "${name}": {\n`;
    const growth = 0.012; // Static growth for deterministic dummy data
    years.forEach(year => {
        const val = Math.floor(base * Math.pow(1 + growth, year - 2011));
        code += `        ${year}: ${val},\n`;
    });
    code += `    },\n`;
});

code += '};\n';
console.log(code);
