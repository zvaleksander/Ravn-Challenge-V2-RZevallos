import React from 'react';
import './App.css';

import Header from './components/Header';
import Characters from './components/Characters';
import Character from './components/Character';

class App extends React.Component {
    state = {
        idCharacter: ""
    }

    update = (id) => {
        console.log(id);
        this.setState({idCharacter: id});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row ravn-black navbar">
                    <Header title={'Ravn Star Wars Registry'} />
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-sm-12 border-right-solid">
                        <Characters getId={this.update} />
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-sm-12">
                                <Character id={this.state.idCharacter} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
