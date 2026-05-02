import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import { logToServer } from '../middleware/logger';

export default function NotificationCard({ notification }) {
  const [viewed, setViewed] = useState(false);
  const getChipColor = (type) => {
    switch(type) {
      case 'Placement': return 'success';
      case 'Result': return 'info';
      case 'Event': return 'secondary';
      default: return 'default';
    }
  };

  const handleMarkViewed = () => {
    setViewed(true);
    logToServer("frontend", "info", "component", "Notification marked as viewed");
  };

  return (
    <Card sx={{ mb: 2, borderLeft: viewed ? '4px solid #bdc3c7' : '4px solid #2980b9', backgroundColor: viewed ? '#fafafa' : '#ffffff' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip label={notification.type || notification.notification_type} color={getChipColor(notification.type || notification.notification_type)} size="small" />
          {!viewed && <Chip label="NEW" size="small" color="error" variant="outlined" sx={{ fontWeight: 'bold' }} />}
        </Box>
        <Typography variant="body1" sx={{ mt: 1, mb: 2, color: viewed ? 'text.secondary' : 'text.primary' }}>
          {notification.message || "Detailed information regarding this campus update."}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">{new Date(notification.timestamp || Date.now()).toLocaleString()}</Typography>
          {!viewed && <Button size="small" onClick={handleMarkViewed}>Mark as Read</Button>}
        </Box>
      </CardContent>
    </Card>
  );
}
