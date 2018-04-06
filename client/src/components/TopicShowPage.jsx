import React, { Component } from 'react';
import axios from 'axios';

class TopicShowPage extends Component {

    state = {
        topic: {
            definitions: []
        }
    }

    componentDidMount = () => {
        this.getSingleTopic()
    }

    getSingleTopic = async () => {
        const topicId = this.props.match.params.id
        const res = await axios.get(`/api/topics/${topicId}`)
        console.log(res.data)
        this.setState({
            topic: res.data
        })
    }

    render() {
        
        return (
            <div>
               <h1>{this.state.topic.title}</h1>
               {
                   this.state.topic.definitions.map((def) => {
                        return(
                            <div>
                                <h4>{def.post}</h4>
                            </div>
                        )
                   })
               }
            </div>
        );
    }
}

export default TopicShowPage;