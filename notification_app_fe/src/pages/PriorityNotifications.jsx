import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, TextField } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { logToServer } from '../middleware/logger';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
    logToServer("frontend", "info", "page", "Accessed Priority Inbox");
    fetchPriorityNotifications();
  }, [topN]);

  const fetchPriorityNotifications = async () => {
    setLoading(true);
    logToServer("frontend", "info", "utils", "Executing priority matrix extraction");
    try {
      const mockRawData = Array.from({length: 50}).map((_, i) => ({
        id: `prio-${i}`, type: ['Event', 'Result', 'Placement'][Math.floor(Math.random() * 3)],
        message: `Crucial Priority check notification #${i}`, timestamp: new Date(Date.now() - Math.random()*10000000000).toISOString()
      }));
      const categoryWeights = { "Placement": 3, "Result": 2, "Event": 1 };
      const sortedData = [...mockRawData].sort((a, b) => {
        const weightA = categoryWeights[a.type] || 0;
        const weightB = categoryWeights[b.type] || 0;
        if (weightA !== weightB) return weightB - weightA;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
      setNotifications(sortedData.slice(0, topN));
    } catch (error) {} finally { setLoading(false); }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Priority Inbox</Typography>
        <TextField type="number" label="Top 'N' Alerts" size="small" value={topN} onChange={(e) => setTopN(Math.max(1, parseInt(e.target.value) || 10))} inputProps={{ min: 1, max: 50 }} sx={{ width: 130, backgroundColor: 'white' }} />
      </Box>
      {loading ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : <Box>{notifications.map((notif) => <NotificationCard key={notif.id} notification={notif} />)}</Box>}
    </Container>
  );
}
