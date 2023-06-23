import React, { Component } from "react"
import PropTypes from "prop-types"
import Tab from "./Tab"

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            activeTab: this.props.children[0].props.label,
            customClass: this.props.customClass
        }
    }

    onClickTabItem = (tab) => {
        this.setState({activeTab: tab})
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
                customClass
            }
        } = this

        return (
            <div className="tabs">
                <ol className={customClass ? ("tab-list-" + customClass) : "tab-list"}>
                    {children.map( (child) => {
                        const { label } = child.props

                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                customClass={customClass}
                                onClick={onClickTabItem}
                            />
                        )

                    })}
                </ol>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined
                        return child.props.children
                    })}
                </div>
            </div>
        )
    }

}

export default Tabs;