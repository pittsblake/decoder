import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import CreateDefinitionForm from './CreateDefinitionForm'

class TopicShowPage extends Component {

    state = {
        topic: {
            definitions: []
        },
        createDefinition: false
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

    showCreateDefinitionForm = () =>{
        this.setState({createDefinition: !this.state.createDefinition})
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
                    topicId = {this.props.match.params.id} 
                    getSingleTopic ={this.getSingleTopic} 
                    showCreateDefinitionForm = {this.showCreateDefinitionForm}
                    /> : null
               }

               {
                   this.state.topic.definitions.map((def, i) => {
                        return(
                            <div key={i}>
                                
                                <h4>{def.post}</h4>
                                <h4>{def.count}</h4>
                            </div>
                        )
                   })
               }
            </div>
        );
    }
}

export default TopicShowPage;