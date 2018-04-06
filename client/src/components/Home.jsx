import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CreateTopicForm from './CreateTopicForm'

class Home extends Component {
    state = {
        createTopic: false
    }


    showCreateTopicForm = () => {
        this.setState({ createTopic: !this.state.createTopic})
    }

    render() {
        return (
            <div>
                <button onClick={this.showCreateTopicForm}>Create Topic</button>
                {
                    this.state.createTopic ? <CreateTopicForm getTopics = {this.props.getTopics} />: null
                }
                {
                    this.props.topics.map((topic, i) => {
                        return (
                            <div key = {i}>
                                <Link to ={`/topics/${topic.id}`}>{topic.title}</Link>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Home;