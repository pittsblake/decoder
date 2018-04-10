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
        console.log(res.data)
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

    addToCounter = async (id) => {
        const topicId = this.props.match.params.id
        const updateCounter = this.state.definitions.find((definition) => {
            if (id == definition.id) {
                return definition.count++
            }
        })
        const res = await axios.patch(`/api/topics/${topicId}/definitions/${id}`, updateCounter)
        console.log(res.data)
        this.setState({
            definitions: res.data
        })
    }

    deleteFromCounter = async (id) => {
        const topicId = this.props.match.params.id
        const updateCounter = this.state.definitions.find((definition) => {
            if (id == definition.id) {
                return definition.count--
            }
        })
        const res = await axios.patch(`/api/topics/${topicId}/definitions/${id}`, updateCounter)
        this.setState({
            definitions: res.data
        })
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
                                <button onClick={() => this.addToCounter(def.id)}> + </button>
                                <button onClick={()=> this.deleteFromCounter(def.id)}> - </button>
                                <button onClick={()=> this.deletePost(def.id)}>Delete</button>
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
        height: 20px
    }
`