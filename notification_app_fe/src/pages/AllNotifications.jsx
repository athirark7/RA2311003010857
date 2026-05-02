import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Pagination } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { logToServer } from '../middleware/logger';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => { logToServer("frontend", "info", "page", "Accessed All Notifications Matrix"); }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const mockData = Array.from({length: limit}).map((_, i) => ({
          id: i + (page-1)*limit,
          type: filter || ['Event', 'Result', 'Placement'][Math.floor(Math.random() * 3)],
          message: `Sample detailed notification payload for ID #${i + (page-1)*limit}`,
          timestamp: new Date(Date.now() - Math.random()*1000000000).toISOString()
        }));
        setNotifications(mockData);
        logToServer("frontend", "info", "api", `Fetched standard notifications page ${page}`);
      } catch (error) {} finally { setLoading(false); }
    };
    fetchNotifications();
  }, [filter, page]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Global Feed</Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Filter Category</InputLabel>
          <Select value={filter} label="Filter Category" onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
            <MenuItem value=""><em>All Categories</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : <Box>{notifications.map((notif, i) => <NotificationCard key={`all-${i}`} notification={notif} />)}<Box display="flex" justifyContent="center" mt={4}><Pagination count={10} page={page} onChange={(e, val) => setPage(val)} color="primary" /></Box></Box>}
    </Container>
  );
}
