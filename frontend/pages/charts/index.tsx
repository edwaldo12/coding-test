import { useState, useEffect } from 'react';
import RegionalChart from './regional-chart';
import DealTrendChart from './deal-trend-chart';
import DealStatusChart from './deal-status-chart';
import { Stack } from '@mui/material';
import { apiGet } from '../../utils/api';
import { SalesRep } from '@/types';
import {
  getDealStatusData,
  getDealTrendData,
  getRegionalData,
} from './chart-data';

const SalesDashboard: React.FC = () => {
  const [salesReps, setSalesReps] = useState<SalesRep[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await apiGet('/chart_data');
        setSalesReps(response.salesReps || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack
      direction="row"
      spacing={1}
      marginBottom={2}
      justifyContent={'center'}
      sx={{
        border: '1px solid #d9d9d9',
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        padding: 1,
        width: '100%',
      }}
    >
      <DealStatusChart salesReps={getDealStatusData(salesReps)} />
      <RegionalChart salesReps={getRegionalData(salesReps)} />
      <DealTrendChart salesReps={getDealTrendData(salesReps)} />
    </Stack>
  );
};

export default SalesDashboard;
