import React from 'react';


function Dashboard(props) {

  return (
    <div>
      <div>
        <h1>{`WELCOME ${props.user.userId}`}</h1>
        <h2>DASHBOARD</h2>
        <button>Log out</button>
      </div>
    </div>
  );
}

export default Dashboard;
