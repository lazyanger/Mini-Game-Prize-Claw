import React from "react";

class ClawCranes extends React.Component {
    render() {
        let cranes = this.props.cranes || [];
        return (
            <ul>
                {
                    cranes.map((crane) => {
                        return (
                            <li key={crane.id}>
                                <pre>{JSON.stringify(crane, null, 2)}</pre>
                            </li>
                        )
                    })
                }

            </ul>
        );
    }
}

export default ClawCranes;