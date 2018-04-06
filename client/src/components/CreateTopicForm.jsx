import React, { Component } from 'react';
import axios from 'axios'

class CreateTopicForm extends Component {
    state = {
        topic: {
            title: ''
        }
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const newTopic = {...this.state.topic}
        newTopic[attribute] = event.target.value
        this.setState({ topic: newTopic })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        event.target.reset()
        const payload = {topic: this.state.topic}
        const res = await axios.post('/api/topics', payload)
        console.log(res)
        this.props.getTopics()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default CreateTopicForm;