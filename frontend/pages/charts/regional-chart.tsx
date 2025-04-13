import { Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
const RegionalChart: React.FC<{ salesReps }> = ({ salesReps }) => {
  return (
    <Stack display={'flex'} flexDirection={'column'}>
      <Typography variant="h6" textAlign={'center'}>
        Total Number Of Deals Closed Per Region
      </Typography>
      <BarChart
        xAxis={[
          {
            data: salesReps.map((item: { region: string }) => item.region),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: salesReps.map((item: { count: number }) => item.count),
          },
        ]}
        width={450}
        height={400}
      />
    </Stack>
  );
};

export default RegionalChart;
