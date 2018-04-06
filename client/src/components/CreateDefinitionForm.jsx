import React, { Component } from 'react';
import axios from 'axios'

class CreateDefinitionForm extends Component {
    state = {
        definition: {
            post: '',
            count: 0
        }
    }

    handleChange = (event) => {
        const attribute = event.target.name 
        const newDefinition = {...this.state.definition}
        newDefinition[attribute] = event.target.value 
        this.setState({ definition: newDefinition})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        event.target.reset()
        //const topicId = this.props.match.params.id
        const payload = {definition: this.state.definition}
        const res = await axios.post(`/api/topics/${this.props.topicId}/definitions`, payload)
        console.log(res.data)
        this.props.getSingleTopic()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="post"
                        placeholder="Definition"
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default CreateDefinitionForm;