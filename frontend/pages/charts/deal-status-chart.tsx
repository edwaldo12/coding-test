import { Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const DealStatusChart: React.FC<{ salesReps }> = ({ salesReps }) => {
  return (
    <Stack display={'flex'} flexDirection={'column'}>
      <Typography variant="h6" marginLeft={'15%'}>
        Deal Status Distribution
      </Typography>
      <PieChart
        series={[
          {
            data: salesReps.map((item: { label: string; value: number }) => ({
              id: item.label,
              value: item.value,
              label: item.label,
            })),
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        margin={{
          right: 150,
        }}
        width={500}
        height={400}
      />
    </Stack>
  );
};

export default DealStatusChart;
