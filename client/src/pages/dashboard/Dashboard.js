import { useState, useEffect } from 'react';
import HEADERS_DATA from '../../components/headers_data';

function Dashboard(props) {
  useEffect(() => {
    props.changeHeaders(HEADERS_DATA[props.user.role]);
    const getUnreadNotifications = async () => {
      const res = await fetch(`/unreadnotifications/${props.user.user_id}`);
      const body = await res.json();
      //console.log(body);
      if (res.status !== 200) {
      } else {
        const newNotifications = body.count;
        if (newNotifications > 0) {
          props.changeNotifications(newNotifications);
        }
      }
    };
    getUnreadNotifications();
  }, []);

  return (
    <div>
      <div>
        <h1>{`WELCOME ${props.user.role} - ${props.user.user_name}!`}</h1>
        <h2>DASHBOARD</h2>
        <button>Log out</button>
        <button onClick={() => props.history.push('/createproject')}>
          New Project
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
