import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Loading from './Loading';
import Message from './Message';

const GET_ALL_CHARACTERS = gql`
query($cursor: String) {
    allPeople(first: 15, after: $cursor) {
        people {
            id
            name
            species {
                id
                name
            }
        }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}`;

class Characters extends React.Component {

    sendId = (id) => {
        this.props.getId(id);
    };

    render() {
        return (
            <Query query={GET_ALL_CHARACTERS} variables={{ cursor: null }}>
                {
                    ({ loading, error, data, fetchMore }) => {
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

                        console.log('next?', JSON.stringify(data.allPeople.pageInfo.hasNextPage));
                        if (data.allPeople.pageInfo.hasNextPage) {
                            console.log('cursor', JSON.stringify(data.allPeople.pageInfo.endCursor));
                            fetchMore({
                                variables: {
                                    cursor: data.allPeople.pageInfo.endCursor
                                },
                                updateQuery: (previousResult, { fetchMoreResult }) => {
                                    console.log('data_length', data.allPeople.people.length);
                                    // console.log('previous', previousResult);
                                    // console.log('next', JSON.stringify(fetchMoreResult));
                                    /*
                                    let combined = {
                                        allPeople: {
                                            pageInfo: { ...fetchMoreResult.allPeople.pageInfo },
                                            people: [
                                                ...fetchMoreResult.allPeople.people
                                            ]
                                        }
                                    };
                                    // console.log('has_next', combined.allPeople.pageInfo.endCursor, data.allPeople.pageInfo.hasNextPage);
                                    */
                                    data.allPeople.pageInfo = { ...fetchMoreResult.allPeople.pageInfo };
                                    /*
                                    data.allPeople.people = [
                                        ...previousResult.allPeople.people,
                                        ...fetchMoreResult.allPeople.people
                                    ];
                                    */
                                    return {
                                        people: [...previousResult.allPeople.people, ...fetchMoreResult.allPeople.people]
                                    };
                                }
                            });
                        }

                        console.log('data_length_final', data.allPeople.people.length);

                        return data.allPeople.people.map(({ id, name, species }) => (
                            <div className="cell-person row" key={id}>
                                <div className="col-10">
                                    <h2 className="h2-default my-0">{name}</h2>
                                    <p className="p1-low-emphasis my-0">
                                        {species ? species.name : 'Unknown'}
                                    </p>
                                </div>
                                <div className="col-2 my-auto">
                                    <button className="btn btn-sm btn-circle ravn-black" onClick={() => this.sendId(id)}>
                                        <i className="fa fa-angle-right text-white"></i>
                                    </button>
                                </div>
                            </div>
                        ));
                    }
                }
            </Query>
        )
    };
}

export default Characters;
