import React from 'react';
import { useParams } from 'react-router-dom';
import User from '../components/Forms/User'; 

const EditUser = () => {
  const params = useParams()
  const id = params.userId
  return <div><User id={id} /></div>;
};

export default EditUser;
