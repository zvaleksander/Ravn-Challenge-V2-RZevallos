import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Loading from './Loading';
import Message from './Message';

const GET_CHARACTER_BY_ID = gql`
query ($id: ID){
    Person (id: $id) {
        id
        name
        eyeColor
        hairColor
        skinColor
        birthYear
        starships {
            id
            name
        }
    }
}`;

class Character extends React.Component {
    render() {
        if (!this.props.id) {
            return (
                <div></div>
            );
        }

        return (
            <Query query={GET_CHARACTER_BY_ID} variables={{id: this.props.id}}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return (
                                <Loading />
                            );
                        }

                        if (error) {
                            return (
                                <Message message={'Failed to Load Data'} />
                            );
                        }

                        if (!data.Person) {
                            return (
                                <div></div>
                            );
                        }

                        return (
                            <>
                                <div className="header">
                                    <p className="h2-default">General Information</p>
                                </div>

                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Eye Color</span>
                                    <span className="p1-default float-right">{data.Person.eyeColor ? data.Person.eyeColor : '-'}</span>
                                </div>
                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Hair Color</span>
                                    <span className="p1-default float-right">{data.Person.hairColor ? data.Person.hairColor : '-'}</span>
                                </div>
                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Skin Color</span>
                                    <span className="p1-default float-right">{data.Person.skinColor ? data.Person.skinColor : '-'}</span>
                                </div>
                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Birth Year</span>
                                    <span className="p1-default float-right">{data.Person.birthYear ? data.Person.birthYear : '-'}</span>
                                </div>
                                <div className="header">
                                    <p className="h2-default">Vehicles</p>
                                </div>
                                {
                                    data.Person.starships.map(({ id, name }) => (
                                        <div className="cell-data" key={id}>
                                            <span className="p1-low-emphasis">{name}</span>
                                        </div>
                                    ))
                                }
                            </>
                        )

                    }
                }
            </Query>
        )
    };
}

export default Character;
