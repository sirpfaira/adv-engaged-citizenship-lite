import React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useHistory } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 0,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));

const UserNotifications = (props) => {
  let history = useHistory();
  //console.log(props.notifications);
  const handleClick = async () => {
    if (props.notifications > 0) {
      await props.changeNotifications(0);
    }
    history.push('/allnotifications');
  };

  return (
    <IconButton aria-label='cart' onClick={handleClick}>
      <StyledBadge badgeContent={props.notifications}>
        <NotificationsIcon sx={{ color: '#fff' }} />
      </StyledBadge>
    </IconButton>
  );
};

export default UserNotifications;
