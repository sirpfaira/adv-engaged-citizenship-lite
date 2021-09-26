import { useState, useEffect } from 'react';

function Dashboard(props) {
  useEffect(() => {
    const getUnreadNotifications = async () => {
      const res = await fetch(`/unreadnotifications/${props.user.userId}`);
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
        <h1>{`WELCOME ${props.user.role} - ${props.user.userId}!`}</h1>
        <h2>DASHBOARD</h2>
        <button>Log out</button>
      </div>
    </div>
  );
}

export default Dashboard;
