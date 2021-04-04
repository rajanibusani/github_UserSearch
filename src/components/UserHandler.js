import React, { useEffect, useState } from "react";
import { Form, Card, Image, Icon } from 'semantic-ui-react';

const UserHandler = () => {
    const [userInput, setUserInput] = useState("");
    const [users, setUsers] = useState("");
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const onChange = (e) => {
        setUserInput(e.target.value);
    }
    useEffect(() => {
        const API_URL = `https://api.github.com/users/example`
        fetch(API_URL)
            .then(res => res.json())
            .then(userObj => {
                console.log(userObj)
                setUsers(userObj)
            })
    }, [])
    const onClick = () => {
        const API_URL = `https://api.github.com/users/${userInput}`
        fetch(API_URL)
            .then(res => res.json())
            .then(userObj => {
                console.log(userObj)
                if (userObj.message) {
                    return setError(userObj.message)
                } else {
                    setError(null)
                    setUsers(userObj)
                }
            })
        const Repos_url = `https://api.github.com/users/${userInput}/repos`
        fetch(Repos_url)
            .then(res => res.json())
            .then(reposObj => {
                console.log(reposObj)
                setRepos(reposObj)
            })
    }
    return <div >
        <div className="form">
            <Form onSubmit={onClick}>
                <Form.Group >
                    <Form.Input
                        placeholder='Github User Search'
                        name='Github User '
                        value={userInput}
                        onChange={onChange}
                    />
                    <Form.Button content='Submit' />
                </Form.Group>
            </Form>
        </div>
        {error ? <h1>{error}</h1> :
            <div className="user_info">
                <Card>
                    <Image src={users.avatar_url} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>UserName:{users.login}</Card.Header>
                        {users.name &&
                            <Card.Content>
                                <Card.Header>
                                    <a href={users.html_url} target="blank">Name:{users.name}
                                    </a>
                                </Card.Header>
                            </Card.Content>}
                    </Card.Content>
                    <div className="repos">
                        <Card.Content extra >
                            <a href={users.html_url} target="blank"> No Of Repos:  {users.public_repos} </a>
                            {repos.length > 0 && repos.map(repo => {
                                return <div>
                                    <a href={repo.html_url} target="blank"> <Icon name='file' />  {repo.name} </a>
                                </div>
                            })}

                            {/* <Card.Content extra>
                            <p>  Followers  </p>
                        </Card.Content> */}
                        </Card.Content>
                        <Card.Content extra>
                            <a href={users.html_url} target="blank"> <Icon name='user' />  {users.followers} Followers  </a>
                        </Card.Content>
                        <Card.Content extra>
                            <a href={users.html_url} target="blank"> <Icon name='user' />  {users.following} Following  </a>
                        </Card.Content>
                    </div>
                </Card>

            </div>
        }
    </div>
}
export default UserHandler;