import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react';


const GET_USERS = gql`
query Users {
    users {
      id
      name,
      username,
      email
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      username
    }
  }
`;

const UPDATE_USERNAME = gql`
  mutation UpdateUserName($id: ID!, $name: String!) {
    updateUserName(id: $id, name: $name) {
      id
      name
      email,
      username
    }
  }
`

function App() {
  const [userId, setUserId] = useState('');
  const [newName, setNewName] = useState('')
  const [openForm, setOpenForm] = useState(false)

  const [Users, { loading: usersLoading, data: usersData, error: usersError }] = useLazyQuery(GET_USERS);
  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER_BY_ID);
  const [UpdateUserName, { data: updateData }] = useMutation(UPDATE_USERNAME);

  useEffect(() => {
    Users()
  }, [])

  const handleFetch = () => {
    if (userId) getUser({ variables: { id: userId } });
  };

  const handleUpdate = () => {
    if (userId && newName !== '') {
      UpdateUserName({ variables: { id: userId, name: newName } })
      handleReset()
    }
  }

  const handleEdit = (user) => {
    setUserId(user.id)
    setNewName(user.name)
    setOpenForm(true)
  }

  const handleReset = () => {
    setUserId('')
    setNewName('')
    setOpenForm(false)
  }

  const userEle = (user) => {
    return <div className='user-card'>
      <div className='user-card-header'><span><strong>ID:</strong> {user.id}</span> <button onClick={() => handleEdit(user)}>Edit</button></div>
      <p><strong>Name:</strong> {user.name}
        {openForm && userId === user.id ? <div>
          <input
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleReset}>Cancel</button>
        </div> : ''}
      </p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h4>Fetch User by ID</h4>
      <input
        type="number"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
      <button onClick={handleFetch}>Fetch</button>


      {loading || usersLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.user && userEle(data.user)}

      <hr style={{ marginTop: 16, marginBottom: 16 }} />

      <h4>All Users</h4>
      {usersData?.users?.length > 0 && usersData.users.map((user) => {
        return userEle(user)
      })}
    </div>
  );
}

export default App;
