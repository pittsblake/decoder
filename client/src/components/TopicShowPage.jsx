import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CreateDefinitionForm from './CreateDefinitionForm'

class TopicShowPage extends Component {

    state = {
        topic: {},
        definitions: [],
        createDefinition: false
    }

    componentDidMount = async () => {
        await this.getSingleTopic()
        await this.getDefinitions()

    }

    getSingleTopic = async () => {
        const topicId = this.props.match.params.id
        const res = await axios.get(`/api/topics/${topicId}`)
        // console.log(res.data)
        this.setState({
            topic: res.data
        })
    }

    getDefinitions = async () => {
        const topicId = this.props.match.params.id
        const res = await axios.get(`/api/topics/${topicId}/definitions`)
        this.setState({
            definitions: res.data
        })
    }


    showCreateDefinitionForm = () => {
        this.setState({ createDefinition: !this.state.createDefinition })
    }

    // Add one to the counter and save as Liked
    addToCounter = async (defId) => {
        const topicId = this.props.match.params.id
        let singleDefinition = this.state.definitions.find((definition) => {
            if (defId == definition.id) {
                return definition
            }
        })
        let payload = singleDefinition
        const increase = payload.count + 1
        payload = { count: increase }


        let aLike = singleDefinition.likes.find((like) => {
            return like
        })
        console.log(aLike)

        let likePayload = aLike

        likePayload = {
            liked: true,
            disliked: false
        }

        //UPDATES THE COUNT
        const res = await axios.patch(`/api/topics/${topicId}/definitions/${defId}`, payload)

        if (aLike) {
            const response = await axios.patch(`/api/topics/${topicId}/definitions/${defId}/likes/${aLike.id}`, likePayload)
        } else {
            // CREATE A POST IN LIKE CONTROLLER
            await axios.post(`/api/topics/${topicId}/definitions/${defId}/likes`, likePayload)
        }
        await this.getDefinitions()
    }



    // Subtract one from counter and save as Disliked
    deleteFromCounter = async (defId) => {
        const topicId = this.props.match.params.id

        let singleDefinition = this.state.definitions.find((definition) => {
            if (defId == definition.id) {
                return definition
            }
        })
        let payload = singleDefinition
        const decrease = payload.count - 1
        payload = {
            count: decrease,
        }

        let aLike = singleDefinition.likes.find((like) => {
            return like
        })

        let likePayload = aLike

        likePayload = {
            liked: false,
            disliked: true
        }

        //UPDATES THE COUNT
        const res = await axios.patch(`/api/topics/${topicId}/definitions/${defId}`, payload)

        // IF A LIKE EXISTS BY THE USER THEN SEND AN UPDATE REQUEST
        // IF A LIKE DOES NOT EXIST BY THE USER, THEN MAKE A POST REQUEST
        if (aLike) {
            const response = await axios.patch(`/api/topics/${topicId}/definitions/${defId}/likes/${aLike.id}`, likePayload)
        } else {
            // CREATE A POST IN LIKE CONTROLLER
            await axios.post(`/api/topics/${topicId}/definitions/${defId}/likes`, likePayload)
        }
        await this.getDefinitions()

    }

    deletePost = async (id) => {
        const topicId = this.props.match.params.id
        const res = await axios.delete(`/api/topics/${topicId}/definitions/${id}`)
        this.getDefinitions()
    }


    render() {
        return (
            <div>
                <Link to='/home'> Topics </Link>
                <h1>{this.state.topic.title}</h1>
                <button onClick={this.showCreateDefinitionForm}>Add Definition</button>

                {
                    this.state.createDefinition ?
                        <CreateDefinitionForm
                            topicId={this.props.match.params.id}
                            getDefinitions={this.getDefinitions}
                            showCreateDefinitionForm={this.showCreateDefinitionForm}
                        /> : null
                }

                {
                    this.state.definitions.map((def, i) => {
                        return (
                            <DefinitionContainer key={i}>
                                <h4>{def.post}</h4>
                                <h4>{def.count}</h4>

                                {
                                    def.liked ? <button onClick={() => this.addToCounter(def.id)} style={{ backgroundColor: 'grey' }}> + </button> : <button onClick={() => this.addToCounter(def.id)} style={{ backgroundColor: 'white' }}> + </button>
                                }

                                {
                                    def.disliked ? <button onClick={() => this.deleteFromCounter(def.id)} style={{ backgroundColor: 'grey' }}> - </button> : <button onClick={() => this.deleteFromCounter(def.id)} style={{ backgroundColor: 'white' }}> - </button>
                                }


                                <button onClick={() => this.deletePost(def.id)}>Delete</button>
                            </DefinitionContainer>
                        )
                    })
                }
            </div>
        );
    }
}

export default TopicShowPage;

const DefinitionContainer = styled.div`
    display: flex;
    width: 60%;
    h4 {
        padding: 15px;
    }
    button {
        height: 20px;
    }
`

