import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
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