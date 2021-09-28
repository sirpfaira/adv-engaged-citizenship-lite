import React from 'react';

const ViewProject = (props) => {
  let projectId = '';
  const { project_id } = props.history.location.state;
  if (project_id) {
    projectId = project_id;
  } else {
    props.history.push('/dashboard');
  }
  return <h1>{projectId}</h1>;
};

export default ViewProject;
