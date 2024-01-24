import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Skeleton,
} from '@mui/material';
import React from 'react';

const SkeletonProductCard = () => (
  <Grid item xs={6} sm={6} md={3}>
    <Card sx={{ maxWidth: 345 }}>
      <Skeleton variant="rectangular" height="100" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Skeleton />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Skeleton />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Skeleton width={50} />
        </Button>
        <Button size="small">
          <Skeleton width={50} />
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default SkeletonProductCard;
