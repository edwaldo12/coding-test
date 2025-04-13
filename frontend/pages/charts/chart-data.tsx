import { SalesRep } from 'types';

export const getDealStatusData = (salesReps: SalesRep[]) => {
  const statusCounts = {
    'Closed Won': 0,
    'In Progress': 0,
    'Closed Lost': 0,
  };
  salesReps.forEach((rep) => {
    rep.deals.forEach((deal) => {
      statusCounts[deal.status] += 1;
    });
  });
  return Object.entries(statusCounts).map(([label, value]) => ({
    label,
    value,
  }));
};

export const getRegionalData = (salesReps: SalesRep[]) => {
  const regionTotals = {};
  salesReps.forEach((rep) => {
    regionTotals[rep.region] =
      (regionTotals[rep.region] || 0) + rep.deals.length;
  });
  return Object.entries(regionTotals).map(([region, count]) => ({
    region,
    count,
  }));
};

export const getDealTrendData = (salesReps: SalesRep[]) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const totalDeals = salesReps.reduce(
    (sum: number, rep) => sum + rep.deals.length,
    0
  );
  const monthlyAverage = totalDeals / months.length;
  return months.map((month) => ({
    month,
    deals: monthlyAverage.toFixed(0),
  }));
};
