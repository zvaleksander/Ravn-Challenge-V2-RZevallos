import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Loading from './Loading';
import Message from './Message';

const GET_CHARACTER_BY_ID = gql`
query($id: ID) {
    person(id: $id) {
        id
        name
        eyeColor
        hairColor
        skinColor
        birthYear
        vehicleConnection {
            vehicles {
                id
                name
            }
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
            <Query query={GET_CHARACTER_BY_ID} variables={{ id: this.props.id }}>
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

                        return (
                            <>
                                <div className="header">
                                    <p className="h2-default">General Information</p>
                                </div>

                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Eye Color</span>
                                    <span className="p1-default float-right">{data.person.eyeColor ? data.person.eyeColor : '-'}</span>
                                </div>
                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Hair Color</span>
                                    <span className="p1-default float-right">{data.person.hairColor ? data.person.hairColor : '-'}</span>
                                </div>
                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Skin Color</span>
                                    <span className="p1-default float-right">{data.person.skinColor ? data.person.skinColor : '-'}</span>
                                </div>
                                <div className="cell-data">
                                    <span className="p1-low-emphasis">Birth Year</span>
                                    <span className="p1-default float-right">{data.person.birthYear ? data.person.birthYear : '-'}</span>
                                </div>
                                <div className="header">
                                    <p className="h2-default">Vehicles</p>
                                </div>
                                {
                                    data.person.vehicleConnection.vehicles.length === 0
                                        ?   <div className="cell-data">
                                                <span className="p1-low-emphasis">No vehicles found</span>
                                            </div>
                                        :   data.person.vehicleConnection.vehicles.map(({ id, name }) => (
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
