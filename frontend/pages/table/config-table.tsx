import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import SkillsCellRenderer from './skills-cell-renderer';
import DealsCellRenderer from './deals-cell-renderer';
import ClientsCellRenderer from './clients-cell-renderer';

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'role', headerName: 'Role', width: 250 },
  { field: 'region', headerName: 'Region', width: 150 },
  {
    field: 'skills',
    headerName: 'Skills',
    width: 250,
    renderCell: (params: GridRenderCellParams) => (
      <SkillsCellRenderer {...params} />
    ),
  },
  {
    field: 'deals',
    headerName: 'Deals',
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <DealsCellRenderer {...params} />
    ),
  },
  {
    field: 'clients',
    headerName: 'Clients',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <ClientsCellRenderer {...params} />
    ),
  },
];
