import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import { Helpers } from '../helpers/helpers';
import query from '../queries/fetchSongs'

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            alert: {
                active: false,
                type: '',
                message: ''
            }
        }
    }

    onSubmit(event) {
        event.preventDefault();
        if(Helpers.isEmpty(this.state.title)) {
            this.setState({ alert: { active: true, type: 'red darken-1 white-text', message: 'Please fill out form'}});
            setTimeout(() => {
                this.setState({alert: { active: false, type: '', message: ''}})
            }, 3000);
            return
        } else {
            this.props.mutate({
                variables: {
                    title: this.state.title
                },
                refetchQueries: [{ query }]
            }).then(() => {
                hashHistory.push('/')
            }).catch((err) => {
                console.log(err)
            }) 
        }
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                {this.state.alert.active && <div className={this.state.alert.type}>{this.state.alert.message}</div>}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input 
                        type="text" 
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);