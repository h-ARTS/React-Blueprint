'use strict';
import React from 'react';
import { render } from 'react-dom';

const App = React.createClass({
    render: function() {
        return (
            <section>
                <h1>My scaffold</h1>
                <p>Hello react world!</p>
            </section>
        );
    }
});

render(
    <App />,
    document.getElementById('app')
);