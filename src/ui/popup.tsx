import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.css"

class Main extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>KidSafe</h1>
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Main />,
    document.getElementById('root')
)
