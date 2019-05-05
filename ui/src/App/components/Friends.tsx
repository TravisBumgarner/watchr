import React, { useState } from 'react'
import axios from 'axios'

import { Input, Button } from 'SharedComponents'

const Friends = ({ user }) => {
    const [friend, setFriend] = useState<any>('') //TODO: fix this

    const getFriendsDetails = () => {
        axios
            .post(`${__API__}/friends`, { id: user.id, friend_email: friend })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Friends</h1>
            Friend Email: <Input value={friend} onChange={setFriend} type="text" />
            <Button onClick={getFriendsDetails}>Submit</Button>
        </div>
    )
}

export default Friends
