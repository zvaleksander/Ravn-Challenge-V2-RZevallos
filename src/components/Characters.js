import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Loading from './Loading';
import Message from './Message';

const GET_ALL_CHARACTERS = gql`
{
    allPersons {
        id
        name
        species {
            id
            name
        }
    }
}`;

class Characters extends React.Component {
    sendId = (id) => {
        this.props.getId(id);
    };

    render() {
        return (
        <Query query={GET_ALL_CHARACTERS}>
            {
                ({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <Loading />
                        );
                    }

                    if (error) {
                        return (
                            <Message message={ 'Failed to Load Data' } />
                        );
                    }

                    return data.allPersons.map(({ id, name, species }) => (
                        <div className="cell-person row" key={ id }>
                            <div className="col-10">
                                <h2 className="h2-default my-0">{ name }</h2>
                                <p className="p1-low-emphasis my-0">
                                    { species.length === 0 ? 'Unknow' : species.map(x => x.name).join(', ') }
                                </p>
                            </div>
                            <div className="col-2 my-auto">
                                <span className="h2-default" onClick={() => this.sendId(id)}>&gt;</span>
                            </div>
                        </div>
                    ));
                }
            }
        </Query>
        )
    };
}
/*
function Characters() {
    const { loading, error, data } = useQuery(GET_ALL_CHARACTERS);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <Message message={ 'Failed to Load Data' } />
        );
    }

    return data.allPersons.map(({ id, name, species }) => (
        <div className="cell-person row" key={ id }>
            <div className="col-10">
                <h2 className="h2-default my-0">{ name }</h2>
                <p className="p1-low-emphasis my-0">
                    { species.length === 0 ? 'Unknow' : species.map(x => x.name).join(', ') }
                </p>
            </div>
            <div className="col-2 my-auto">
                <span className="h2-default">&gt;</span>
            </div>
        </div>
    ));
}
*/
export default Characters;
