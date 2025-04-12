import { Box, TextField, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import { columns } from './config-table';
import { apiGet } from '../utils/api';
import { useDebounce } from 'use-debounce';

export default function TableComponent() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    let sortField = '';
    let sortOrder = '';
    if (sortModel.length > 0) {
      sortField = sortModel[0].field;
      sortOrder = sortModel[0].sort || '';
    }
    const url = `/data?search=${encodeURIComponent(
      debouncedSearch || ''
    )}&page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`;
    apiGet(url)
      .then((data) => {
        setUsers(data.salesReps || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, [debouncedSearch, page, pageSize, sortModel]);

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom textAlign="center">
        Sales Dashboard
      </Typography>
      <Box sx={{ marginBottom: '1rem', display: 'flex' }}>
        <TextField
          label="Search Sales Data..."
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ width: { xs: '100%', sm: 400 } }}
        />
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          loading={loading}
          rows={users}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={total}
          paginationModel={{ page: page, pageSize: pageSize }}
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page);
            setPageSize(newModel.pageSize);
          }}
          onSortModelChange={(newSortModel) => {
            setSortModel(newSortModel);
            setPage(0);
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
