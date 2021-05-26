import React from 'react';

import { ReactComponent as MoreIcon } from '../../assets/images/more.svg';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/info.svg';

import { Button, IconButton } from '../Button';
import PieChart from '../Chart/PieChart';

import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from '../Card';

export const ChartCard = ({ data }) => (
  <Card style={{ width: '448px' }}>
    <CardHeader
      title={(
        <>
          {data.title}
          <InfoIcon style={{ marginLeft: '10px' }} />
        </>
      )}
      action={(
        <IconButton>
          <MoreIcon />
        </IconButton>
      )}
    />
    <CardContent>
      <PieChart data={data} containerId={data.id} isDoughnut />
    </CardContent>
    <CardActions placement='right'>
      <Button
        endIcon={<ArrowIcon />}
      >
        View full report
      </Button>
    </CardActions>
  </Card>
);