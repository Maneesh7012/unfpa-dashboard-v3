/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
'use client';

// ======================= TYPES =======================

export type DistrictData = Record<string, any>;

// ======================= HELPERS =======================

export function formatNumber(num?: number) {
  if (!num) return '—';
  return Intl.NumberFormat('en-IN').format(Math.round(num));
}

export function extractLatestYearData(data: DistrictData) {
  if (!data) return {} as any;

  const years = Object.keys(data)
    .map((k) => {
      const m = k.match(/_(\d{4})/);
      return m ? Number(m[1]) : null;
    })
    .filter(Boolean) as number[];

  const latestYear = Math.max(...years);

  return {
    year: latestYear,
    population: data[`pop_${latestYear}_sum`],
    density: data[`density_${latestYear}`],
    urban: {
      rural: data[`deg_urban_rural_${latestYear}`],
      city: data[`deg_urban_city_${latestYear}`],
      town: data[`deg_urban_town_${latestYear}`],
    },
  };
}

export function generateSummary(data?: DistrictData) {
  if (!data) return null;

  const { district_name, state_name, area, pop_2011_sum } = data;
  const latest = extractLatestYearData(data);

  return `${district_name} district in ${state_name} spans ${formatNumber(area)} sq. km. Population has grown from ${formatNumber(
    pop_2011_sum,
  )} in 2011 to approximately ${formatNumber(
    latest.population,
  )} in ${latest.year}, at a current density of ${formatNumber(
    latest.density,
  )} people per sq. km. Urban distribution reflects ${
    latest.density > 500 ? 'high' : 'moderate'
  } settlement intensity with ongoing rural-urban transition.`;
}

// ======================= UI COMPONENTS =======================

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-muted rounded-lg p-3.5">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </p>
      <p className="text-xl font-medium text-foreground leading-tight">
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}

export function LeftBorderCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="border-l-2 border-border pl-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
    </div>
  );
}
