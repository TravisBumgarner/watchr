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
    const [commonLikes, setCommonLikes] = React.useState<any[]>([]) //TODO: Fix this.

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

    const getLikesById = id => {
        const token = sessionStorage.getItem('jwtToken')

        axios
            .get(`${__API__}/likes?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setCommonLikes(response.data.movies))
            .catch(error => {
                console.log(error)
            })
            .finally(() => {})
    }

    const Users = users.map(({ id, username }) => (
        <tr>
            <td>{username}</td>
            <td>
                <Button onClick={() => getLikesById(id)}>What do you both like?</Button>
            </td>
        </tr>
    ))

    const CommonLikes = commonLikes.map(commonLike => <li>{commonLike.original_title}</li>)

    return (
        <div>
            <h1>All Users</h1>
            <table>{Users}</table>
            <h1>Common Likes</h1>
            <ul>{CommonLikes}></ul>
        </div>
    )
}

export default Friends
