import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';

import useUsers from '@/pages/login/hooks/useUsers';

const getUniqUserByName = users => {
  const map = new Map();
  users.forEach(({ name, ...otherProps }) => {
    map.set(name, { ...otherProps, name });
  });

  return [...map.values()];
};

const AvailableUsers = () => {
  const { data, isLoading, isRefetching } = useUsers();
  const isLoaded = !isLoading && !isRefetching;
  const users = isLoaded ? getUniqUserByName(data.users) : [];

  return (
    <Box
      sx={{
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>⚠️ 사용 가능한 유저 리스트</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>email</TableCell>
                  <TableCell>password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(({ id, email, password }) => (
                  <TableRow key={id}>
                    <TableCell>{email}</TableCell>
                    <TableCell>{password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AvailableUsers;
