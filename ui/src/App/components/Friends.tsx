import * as React from 'react'
import axios from 'axios'

import { Button } from 'SharedComponents'

type User = {
    id: string
    username: string
}

const Friends = ({ user }) => {
    const [friend, setFriend] = React.useState<string>('')
    const [users, setUsers] = React.useState<User[]>([])

    const getFriendsDetails = () => {
        const token = sessionStorage.getItem('jwtToken')

        axios
            .get(`${__API__}/users`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setUsers(response.data.users))
            .catch(error => {
                console.log(error)
            })
            .finally(() => {})
    }
    React.useEffect(getFriendsDetails, [])

    const handleMakeFriend = id => {
        console.log(id)
    }
    const Users = users.map(({ id, username }) => (
        <tr>
            <td>{username}</td>
            <td>
                <Button onClick={() => handleMakeFriend(id)}>Make Friend</Button>
            </td>
        </tr>
    ))

    return (
        <div>
            <h1>All Users</h1>
            <table>{Users}</table>
        </div>
    )
}

export default Friends
