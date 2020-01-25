import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Loading from './Loading';
import Message from './Message';

const GET_ALL_CHARACTERS = gql`
query($cursor: String) {
    allPeople(first: 5, after: $cursor) {
        people {
            id
            name
            species {
                id
                name
                __typename
            }
            __typename
        }
        pageInfo {
            hasNextPage
            endCursor
            __typename
        }
        __typename
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

                        return (
                            <div>
                                {
                                    data.allPeople.people.map(({ id, name, species }) => (
                                        <div className="cell-person row border-right-solid" key={id}>
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
                                    ))
                                }
                                <div className="text-center">
                                    <button className="btn btn-sm ravn-black my-3 text-white" onClick={() => {
                                        fetchMore({
                                            variables: {
                                                cursor: data.allPeople.pageInfo.endCursor
                                            },
                                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                                if (!fetchMoreResult.allPeople.pageInfo.hasNextPage) {
                                                    console.log(fetchMoreResult.allPeople.pageInfo);
                                                    return;
                                                }

                                                return {
                                                    allPeople: {
                                                        people: [
                                                            ...previousResult.allPeople.people,
                                                            ...fetchMoreResult.allPeople.people
                                                        ],
                                                        pageInfo: {
                                                            ...fetchMoreResult.allPeople.pageInfo
                                                        },
                                                        __typename: fetchMoreResult.allPeople.__typename
                                                    },
                                                    __typename: previousResult.__typename
                                                };
                                            }
                                        });
                                    }}>Load more</button>
                                </div>
                            </div>
                        );
                    }
                }
            </Query>
        )
    };
}

export default Characters;
