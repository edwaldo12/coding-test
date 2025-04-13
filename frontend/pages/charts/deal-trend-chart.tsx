import { Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const DealTrendChart: React.FC<{ salesReps }> = ({ salesReps }) => {
  return (
    <Stack display={'flex'} flexDirection={'column'}>
      <Typography variant="h6" textAlign={'center'}>
        Cumulative Deal Count Over 12 Months
      </Typography>
      <LineChart
        xAxis={[
          {
            data: salesReps.map((item: { month: string }) => item.month),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: salesReps.map((item: { deals: number }) => item.deals),
          },
        ]}
        width={450}
        height={400}
      />
    </Stack>
  );
};

export default DealTrendChart;
